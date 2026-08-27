import React, { useEffect, useRef, useState } from "react";
import type { HassEntity, HomeAssistant, RoomConfig, RoomDefinition, RoomDeviceConfig } from "../types";
import { HomeiiIcon } from "./HomeiiIcon";

const Icon = ({ icon }: { icon: string }) => React.createElement("ha-icon", { icon });
type GlyphName = "climate" | "ceiling" | "floor" | "lamp" | "ambient" | "media";
type FeedbackTone = "working" | "success" | "error";
type FeedbackHandler = (message: string, tone?: FeedbackTone) => void;
type RoomAreaEntities = { light: string[]; climate: string[]; media_player: string[]; security: string[]; person: string[] };
function HomeiiGlyph({ name }: { name: GlyphName }) {
  const paths: Record<GlyphName, React.ReactNode> = {
    climate: <><path d="M7 10.5h10M9 7.5h6M10.5 4.5h3"/><path className="glyph-motion" d="M8 14c1.4 0 1.4 2 2.8 2s1.4-2 2.8-2 1.4 2 2.8 2"/></>,
    ceiling: <><path d="M5 11h14L16 6H8l-3 5Z"/><path d="M8 14c1.5 1.4 2.8 2 4 2s2.5-.6 4-2"/><path className="glyph-glow" d="M7 19h10"/></>,
    floor: <><path d="M12 4v15M8 20h8"/><path d="M8 5h8l-2 6h-4L8 5Z"/><path className="glyph-glow" d="M9.5 13.5h5"/></>,
    lamp: <><path d="M7 12h10l-2-7H9l-2 7Z"/><path d="M12 12v7M8.5 20h7"/><path className="glyph-glow" d="M9 14.5h6"/></>,
    ambient: <><rect x="4" y="5" width="16" height="12" rx="3"/><path className="glyph-glow" d="M8 20h8M8 10h8"/></>,
    media: <><path d="M5 9v6M9 6v12M13 4v16M17 7v10M21 10v4"/></>
  };
  return <svg className={`homeii-glyph glyph-${name}`} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
const get = (hass: HomeAssistant | undefined, id?: string) => id ? hass?.states[id] : undefined;
const number = (value: unknown, fallback = 0) => typeof value === "number" ? value : Number(value) || fallback;
const available = (state?: HassEntity) => Boolean(state && !["unknown", "unavailable"].includes(state.state));

export function RoomView({ room, definition, areaEntities, hass, isAdmin, intent, onHome }: { room: RoomConfig; definition: RoomDefinition; areaEntities?: RoomAreaEntities; hass?: HomeAssistant; isAdmin?: boolean; intent?: "cinema" | "climate" | null; onHome: () => void }) {
  const [zone, setZone] = useState<"lights" | "climate" | "media" | "security" | "scenes">(intent === "cinema" && definition.media ? "media" : definition.climate ? "climate" : "lights");
  const [feedback, setFeedback] = useState<{ message: string; tone: FeedbackTone } | null>(null);
  const [flowOpen, setFlowOpen] = useState(false);
  const [lightPage, setLightPage] = useState(0);
  const [statusConfigOpen, setStatusConfigOpen] = useState(false);
  const [roomStatusOpen, setRoomStatusOpen] = useState<"light" | "climate" | "media_player" | "security" | null>(null);
  const [roomStatusSnapshot, setRoomStatusSnapshot] = useState<string[]>([]);
  const [visibleStatusDomains, setVisibleStatusDomains] = useState<Array<"light" | "climate" | "media_player" | "security">>(() => { try { const saved=localStorage.getItem(`homeii-status-${room.id}`); return saved ? JSON.parse(saved) : definition.statusDomains || ["light","climate","media_player","security"]; } catch { return definition.statusDomains || ["light","climate","media_player","security"]; } });
  const [visibleZones, setVisibleZones] = useState<Array<"lights" | "climate" | "media" | "security" | "scenes">>(() => { try { const saved=localStorage.getItem(`homeii-zones-${room.id}`); return saved ? JSON.parse(saved) : ["lights","climate","media","security","scenes"]; } catch { return ["lights","climate","media","security","scenes"]; } });
  const feedbackTimer = useRef<number | undefined>(undefined);
  const notify: FeedbackHandler = (message, tone = "working") => {
    window.clearTimeout(feedbackTimer.current);
    setFeedback({ message, tone });
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), tone === "error" ? 3600 : 1900);
  };
  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);
  useEffect(() => {
    if (intent === "cinema" && definition.media) setZone("media");
    if (intent === "climate" && definition.climate) setZone("climate");
  }, [intent, definition.climate, definition.media]);
  const temperature = get(hass, definition.temperature);
  const humidity = get(hass, definition.humidity);
  const climate = get(hass, definition.climate);
  const localEntities: RoomAreaEntities = areaEntities || { light: definition.lights.map((item) => item.entity), climate: definition.climate ? [definition.climate] : [], media_player: definition.media ? [definition.media] : [], security: [], person: [] };
  const lightsOn = localEntities.light.filter((id) => get(hass, id)?.state === "on").length;
  const localClimateOn = localEntities.climate.filter((id) => { const state = get(hass,id); return available(state) && state?.state !== "off"; }).length;
  const localMediaOn = localEntities.media_player.filter((id) => ["playing","paused","buffering"].includes(get(hass,id)?.state || "")).length;
  const securityEntities = localEntities.security.filter((id) => { const state=get(hass,id); const domain=id.split(".",1)[0]; const deviceClass=String(state?.attributes.device_class || ""); return ["camera","lock","alarm_control_panel"].includes(domain) || ["door","window","opening","motion","occupancy","smoke","gas","moisture","tamper","problem","safety"].includes(deviceClass); });
  const lightsPerPage = 9;
  const lightPages = Math.max(1, Math.ceil(definition.lights.length / lightsPerPage));
  const visibleLights = definition.lights.slice(lightPage * lightsPerPage, (lightPage + 1) * lightsPerPage);
  const statusDomains = new Set(visibleStatusDomains);
  const toggleStatusDomain = (domain: "light" | "climate" | "media_player" | "security") => { const next=visibleStatusDomains.includes(domain) ? visibleStatusDomains.filter((item) => item !== domain) : [...visibleStatusDomains,domain]; setVisibleStatusDomains(next); localStorage.setItem(`homeii-status-${room.id}`,JSON.stringify(next)); };
  const toggleZone = (nextZone: "lights" | "climate" | "media" | "security" | "scenes") => { const next=visibleZones.includes(nextZone) ? visibleZones.filter((item) => item !== nextZone) : [...visibleZones,nextZone]; setVisibleZones(next); localStorage.setItem(`homeii-zones-${room.id}`,JSON.stringify(next)); };
  const activateScene = async (scene: { entity: string; name: string }) => { notify(`מפעיל אווירת ${scene.name}`); try { await hass?.callService("scene", "turn_on", {}, { entity_id: scene.entity }); notify(`אווירת ${scene.name} הופעלה`, "success"); } catch { notify(`הפעלת ${scene.name} נכשלה`, "error"); } };
  return <section className={`room-view ${intent ? `intent-${intent}` : ""}`}>
    <header className="room-hero">
      <div className="room-hero-shade" />
      <div className="room-hero-actions"><button className="room-back glass-soft" onClick={onHome}><Icon icon="mdi:arrow-right" /><span>מסך הבית</span></button>{isAdmin && <button className="room-status-settings glass-soft" onClick={() => setStatusConfigOpen((value) => !value)} aria-label="הגדרת החדר"><Icon icon="mdi:tune-variant" /></button>}</div>
      <div className="room-identity">
        <h1>{room.name}</h1>
        <p>{room.subtitle}</p>
      </div>
      <div className="room-metrics glass-soft">
        <Metric icon="mdi:thermometer" value={temperature?.state || String(climate?.attributes.current_temperature ?? "—")} suffix="°" />
        <Metric icon="mdi:water-percent" value={humidity?.state || "—"} suffix="%" />
      </div>
      <div className={`room-flow-launcher ${flowOpen ? "open" : ""}`}><button className="room-flow-trigger glass-soft" onClick={() => setFlowOpen((value) => !value)}><HomeiiIcon name="cinema" /><span><small>HOMEii Flow</small><strong>מה עושים בחדר?</strong></span><Icon icon={flowOpen ? "mdi:chevron-up" : "mdi:chevron-down"} /></button>{flowOpen && <nav className="room-flow glass-soft" aria-label="פעולות בחדר">{definition.media && <button onClick={() => { setZone("media"); setFlowOpen(false); }}><HomeiiIcon name="cinema" /><b>צפייה</b></button>}{definition.climate && <button onClick={() => { setZone("climate"); setFlowOpen(false); }}><HomeiiIcon name="climate" /><b>נוחות</b></button>}<button onClick={() => { setZone("lights"); setFlowOpen(false); }}><HomeiiIcon name="light" /><b>תאורה</b></button></nav>}</div>
      <RoomStatusCards domains={statusDomains} entities={localEntities} securityEntities={securityEntities} hass={hass} onOpen={(domain,ids) => { setRoomStatusOpen(domain); setRoomStatusSnapshot(ids); }} />
      {statusConfigOpen && <div className="room-status-config glass"><section><strong>מה יוצג ב־Status?</strong>{([['light','תאורה'],['climate','אקלים'],['media_player','מדיה'],['security','ביטחון']] as const).map(([id,label]) => <label key={id}><span>{label}</span><input type="checkbox" checked={visibleStatusDomains.includes(id)} onChange={() => toggleStatusDomain(id)} /></label>)}</section><section><strong>דומיינים בבורר החדר</strong>{([['lights','תאורה'],['climate','אקלים'],['media','מדיה'],['security','ביטחון'],['scenes','אווירה']] as const).map(([id,label]) => <label key={id}><span>{label}</span><input type="checkbox" checked={visibleZones.includes(id)} onChange={() => toggleZone(id)} /></label>)}</section></div>}
    </header>
    {feedback && <div className={`feedback-island ${feedback.tone}`} role="status" aria-live="polite"><span className="feedback-symbol">{feedback.tone === "working" ? <><i /><i /><i /></> : <Icon icon={feedback.tone === "success" ? "mdi:check" : "mdi:alert-circle-outline"} />}</span><strong>{feedback.message}</strong></div>}

    <nav className="room-zones glass-soft" aria-label="אזורי שליטה בחדר">
      {visibleZones.includes("lights") && <button className={zone === "lights" ? "active" : ""} onClick={() => setZone("lights")}><HomeiiGlyph name="ceiling" /><span>תאורה</span></button>}
      {visibleZones.includes("climate") && definition.climate && <button className={zone === "climate" ? "active" : ""} onClick={() => setZone("climate")}><HomeiiGlyph name="climate" /><span>אקלים</span></button>}
      {visibleZones.includes("media") && definition.media && <button className={zone === "media" ? "active" : ""} onClick={() => setZone("media")}><HomeiiGlyph name="media" /><span>מדיה</span></button>}
      {visibleZones.includes("security") && Boolean(securityEntities.length) && <button className={zone === "security" ? "active" : ""} onClick={() => setZone("security")}><Icon icon="mdi:shield-home-outline" /><span>ביטחון</span></button>}
      {visibleZones.includes("scenes") && Boolean(definition.scenes?.length) && <button className={zone === "scenes" ? "active" : ""} onClick={() => setZone("scenes")}><Icon icon="mdi:creation-outline" /><span>אווירה</span></button>}
    </nav>
    <div className={`room-layout zone-${zone}`}>
      {definition.climate && <div className={`room-zone room-zone-climate ${zone === "climate" ? "selected" : ""}`}><Thermostat entityId={definition.climate} temperatureEntity={definition.temperature} hass={hass} onFeedback={notify} /></div>}
      <section className={`room-zone room-zone-lights device-panel glass ${zone === "lights" ? "selected" : ""}`}>
        <header className="widget-heading"><span className="widget-glyph light-widget-glyph"><HomeiiGlyph name="ceiling" /></span><div><small>תאורה בחדר</small><h2>{lightsOn ? `${lightsOn} מוקדים פעילים` : "כל התאורה כבויה"}</h2></div><span className={`state-pill ${lightsOn ? "active" : "off"}`}><i />{lightsOn ? "פעילה" : "כבויה"}</span></header>
        <div className="light-grid">{visibleLights.map((device) => <LightControl key={device.entity} device={device} hass={hass} onFeedback={notify} />)}</div>
        {lightPages > 1 && <nav className="widget-pagination" aria-label="עמודי תאורה"><button disabled={lightPage === 0} onClick={() => setLightPage((page) => page - 1)}><Icon icon="mdi:chevron-right" /></button><span>{lightPage + 1} / {lightPages}</span><button disabled={lightPage >= lightPages - 1} onClick={() => setLightPage((page) => page + 1)}><Icon icon="mdi:chevron-left" /></button></nav>}
      </section>
      {Boolean(definition.curtains?.length) && <section className="curtain-panel glass">
        <PanelTitle title="וילונות" subtitle="שליטה חזותית במצב הפתיחה" icon="mdi:curtains" />
        {definition.curtains!.map((device) => <CurtainControl key={device.entity} device={device} hass={hass} />)}
      </section>}
      {definition.media && <div className={`room-zone room-zone-media ${zone === "media" ? "selected" : ""}`}><MediaControl entityId={definition.media} hass={hass} onFeedback={notify} /></div>}
      {Boolean(securityEntities.length) && <section className={`room-zone room-zone-security security-panel glass ${zone === "security" ? "selected" : ""}`}><PanelTitle title="ביטחון" subtitle="חיישנים ומצב האזור" icon="mdi:shield-home-outline" /><div className="security-grid">{securityEntities.slice(0,9).map((id) => { const state=get(hass,id); const alert=available(state) && !["off","closed","locked","idle","standby"].includes(state?.state || ""); return <article className={alert ? "alert" : "safe"} key={id}><Icon icon={alert ? "mdi:alert-circle-outline" : "mdi:check-circle-outline"}/><span><strong>{String(state?.attributes.friendly_name || id)}</strong><small>{!available(state) ? "לא זמין" : alert ? "דורש בדיקה" : "תקין"}</small></span></article>; })}</div></section>}
      {Boolean(definition.scenes?.length) && <section className={`room-zone room-zone-scenes scene-panel glass ${zone === "scenes" ? "selected" : ""}`}>
        <PanelTitle title="אווירה" subtitle="סצנות מוכנות בלחיצה אחת" icon="mdi:creation-outline" />
        <div className="scene-row">{definition.scenes!.map((scene) => <button key={scene.entity} onClick={() => activateScene(scene)}><Icon icon={scene.icon} /><span>{scene.name}</span></button>)}</div>
      </section>}
    </div>
    <RoomStatusDialog domain={roomStatusOpen} ids={roomStatusSnapshot} hass={hass} onClose={() => setRoomStatusOpen(null)} />
  </section>;
}

function Metric({ icon, value, suffix }: { icon: string; value: string; suffix: string }) {
  return <span><Icon icon={icon} /><strong>{value}{value === "—" ? "" : suffix}</strong></span>;
}

type RoomStatusDomain = "light" | "climate" | "media_player" | "security";
const roomStatusMeta: Record<RoomStatusDomain,{label:string;icon:string;active:string;empty:string}> = {
  light:{label:"תאורה",icon:"mdi:lightbulb-group",active:"מוקדים פעילים",empty:"הכול כבוי"},
  climate:{label:"אקלים",icon:"mdi:snowflake-thermometer",active:"מזגנים פעילים",empty:"הכול כבוי"},
  media_player:{label:"מדיה",icon:"mdi:play-circle",active:"נגנים פעילים",empty:"אין נגינה"},
  security:{label:"ביטחון",icon:"mdi:shield-home",active:"דורשים בדיקה",empty:"הכול תקין"}
};
function roomEntityActive(domain:RoomStatusDomain,state?:HassEntity){if(!available(state))return false;if(domain==="light")return state?.state==="on";if(domain==="climate")return state?.state!=="off";if(domain==="media_player")return ["playing","paused","buffering"].includes(state?.state||"");return !["off","closed","locked","idle","standby"].includes(state?.state||"");}
function RoomStatusCards({domains,entities,securityEntities,hass,onOpen}:{domains:Set<string>;entities:RoomAreaEntities;securityEntities:string[];hass?:HomeAssistant;onOpen:(domain:RoomStatusDomain,ids:string[])=>void}){
  const list:RoomStatusDomain[]=["light","climate","media_player","security"];
  return <div className="room-status-cards status-carousel" aria-label="מצב החדר">{list.filter((domain)=>domains.has(domain)).map((domain)=>{const ids=domain==="security"?securityEntities:entities[domain];if(!ids.length)return null;const activeIds=ids.filter((id)=>roomEntityActive(domain,get(hass,id)));const meta=roomStatusMeta[domain];return <button key={domain} className={`status-card status-${domain} ${activeIds.length?"active":"idle"}`} onClick={()=>onOpen(domain,activeIds)}><span className="status-card-icon"><Icon icon={meta.icon}/><i/></span><span><small>{meta.label}</small><strong>{activeIds.length?`${activeIds.length} ${meta.active}`:meta.empty}</strong></span><Icon icon="mdi:chevron-left"/></button>})}</div>;
}
function RoomStatusDialog({domain,ids,hass,onClose}:{domain:RoomStatusDomain|null;ids:string[];hass?:HomeAssistant;onClose:()=>void}){if(!domain)return null;const meta=roomStatusMeta[domain];return <div className="status-dialog-layer" onMouseDown={(event)=>event.target===event.currentTarget&&onClose()}><section className={`status-dialog status-${domain}`} role="dialog" aria-modal="true"><header><span className="status-dialog-icon"><Icon icon={meta.icon}/></span><div><small>פעיל כעת בחדר</small><h2>{meta.label}</h2></div><button onClick={onClose} aria-label="סגירה"><Icon icon="mdi:close"/></button></header><div className="status-entity-list">{ids.length?ids.map((id)=>{const state=get(hass,id);return <article className="active" key={id}><span><Icon icon={meta.icon}/></span><div><strong>{String(state?.attributes.friendly_name||id)}</strong><small>פעיל עכשיו</small></div><button onClick={()=>hass?.callService("homeassistant","toggle",{},{entity_id:id})} aria-label="שינוי מצב"><Icon icon="mdi:power"/></button></article>}):<div className="status-empty"><Icon icon="mdi:check-circle-outline"/><strong>{meta.empty}</strong></div>}</div></section></div>}

function PanelTitle({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
  return <header className="panel-title"><span><Icon icon={icon} /></span><div><h2>{title}</h2><p>{subtitle}</p></div></header>;
}

function Thermostat({ entityId, temperatureEntity, hass, onFeedback }: { entityId: string; temperatureEntity?: string; hass?: HomeAssistant; onFeedback: FeedbackHandler }) {
  const state = get(hass, entityId);
  const target = number(state?.attributes.temperature, 24);
  const current = number(state?.attributes.current_temperature, target);
  const min = number(state?.attributes.min_temp, 16);
  const max = number(state?.attributes.max_temp, 30);
  const active = available(state) && state?.state !== "off";
  const action = String(state?.attributes.hvac_action || (active ? "idle" : "off"));
  const visualMode = action === "cooling" ? "cool" : action === "heating" ? "heat" : action === "drying" ? "dry" : action === "fan" ? "fan_only" : state?.state || "off";
  const actionLabel = climateActionName(action, state?.state || "off");
  const history = useTemperatureHistory(hass, temperatureEntity || entityId, Boolean(temperatureEntity));
  const modes = Array.isArray(state?.attributes.hvac_modes) ? state!.attributes.hvac_modes as string[] : ["off", "cool", "heat", "fan_only"];
  const setTemperature = async (temperature: number) => { onFeedback(`מעדכן יעד ל־${temperature}°`); try { await hass?.callService("climate", "set_temperature", { temperature }, { entity_id: entityId }); onFeedback("טמפרטורת היעד עודכנה", "success"); } catch { onFeedback("עדכון הטמפרטורה נכשל", "error"); } };
  const setMode = async (hvac_mode: string) => { onFeedback(`מעביר למצב ${modeName(hvac_mode)}`); try { await hass?.callService("climate", "set_hvac_mode", { hvac_mode }, { entity_id: entityId }); onFeedback(`מצב ${modeName(hvac_mode)} הופעל`, "success"); } catch { onFeedback("שינוי מצב המזגן נכשל", "error"); } };
  const progress = Math.max(0, Math.min(1, (target - min) / (max - min)));
  const currentProgress = Math.max(0, Math.min(1, (current - min) / (max - min)));
  return <section className={`thermostat widget-shell glass mode-${visualMode} action-${action} ${active ? "active" : ""}`}>
    <header className="widget-heading"><span className="widget-glyph"><Icon icon={modeIcon(visualMode)} /></span><div><small>אקלים בחדר</small><h2>{actionLabel}</h2></div><span className={`state-pill ${active ? "active" : "off"}`}><i />{active ? modeName(state?.state || "") : "כבוי"}</span></header>
    <div className="thermostat-stage" style={{ "--thermo-progress": `${progress * 360}deg`, "--current-progress": `${currentProgress * 360}deg` } as React.CSSProperties}>
      <i className="temperature-ring target-ring" /><i className="temperature-ring current-ring" />
      <div className="airflow"><i /><i /><i /></div>
      <div className="thermostat-dial">
        <small>בחדר</small><strong>{current.toFixed(1)}°</strong><span className="target-label">יעד <b>{target.toFixed(1)}°</b></span><span>{temperatureDelta(current,target)}</span>
      </div>
    </div>
    <TemperatureSparkline values={history} />
    <div className="temperature-stepper">
      <button aria-label="הורדת טמפרטורה" disabled={!available(state) || target <= min} onClick={() => setTemperature(target - .5)}><Icon icon="mdi:minus" /></button>
      <span>{min}°—{max}°</span>
      <button aria-label="העלאת טמפרטורה" disabled={!available(state) || target >= max} onClick={() => setTemperature(target + .5)}><Icon icon="mdi:plus" /></button>
    </div>
    <div className="mode-row">{modes.map((mode) => <button className={state?.state === mode ? "active" : ""} key={mode} onClick={() => setMode(mode)}><Icon icon={modeIcon(mode)} /><span>{modeName(mode)}</span></button>)}</div>
  </section>;
}

function LightControl({ device, hass, onFeedback }: { device: RoomDeviceConfig; hass?: HomeAssistant; onFeedback: FeedbackHandler }) {
  const state = get(hass, device.entity);
  const actualActive = state?.state === "on";
  const actualBrightness = Math.round(number(state?.attributes.brightness, actualActive ? 255 : 0) / 2.55);
  const colorModes = Array.isArray(state?.attributes.supported_color_modes) ? state!.attributes.supported_color_modes as string[] : [];
  const dimmable = colorModes.some((mode) => mode !== "onoff") || typeof state?.attributes.brightness === "number";
  const [optimisticActive, setOptimisticActive] = useState<boolean | null>(null);
  const [dragBrightness, setDragBrightness] = useState<number | null>(null);
  const drag = useRef({ startX: 0, moved: false });
  const active = optimisticActive ?? actualActive;
  const brightness = dragBrightness ?? (optimisticActive === true && !actualActive ? 100 : actualBrightness);
  useEffect(() => { setOptimisticActive(null); setDragBrightness(null); }, [state?.state, state?.attributes.brightness]);
  const toggle = async () => {
    if (!hass || !available(state)) return;
    setOptimisticActive(!active);
    onFeedback(`${!active ? "מדליק" : "מכבה"} ${device.name}`);
    try { await hass.callService("light", "toggle", {}, { entity_id: device.entity }); onFeedback(`${device.name} ${!active ? "הופעלה" : "כובתה"}`, "success"); } catch { setOptimisticActive(null); onFeedback(`הפעולה ב־${device.name} נכשלה`, "error"); }
  };
  const levelFromPointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.max(1, Math.min(100, Math.round(((rect.right - event.clientX) / rect.width) * 100)));
  };
  const pointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!dimmable || !available(state)) return;
    drag.current = { startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dimmable || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    if (Math.abs(event.clientX - drag.current.startX) > 5) drag.current.moved = true;
    if (drag.current.moved) { setOptimisticActive(true); setDragBrightness(levelFromPointer(event)); }
  };
  const pointerUp = async (event: React.PointerEvent<HTMLElement>) => {
    if (!dimmable || !available(state)) return toggle();
    if (!drag.current.moved) return toggle();
    const level = levelFromPointer(event);
    setOptimisticActive(true); setDragBrightness(level);
    onFeedback(`${device.name} · ${level}%`);
    try { await hass?.callService("light", "turn_on", { brightness_pct: level }, { entity_id: device.entity }); onFeedback(`עוצמת ${device.name} עודכנה`, "success"); } catch { setOptimisticActive(null); setDragBrightness(null); onFeedback(`עדכון ${device.name} נכשל`, "error"); }
  };
  return <article className={`light-control ${active ? "active" : ""} ${dimmable ? "dimmable" : "binary"}`} style={{ "--light-level": brightness / 100, "--light-percent": `${brightness}%` } as React.CSSProperties} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}>
    <button className="light-main" onClick={(event) => { event.preventDefault(); }} disabled={!available(state)} aria-pressed={active}>
      <span className="light-orb"><HomeiiGlyph name={lightGlyph(device)} /></span>
      <span><strong>{device.name}</strong><small>{!available(state) ? "לא זמין" : active ? dimmable ? `פעילה · ${brightness}%` : "פעילה" : "כבויה"}</small></span>
      <Icon icon="mdi:power" />
    </button>
    {dimmable && <div className="swipe-hint"><span>החלק לעמעום</span><Icon icon="mdi:gesture-swipe-horizontal" /></div>}
  </article>;
}

function CurtainControl({ device, hass }: { device: RoomDeviceConfig; hass?: HomeAssistant }) {
  const state = get(hass, device.entity);
  const open = state?.state === "on";
  return <button className={`curtain-control ${open ? "open" : "closed"}`} disabled={!available(state)} onClick={() => hass?.callService("homeassistant", "toggle", {}, { entity_id: device.entity })}>
    <span className="curtain-window"><i /><i /><b><Icon icon="mdi:weather-sunny" /></b></span>
    <span><strong>{device.name}</strong><small>{!available(state) ? "לא זמין" : open ? "פתוח" : "סגור"}</small></span>
    <Icon icon={open ? "mdi:curtains" : "mdi:curtains-closed"} />
  </button>;
}

function MediaControl({ entityId, hass, onFeedback }: { entityId: string; hass?: HomeAssistant; onFeedback: FeedbackHandler }) {
  const state = get(hass, entityId);
  const playing = state?.state === "playing";
  const title = String(state?.attributes.media_title || state?.attributes.friendly_name || "נגן מדיה");
  const artist = String(state?.attributes.media_artist || (available(state) ? state?.state : "לא זמין"));
  const picture = typeof state?.attributes.entity_picture === "string" ? state.attributes.entity_picture : "";
  const position = number(state?.attributes.media_position, 0), duration = number(state?.attributes.media_duration, 0);
  const progress = duration > 0 ? Math.min(100, (position / duration) * 100) : 0;
  const volume = Math.round(number(state?.attributes.volume_level, 0) * 100);
  const service = async (name: string, message: string) => { onFeedback(message); try { await hass?.callService("media_player", name, {}, { entity_id: entityId }); onFeedback("פקודת המדיה בוצעה", "success"); } catch { onFeedback("פקודת המדיה נכשלה", "error"); } };
  const setVolume = async (next: number) => { onFeedback(`עוצמת שמע ${next}%`); try { await hass?.callService("media_player", "volume_set", { volume_level: next / 100 }, { entity_id: entityId }); } catch { onFeedback("שינוי עוצמת השמע נכשל", "error"); } };
  return <section className={`media-control widget-shell glass media-${state?.state || "unavailable"} ${playing ? "playing" : ""}`}>
    <header className="widget-heading"><span className="widget-glyph"><HomeiiGlyph name="media" /></span><div><small>מדיה בחדר</small><h2>{playing ? "מתנגן עכשיו" : state?.state === "paused" ? "הנגינה מושהית" : state?.state === "off" ? "הנגן כבוי" : "הנגן מוכן"}</h2></div><span className={`state-pill ${playing ? "active" : "off"}`}><i />{playing ? "מנגן" : state?.state === "paused" ? "מושהה" : "לא פעיל"}</span></header>
    <div className="now-playing"><span className="album-art" style={picture ? { backgroundImage: `linear-gradient(rgba(4,7,12,.05),rgba(4,7,12,.18)),url(${picture})` } : undefined}>{!picture && <Icon icon="mdi:music" />}</span><span><strong>{title}</strong><small>{artist}</small></span><span className="equalizer"><i /><i /><i /><i /></span></div>
    <div className="media-progress" aria-label="התקדמות הנגינה"><i style={{ width: `${progress}%` }} /></div>
    {duration > 0 && <div className="media-times"><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div>}
    <div className="transport">
      <button onClick={() => service("media_previous_track", "חוזר לרצועה הקודמת")}><Icon icon="mdi:skip-previous" /></button>
      <button className="play" onClick={() => service("media_play_pause", playing ? "משהה את הנגינה" : "מתחיל לנגן")}><Icon icon={playing ? "mdi:pause" : "mdi:play"} /></button>
      <button onClick={() => service("media_next_track", "עובר לרצועה הבאה")}><Icon icon="mdi:skip-next" /></button>
    </div>
    <label className="volume-control"><Icon icon={volume === 0 ? "mdi:volume-off" : "mdi:volume-high"} /><input type="range" min="0" max="100" value={volume} disabled={!available(state)} onChange={(event) => setVolume(Number(event.target.value))} /><strong>{volume}%</strong></label>
  </section>;
}

function modeName(mode: string) { return ({ off: "כבוי", cool: "קירור", heat: "חימום", fan_only: "אוורור", dry: "ייבוש", auto: "אוטומטי", heat_cool: "חימום וקירור" } as Record<string, string>)[mode] || mode; }
function modeIcon(mode: string) { return ({ off: "mdi:power", cool: "mdi:snowflake", heat: "mdi:fire", fan_only: "mdi:fan", dry: "mdi:water-percent", auto: "mdi:autorenew", heat_cool: "mdi:sun-snowflake-variant" } as Record<string, string>)[mode] || "mdi:circle-outline"; }
function lightGlyph(device: RoomDeviceConfig): GlyphName { const value = `${device.entity} ${device.name}`.toLowerCase(); if (value.includes("floor") || value.includes("רצפה")) return "floor"; if (value.includes("tv") || value.includes("screen") || value.includes("מסך") || value.includes("וילון")) return "ambient"; if (value.includes("ceiling") || value.includes("תקרה") || value.includes("ראשית") || value.includes("מרכז")) return "ceiling"; return "lamp"; }
function climateActionName(action: string, mode: string) { return ({ cooling: "מקרר עכשיו", heating: "מחמם עכשיו", drying: "מייבש את האוויר", fan: "מאוורר את החדר", idle: mode === "off" ? "המזגן כבוי" : "ממתין לטמפרטורת היעד", off: "המזגן כבוי" } as Record<string,string>)[action] || modeName(mode); }
function temperatureDelta(current: number, target: number) { const delta = current - target; if (Math.abs(delta) < .2) return "בדיוק ביעד"; return `${Math.abs(delta).toFixed(1)}° ${delta > 0 ? "מעל היעד" : "מתחת ליעד"}`; }
function formatTime(seconds: number) { const safe = Math.max(0,Math.floor(seconds)); return `${Math.floor(safe/60)}:${String(safe%60).padStart(2,"0")}`; }

function useTemperatureHistory(hass: HomeAssistant | undefined, entityId: string, sensorState: boolean) {
  const [values, setValues] = useState<number[]>([]);
  useEffect(() => {
    if (!hass?.callApi || !entityId) return;
    const start = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
    hass.callApi<Array<Array<{ state: string; attributes?: Record<string, unknown> }>>>("GET", `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}`).then((groups) => {
      const next = (groups?.[0] || []).map((item) => sensorState ? Number(item.state) : Number(item.attributes?.current_temperature)).filter(Number.isFinite);
      setValues(next.slice(-32));
    }).catch(() => setValues([]));
  }, [hass?.callApi, entityId, sensorState]);
  return values;
}

function TemperatureSparkline({ values }: { values: number[] }) {
  if (values.length < 2) return <div className="temperature-history empty"><Icon icon="mdi:chart-line" /><span>גרף הטמפרטורה יופיע כשנתוני ההיסטוריה זמינים</span></div>;
  const min = Math.min(...values), max = Math.max(...values), range = Math.max(.5,max-min);
  const points = values.map((value,index) => `${(index/(values.length-1))*100},${32-((value-min)/range)*26}`).join(" ");
  return <div className="temperature-history"><header><span>6 שעות אחרונות</span><strong>{values.at(-1)! >= values[0] ? "מגמת עלייה" : "מגמת ירידה"}</strong></header><svg viewBox="0 0 100 36" preserveAspectRatio="none" role="img" aria-label="גרף טמפרטורה בשש השעות האחרונות"><defs><linearGradient id="temp-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--mode-color)" stopOpacity=".34"/><stop offset="1" stopColor="var(--mode-color)" stopOpacity="0"/></linearGradient></defs><polygon points={`0,36 ${points} 100,36`} fill="url(#temp-area)"/><polyline points={points} fill="none" stroke="var(--mode-color)" strokeWidth="1.8" vectorEffect="non-scaling-stroke"/></svg></div>;
}
