import React, { useEffect, useMemo, useState } from "react";
import { defaultConfig } from "../defaultConfig";
import type { AppearanceSettings, HassEntity, HomeAssistant, HomeOSConfig, LinkConfig, RoomConfig, RoomDefinition } from "../types";
import { RoomView } from "./RoomView";
import { HomeiiIcon, roomIconName } from "./HomeiiIcon";
import { SpecialView } from "./SpecialView";
import { ControlCenter } from "./ControlCenter";
import { Studio } from "./Studio";

type Sheet = "rooms" | "media" | "security" | "more" | null;
type StatusDomain = "light" | "climate" | "media_player" | "security" | "person";

const Icon = ({ icon }: { icon: string }) => React.createElement("ha-icon", { icon });

function greeting(hour: number) {
  if (hour < 5) return "לילה טוב";
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  if (hour < 21) return "ערב טוב";
  return "לילה טוב";
}

function entity(hass: HomeAssistant | undefined, id: string | undefined): HassEntity | undefined {
  return id ? hass?.states[id] : undefined;
}

function displayState(value: HassEntity | undefined, suffix = "") {
  if (!value || ["unknown", "unavailable"].includes(value.state)) return "—";
  return `${value.state}${suffix}`;
}

async function readConfig(): Promise<HomeOSConfig> {
  try {
    const ingress = location.pathname.includes("/api/hassio_ingress/");
    const configPath = location.port === "5173" ? "/config.json" : ingress ? "./assets/config.json" : "/local/homeiios-app/config.json";
    const response = await fetch(`${configPath}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(String(response.status));
    const loaded = await response.json();
    if (ingress) {
      const localAsset = (value: string) => value.replace(/^\/local\/homeiios(?:-app)?\//, "./assets/");
      loaded.branding.logo = localAsset(loaded.branding.logo);
      Object.keys(loaded.backgrounds).forEach((key) => loaded.backgrounds[key] = localAsset(loaded.backgrounds[key]));
      Object.keys(loaded.timeBackgrounds).forEach((key) => loaded.timeBackgrounds[key] = localAsset(loaded.timeBackgrounds[key]));
      loaded.backgroundPresets.forEach((preset: { image: string }) => preset.image = localAsset(preset.image));
    }
    return { ...defaultConfig, ...loaded };
  } catch {
    return defaultConfig;
  }
}

type RuntimeWidget = { type: string; title: string; entityIds: string[]; visible: boolean; order: number };
type RuntimeArea = { id: string; name: string; picture?: string | null; widgets: RuntimeWidget[] };
type RuntimeProject = { schemaVersion: number; status: string; theme?: { preset?: string; tokens?: Record<string, string | number> }; areas: Record<string, RuntimeArea> };

function runtimeIcon(domain: string) {
  return ({ light: "mdi:lightbulb-group", climate: "mdi:thermostat", media_player: "mdi:speaker-multiple", camera: "mdi:cctv", lock: "mdi:shield-lock-outline", cover: "mdi:blinds", vacuum: "mdi:robot-vacuum" } as Record<string, string>)[domain] || "mdi:home-outline";
}

function runtimeProjectConfig(base: HomeOSConfig, project: RuntimeProject, hass?: HomeAssistant): HomeOSConfig {
  if (project.schemaVersion !== 2 || project.status !== "published") return base;
  const areas = Object.values(project.areas || {});
  const rooms: RoomConfig[] = areas.map((area) => {
    const domains = [...new Set(area.widgets.filter((widget) => widget.visible).map((widget) => widget.type))];
    return { id: area.id, areaIds: [area.id], name: area.name, icon: runtimeIcon(domains[0] || ""), subtitle: domains.map((domain) => domain.replace("media_player", "מדיה").replace("climate", "אקלים").replace("light", "תאורה")).join(" · "), legacyPath: area.id };
  });
  const definitions: Record<string, RoomDefinition> = {};
  const backgrounds = { ...base.backgrounds };
  for (const area of areas) {
    const widgets = [...area.widgets].filter((widget) => widget.visible).sort((a, b) => a.order - b.order);
    const entitiesFor = (type: string) => widgets.filter((widget) => widget.type === type).flatMap((widget) => widget.entityIds || []);
    const lights = entitiesFor("light").map((entityId) => ({ entity: entityId, name: String(hass?.states[entityId]?.attributes.friendly_name || entityId.split(".")[1]?.replaceAll("_", " ") || entityId), icon: "mdi:lightbulb-outline" }));
    definitions[area.id] = {
      climate: entitiesFor("climate")[0], media: entitiesFor("media_player")[0], lights,
      curtains: entitiesFor("cover").map((entityId) => ({ entity: entityId, name: String(hass?.states[entityId]?.attributes.friendly_name || entityId), icon: "mdi:blinds", kind: "curtain" as const })),
      statusDomains: (["light", "climate", "media_player", "security"] as const).filter((domain) => domain === "security" ? widgets.some((widget) => ["camera", "lock", "alarm_control_panel", "binary_sensor"].includes(widget.type)) : entitiesFor(domain).length > 0)
    };
    if (area.picture) backgrounds[area.id] = area.picture;
  }
  const tokens = project.theme?.tokens || {};
  return {
    ...base, rooms, roomDefinitions: definitions, backgrounds,
    appearance: { ...base.appearance!, ...(typeof tokens.accent === "string" ? { accent: tokens.accent, sidebarAccent: tokens.accent } : {}), ...(typeof tokens.surface === "string" ? { sectionColor: tokens.surface, tileColor: tokens.surface } : {}), ...(typeof tokens.text === "string" ? { textColor: tokens.text } : {}) }
  };
}

async function readRuntimeProject(): Promise<RuntimeProject | null> {
  if (!location.pathname.includes("/api/hassio_ingress/")) return null;
  try {
    const projectId = new URLSearchParams(location.search).get("project");
    const response = await fetch(`./api/runtime-project?t=${Date.now()}${projectId ? `&projectId=${encodeURIComponent(projectId)}` : ""}`, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json() as RuntimeProject;
  } catch { return null; }
}

export function HomeOSApp({ hass, narrow }: { hass?: HomeAssistant; narrow: boolean; route: unknown; panel: unknown }) {
  const [config, setConfig] = useState<HomeOSConfig>(defaultConfig);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultConfig.appearance!);
  const [logoSpinning, setLogoSpinning] = useState(false);
  const [statusOpen, setStatusOpen] = useState<StatusDomain | null>(null);
  const [statusSnapshot, setStatusSnapshot] = useState<Partial<Record<StatusDomain, number>>>({});
  const [statusEntitySnapshot, setStatusEntitySnapshot] = useState<Partial<Record<StatusDomain, string[]>>>({});
  const [areaRegistryEntities, setAreaRegistryEntities] = useState<Record<StatusDomain, string[]> | null>(null);
  const [roomAreaEntities, setRoomAreaEntities] = useState<Record<string, Record<StatusDomain, string[]>>>({});
  const [roomEnvironment, setRoomEnvironment] = useState<Record<string,{temperature?:string;humidity?:string}>>({});
  const [intent, setIntent] = useState<"cinema" | "climate" | null>(null);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true);
  const [kioskMode, setKioskMode] = useState(() => new URLSearchParams(location.search).has("kiosk"));
  const [hiddenByRoom,setHiddenByRoom]=useState<Record<string,string[]>>(()=>{try{return JSON.parse(localStorage.getItem("homeii-hidden-by-room")||"{}")}catch{return {}}});
  const [cameraSelection,setCameraSelection]=useState<string[]|null>(()=>{try{const saved=localStorage.getItem("homeii-camera-selection");return saved===null?null:JSON.parse(saved)}catch{return null}});
  const [globalFeedback,setGlobalFeedback]=useState<{message:string;type:string}|null>(null);

  useEffect(() => {
    Promise.all([readConfig(), readRuntimeProject()]).then(([base, project]) => {
      const next = project ? runtimeProjectConfig(base, project, hass) : base;
      setConfig(next);
      const saved = localStorage.getItem("homeiios-appearance");
      setAppearance(saved ? { ...next.appearance!, ...JSON.parse(saved) } : next.appearance!);
    });
  }, [Boolean(hass)]);
  useEffect(() => {
    const refresh = () => Promise.all([readConfig(), readRuntimeProject()]).then(([base, project]) => setConfig(project ? runtimeProjectConfig(base, project, hass) : base));
    window.addEventListener("homeii-project-published", refresh);
    return () => window.removeEventListener("homeii-project-published", refresh);
  }, [Boolean(hass)]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => { const sync=()=>{if(!document.fullscreenElement&&kioskMode)setKioskMode(false);};document.addEventListener("fullscreenchange",sync);return()=>document.removeEventListener("fullscreenchange",sync);},[kioskMode]);
  useEffect(()=>{let timer=0;const receive=(event:Event)=>{const detail=(event as CustomEvent<{message:string;type:string}>).detail;setGlobalFeedback(detail);window.clearTimeout(timer);timer=window.setTimeout(()=>setGlobalFeedback(null),2600);};window.addEventListener("homeii-feedback",receive);return()=>{window.removeEventListener("homeii-feedback",receive);window.clearTimeout(timer);};},[]);
  useEffect(() => {
    if (!hass?.callWS) return;
    let cancelled = false;
    Promise.all([
      hass.callWS<Array<{ area_id: string; name: string }>>({ type: "config/area_registry/list" }),
      hass.callWS<Array<{ entity_id: string; area_id?: string | null; device_id?: string | null; disabled_by?: string | null; original_device_class?: string | null }>>({ type: "config/entity_registry/list" }),
      hass.callWS<Array<{ id: string; area_id?: string | null }>>({ type: "config/device_registry/list" })
    ]).then(([areas, entities, devices]) => {
      if (cancelled) return;
      const areaIds = new Set(areas.map((area) => area.area_id));
      const deviceAreas = new Map(devices.map((device) => [device.id, device.area_id || null]));
      const grouped: Record<StatusDomain, string[]> = { light: [], climate: [], media_player: [], security: [], person: [] };
      const byArea: Record<string, Record<StatusDomain, string[]>> = {};
      const byAreaEnvironment:Record<string,{temperature:string[];humidity:string[]}>={};
      areas.forEach((area) => { byArea[area.area_id] = { light: [], climate: [], media_player: [], security: [], person: [] }; byAreaEnvironment[area.area_id]={temperature:[],humidity:[]}; });
      entities.forEach((entry) => {
        const areaId = entry.area_id || (entry.device_id ? deviceAreas.get(entry.device_id) : null);
        if (!areaId || !areaIds.has(areaId) || entry.disabled_by) return;
        const rawDomain = entry.entity_id.split(".", 1)[0];
        if(rawDomain==="sensor"&&entry.original_device_class==="temperature")byAreaEnvironment[areaId].temperature.push(entry.entity_id);
        if(rawDomain==="sensor"&&entry.original_device_class==="humidity")byAreaEnvironment[areaId].humidity.push(entry.entity_id);
        const domain = (["binary_sensor","camera","lock","alarm_control_panel"].includes(rawDomain) ? "security" : rawDomain) as StatusDomain;
        if (domain in grouped) { grouped[domain].push(entry.entity_id); byArea[areaId][domain].push(entry.entity_id); }
      });
      setAreaRegistryEntities(grouped);
      const normalize = (value: string) => value.toLocaleLowerCase("he").replace(/[\s_-]+/g, "");
      const mapped: Record<string, Record<StatusDomain, string[]>> = {};
      const mappedEnvironment:Record<string,{temperature?:string;humidity?:string}>={};
      config.rooms.forEach((room) => {
        const matched = areas.filter((item) => room.areaIds?.includes(item.area_id) || [room.id, room.legacyPath, room.name].some((value) => normalize(value) === normalize(item.area_id) || normalize(value) === normalize(item.name)));
        if (!matched.length) return;
        const merged: Record<StatusDomain,string[]> = { light:[], climate:[], media_player:[], security:[], person:[] };
        matched.forEach((area) => (Object.keys(merged) as StatusDomain[]).forEach((domain) => merged[domain].push(...byArea[area.area_id][domain])));
        (Object.keys(merged) as StatusDomain[]).forEach((domain) => merged[domain] = [...new Set(merged[domain])]);
        mapped[room.id] = merged;
        mappedEnvironment[room.id]={temperature:matched.flatMap((area)=>byAreaEnvironment[area.area_id].temperature)[0],humidity:matched.flatMap((area)=>byAreaEnvironment[area.area_id].humidity)[0]};
      });
      setRoomAreaEntities(mapped);
      setRoomEnvironment(mappedEnvironment);
    }).catch(() => setAreaRegistryEntities(null));
    return () => { cancelled = true; };
  }, [hass?.callWS, config.rooms]);

  const isAdmin = Boolean(hass?.user?.is_admin);
  const hour = time.getHours();
  const period = hour < 6 ? "night" : hour < 12 ? "morning" : hour < 18 ? "day" : "evening";
  const temperature = entity(hass, config.entities.temperature);
  const power = entity(hass, config.entities.power);
  const intercom = entity(hass, config.entities.intercomCount);
  const nightMode = entity(hass, config.entities.nightMode);
  const allLights = entity(hass, config.entities.allLights);
  const userName = hass?.user?.name?.split(" ")[0] || "";
  const timeBackground = config.timeBackgrounds?.[period];
  const configuredHeroBackground = ((activeView === "home" || activeView === "livingroom") && timeBackground) || config.backgrounds[activeView] || config.backgrounds.home || defaultConfig.backgrounds.home;
  const heroBackground = location.port === "5173" ? `/homeiios-livingroom-${period}.png` : configuredHeroBackground;
  const appBackground = appearance.background || heroBackground;

  const go = (path: string) => {
    setSheet(null);
    if (hass?.navigate) hass.navigate(path);
    else history.pushState(null, "", path);
    window.dispatchEvent(new Event("location-changed"));
  };

  const goLegacy = (path: string) => go(`${config.legacyDashboardPath}/${path}`);

  const openView = (id: string) => {
    setIntent(null);
    setActiveView(id);
    setSheet(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveAppearance = (next: AppearanceSettings) => {
    setAppearance(next);
    localStorage.setItem("homeiios-appearance", JSON.stringify(next));
  };
  const saveRoomHidden=(roomId:string,next:string[])=>setHiddenByRoom((current)=>{const value={...current,[roomId]:next};localStorage.setItem("homeii-hidden-by-room",JSON.stringify(value));return value;});
  const saveCameraSelection=(next:string[])=>{setCameraSelection(next);localStorage.setItem("homeii-camera-selection",JSON.stringify(next));};
  const exportProfile=()=>{const payload={schema:1,exportedAt:new Date().toISOString(),appearance,hiddenByRoom,cameraSelection,roomStatus:Object.fromEntries(config.rooms.map((room)=>[room.id,{status:JSON.parse(localStorage.getItem(`homeii-status-${room.id}`)||"null"),zones:JSON.parse(localStorage.getItem(`homeii-zones-${room.id}`)||"null")}]))};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download=`homeii-profile-${new Date().toISOString().slice(0,10)}.json`;anchor.click();URL.revokeObjectURL(url);};
  const importProfile=()=>{const input=document.createElement("input");input.type="file";input.accept="application/json";input.onchange=async()=>{const file=input.files?.[0];if(!file)return;try{const payload=JSON.parse(await file.text());if(payload.schema!==1||typeof payload.hiddenByRoom!=="object")throw new Error("invalid");if(payload.appearance){saveAppearance({...appearance,...payload.appearance});}setHiddenByRoom(payload.hiddenByRoom);localStorage.setItem("homeii-hidden-by-room",JSON.stringify(payload.hiddenByRoom));if(Array.isArray(payload.cameraSelection)){saveCameraSelection(payload.cameraSelection);}if(payload.roomStatus)Object.entries(payload.roomStatus as Record<string,{status?:unknown;zones?:unknown}>).forEach(([roomId,value])=>{if(value.status)localStorage.setItem(`homeii-status-${roomId}`,JSON.stringify(value.status));if(value.zones)localStorage.setItem(`homeii-zones-${roomId}`,JSON.stringify(value.zones));});window.dispatchEvent(new CustomEvent("homeii-feedback",{detail:{message:"פרופיל HOMEii יובא בהצלחה",type:"success"}}));}catch{window.dispatchEvent(new CustomEvent("homeii-feedback",{detail:{message:"קובץ הפרופיל אינו תקין",type:"error"}}));}};input.click();};

  const runBrandAction = async () => {
    const branding = config.branding || defaultConfig.branding!;
    if (branding.animation === "spin") {
      setLogoSpinning(false);
      requestAnimationFrame(() => setLogoSpinning(true));
      window.setTimeout(() => setLogoSpinning(false), 720);
    }
    const action = branding.action;
    if (action.type === "view") openView(action.target);
    if (action.type === "navigate") go(action.target);
    if (action.type === "service" && hass) {
      const [domain, service] = action.target.split(".", 2);
      if (domain && service) await hass.callService(domain, service, action.data || {}, action.entityId ? { entity_id: action.entityId } : undefined);
    }
  };

  const toggleKiosk = async () => {
    if(kioskMode){setKioskMode(false);if(document.fullscreenElement)await document.exitFullscreen?.();return;}
    setKioskMode(true);
    try{await document.documentElement.requestFullscreen?.();}catch{/* Companion/WebView can deny fullscreen; HOMEii kiosk remains active. */}
  };

  const toggle = async (entityId: string | undefined) => {
    if (!hass || !entityId) return;
    await hass.callService("homeassistant", "toggle", {}, { entity_id: entityId });
  };

  const activateScene = async () => {
    if (!hass || !config.entities.restoreScene) return;
    await hass.callService("scene", "turn_on", {}, { entity_id: config.entities.restoreScene });
  };

  const mediaLinks = useMemo(() => config.secondary.filter((item) => ["media"].includes(item.id)), [config]);
  const securityLinks = useMemo(() => config.secondary.filter((item) => ["security", "intercom"].includes(item.id)), [config]);
  const moreLinks = useMemo(() => config.secondary.filter((item) => item.id !== "media"), [config]);

  const selectedRoom = config.rooms.find((room) => room.id === activeView);
  const selectedLink = config.secondary.find((link) => link.id === activeView);
  const selectedItem = selectedRoom || selectedLink;
  const resolvedTheme = appearance.themeMode === "system" ? (systemDark ? "dark" : "light") : appearance.themeMode;
  const configuredEntities = useMemo(() => configuredAreaEntities(config.roomDefinitions || {}), [config.roomDefinitions]);
  const areaEntities = areaRegistryEntities || configuredEntities;
  const selectedAreaEntities=selectedRoom?filterAreaEntities(roomAreaEntities[selectedRoom.id],hiddenByRoom[selectedRoom.id]||[]):undefined;
  const baseSelectedDefinition = selectedRoom ? config.roomDefinitions?.[selectedRoom.id] || automaticRoomDefinition(roomAreaEntities[selectedRoom.id], roomEnvironment[selectedRoom.id], hass) : undefined;
  const selectedDefinition=selectedRoom&&baseSelectedDefinition?filterRoomDefinition(baseSelectedDefinition,hiddenByRoom[selectedRoom.id]||[]):undefined;

  return (
    <main className={`app ${kioskMode ? "kiosk-mode" : ""} theme-${resolvedTheme} palette-${resolvedTheme === "dark" ? appearance.darkPalette : appearance.lightPalette} density-${appearance.densityMode} ${appearance.highContrast ? "high-contrast" : ""} view-${activeView} period-${period} ${narrow ? "ha-narrow" : ""}`} dir="rtl" style={{
      "--hero-image": `url(${heroBackground})`,
      "--app-background-image": `url(${appBackground})`,
      "--accent": appearance.accent,
      "--cool": appearance.coolAccent,
      "--section-color": appearance.sectionColor,
      "--tile-color": appearance.tileColor,
      "--surface-alpha": appearance.surfaceOpacity / 100,
      "--tile-alpha": appearance.tileOpacity / 100,
      "--text": appearance.textColor,
      "--rail-accent": appearance.sidebarAccent,
      "--rail-icon": appearance.sidebarIconColor,
      "--background-dim": appearance.backgroundDim / 100,
      "--glass-blur": `${appearance.blur}px`,
      "--panel-radius": `${appearance.radius}px`
    } as React.CSSProperties}>
      <DesktopRail rooms={config.rooms} activeView={activeView} temperature={displayState(temperature, "°")} power={displayState(power, " W")} lightsActive={allLights?.state === "on"} connected={Boolean(hass)} isAdmin={isAdmin} logo={(config.branding || defaultConfig.branding!).logo} spinning={logoSpinning} onBrand={runBrandAction} onSettings={() => setMenuOpen(true)} onRoom={(room) => openView(room.id)} onHome={() => openView("home")} onMore={() => setSheet("more")} />
      {!kioskMode&&<button className="kiosk-fab glass-soft" onClick={toggleKiosk} aria-label="מצב מסך מלא"><Icon icon="mdi:fullscreen"/><span>מסך מלא</span></button>}

      <section className="content-shell">
        <header className="topbar">
          <button className="brand" onClick={runBrandAction} aria-label="HOMEii">
            <span className={`brand-mark ${logoSpinning ? "is-spinning" : ""}`}><img src={(config.branding || defaultConfig.branding!).logo} alt="" /></span>
            <span>HOMEii</span>
          </button>
          <div className="topbar-actions">
            <button className="icon-button kiosk-toggle" aria-label={kioskMode?"ביטול קיוסק":"מצב מסך מלא"} onClick={toggleKiosk}><Icon icon={kioskMode?"mdi:fullscreen-exit":"mdi:fullscreen"}/></button>
            <span className={`connection ${hass ? "online" : "offline"}`}>{hass ? "מחובר" : "ממתין ל־HA"}</span>
            {isAdmin && <button className="icon-button admin-only" aria-label="ניהול" onClick={() => setMenuOpen((value) => !value)}><Icon icon="mdi:tune-variant" /></button>}
          </div>
        </header>
        {kioskMode&&<button className="kiosk-exit glass-soft" onClick={toggleKiosk} aria-label="יציאה ממצב קיוסק"><Icon icon="mdi:fullscreen-exit"/><span>יציאה מקיוסק</span></button>}

        {menuOpen && isAdmin && (
          <aside className="admin-menu glass" aria-label="כלי מנהל">
            <header className="admin-menu-head"><div><small>HOMEii Studio</small><strong>הגדרות הממשק</strong></div><button className="admin-close" onClick={() => setMenuOpen(false)} aria-label="סגירת הגדרות"><Icon icon="mdi:close" /></button></header>
            <p>עריכת המבנה נעשית בקובץ config.json. משתמשים רגילים אינם רואים תפריט זה.</p>
            <button className="studio-launch" onClick={() => { setMenuOpen(false); setActiveView("studio"); }}><Icon icon="mdi:view-dashboard-outline" /> פתיחת HOMEii Studio</button>
            <button onClick={() => go("/config/dashboard")}>ניהול דשבורדים</button>
            <button onClick={() => readConfig().then(setConfig)}>טעינה מחדש של התצורה</button>
            <button onClick={toggleKiosk}><Icon icon="mdi:fullscreen" /> מצב מסך מלא · Kiosk</button>
            <div className="profile-actions"><button onClick={exportProfile}><Icon icon="mdi:tray-arrow-down"/>ייצוא פרופיל</button><button onClick={importProfile}><Icon icon="mdi:tray-arrow-up"/>ייבוא פרופיל</button></div>
            <AppearanceEditor value={appearance} presets={config.backgroundPresets || defaultConfig.backgroundPresets || []} onChange={saveAppearance} />
            <ControlCenter hass={hass} rooms={config.rooms} roomEntities={roomAreaEntities} hiddenByRoom={hiddenByRoom} cameraSelection={cameraSelection} onHiddenChange={saveRoomHidden} onCameraChange={saveCameraSelection}/>
          </aside>
        )}

        {activeView === "studio" ? <Studio hass={hass} onClose={() => openView("home")} /> : activeView === "home" ? <>
        <section className="hero" aria-label="מצב הבית">
          <div className="hero-overlay" />
          <div className="hero-copy">
            <span className="eyebrow">{greeting(hour)}{userName ? `, ${userName}` : ""}</span>
            <h1>{config.homeTitle}</h1>
            <p>{new Intl.DateTimeFormat("he-IL", { weekday: "long", day: "numeric", month: "long" }).format(time)}</p>
          </div>
          <div className="hero-time">
            <time>{new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit", hour12: false }).format(time)}</time>
            <span><Icon icon="mdi:weather-partly-cloudy" /> {displayState(temperature, "°")}</span>
          </div>
          <div className="hero-status glass-soft">
            <Status icon="mdi:lightbulb-group" label="תאורה" value={allLights?.state === "on" ? "פעילה" : "כבויה"} active={allLights?.state === "on"} />
            <Status icon="mdi:flash" label="צריכה" value={displayState(power, " W")} />
            <Status icon="mdi:doorbell-video" label="כניסה" value={displayState(intercom)} />
          </div>
          <StatusCarousel hass={hass} areaEntities={areaEntities} open={statusOpen} snapshot={statusSnapshot} onOpen={(domain, ids) => { setStatusSnapshot((current) => ({ ...current, [domain]: ids.length })); setStatusEntitySnapshot((current) => ({ ...current, [domain]: ids })); setStatusOpen(domain); }} />
          <IntentDock onCinema={() => { setIntent("cinema"); setActiveView("livingroom"); }} onClimate={() => { setIntent("climate"); setActiveView("livingroom"); }} onAway={() => setSheet("security")} />
        </section>

        <section className="control-grid">
          <section className="quick-panel glass">
            <SectionHeading title="פעולות מהירות" subtitle="הפעולות היומיומיות במקום אחד" />
            <div className="quick-actions">
              <ActionButton icon="mdi:weather-night" label="מצב לילה" active={nightMode?.state === "on"} onClick={() => toggle(config.entities.nightMode)} />
              <ActionButton icon="mdi:lightbulb-group" label="כל התאורה" active={allLights?.state === "on"} onClick={() => toggle(config.entities.allLights)} />
              <ActionButton icon="mdi:restore" label="שחזור" onClick={activateScene} />
              <ActionButton icon="mdi:cctv" label="מצלמות" onClick={() => setSheet("security")} />
            </div>
          </section>

          <section className="context-panel glass">
            <SectionHeading title="עכשיו בבית" subtitle="מידע שדורש תשומת לב" />
            <div className="context-list">
              <ContextRow icon="mdi:thermometer" label="טמפרטורה בחוץ" value={displayState(temperature, "°")} />
              <ContextRow icon="mdi:flash" label="צריכה נוכחית" value={displayState(power, " W")} />
              <ContextRow icon="mdi:doorbell-video" label="זוהו בכניסה" value={displayState(intercom)} />
            </div>
          </section>
        </section>
        </> : selectedRoom && selectedDefinition ? (
          <RoomView room={selectedRoom} definition={selectedDefinition} areaEntities={selectedAreaEntities} hass={hass} isAdmin={isAdmin} intent={intent} onHome={() => openView("home")} />
        ) : selectedItem ? (
          selectedLink ? <SpecialView item={selectedLink} hass={hass} legacyDashboardPath={config.legacyDashboardPath} cameraSelection={cameraSelection} onHome={() => openView("home")} /> : <WorkspaceView item={selectedItem} legacyDashboardPath={config.legacyDashboardPath} onHome={() => openView("home")} />
        ) : null}
      </section>

      <MobileNav activeView={activeView} onHome={() => openView("home")} onSelect={setSheet} />
      <BottomSheet title={sheet === "rooms" ? "חדרים" : sheet === "media" ? "מדיה" : sheet === "security" ? "אבטחה" : "עוד"} open={sheet !== null} onClose={() => setSheet(null)}>
        {sheet === "rooms" && <RoomList rooms={config.rooms} onSelect={(room) => openView(room.id)} />}
        {sheet === "media" && <LinkList links={mediaLinks} onSelect={(link) => openView(link.id)} />}
        {sheet === "security" && <LinkList links={securityLinks} onSelect={(link) => openView(link.id)} />}
        {sheet === "more" && <LinkList links={moreLinks} onSelect={(link) => openView(link.id)} />}
      </BottomSheet>
      <StatusDialog domain={statusOpen} hass={hass} entityIds={statusOpen ? statusEntitySnapshot[statusOpen] || [] : []} onClose={() => setStatusOpen(null)} />
      {globalFeedback&&<div className={`global-feedback ${globalFeedback.type}`} role="status"><Icon icon={globalFeedback.type==="success"?"mdi:check-circle":globalFeedback.type==="error"?"mdi:alert-circle":"mdi:progress-clock"}/><span>{globalFeedback.message}</span></div>}
    </main>
  );
}

function DesktopRail({ rooms, activeView, temperature, power, lightsActive, connected, isAdmin, logo, spinning, onBrand, onSettings, onRoom, onHome, onMore }: { rooms: RoomConfig[]; activeView: string; temperature: string; power: string; lightsActive: boolean; connected: boolean; isAdmin: boolean; logo: string; spinning: boolean; onBrand: () => void; onSettings: () => void; onRoom: (room: RoomConfig) => void; onHome: () => void; onMore: () => void }) {
  return <nav className="desktop-rail glass" aria-label="ניווט ראשי">
    <button className={`rail-brand ${activeView === "home" ? "active" : ""}`} onClick={() => { onHome(); onBrand(); }} aria-label="HOMEii · מסך הבית"><span className={`brand-mark ${spinning ? "is-spinning" : ""}`}><img src={logo} alt="" /></span><strong>HOMEii</strong></button>
    <div className="rail-divider" />
    <span className="rail-label">חדרים</span>
    <div className="rail-rooms">{rooms.map((room) => <button className={activeView === room.id ? "active" : ""} key={room.id} onClick={() => onRoom(room)} title={room.subtitle}><HomeiiIcon name={roomIconName(room.id,room.name)} /><span>{room.name}</span></button>)}</div>
    <section className="rail-live" aria-label="מצב הבית עכשיו">
      <span className="rail-weather"><Icon icon="mdi:weather-partly-cloudy" /><b>{temperature}</b><small>בחוץ</small></span>
      <span className="rail-power"><Icon icon="mdi:flash" /><b>{power}</b><small>צריכה</small></span>
      <span className={`rail-lights ${lightsActive ? "is-on" : ""}`}><Icon icon="mdi:lightbulb-group" /><b>{lightsActive ? "פעיל" : "כבוי"}</b><small>תאורה</small></span>
    </section>
    <div className="rail-system"><span className={connected ? "online" : "offline"} title={connected ? "מחובר" : "לא מחובר"}><i /></span>{isAdmin && <button onClick={onSettings} aria-label="הגדרות"><HomeiiIcon name="settings" /></button>}<button onClick={onMore} aria-label="אפשרויות נוספות"><HomeiiIcon name="more" /></button></div>
  </nav>;
}

function MobileNav({ activeView, onHome, onSelect }: { activeView: string; onHome: () => void; onSelect: (sheet: Sheet) => void }) {
  return <nav className="mobile-nav glass" aria-label="ניווט לנייד">
    <button className={activeView === "home" ? "active" : ""} onClick={onHome}><HomeiiIcon name="home" /><span>בית</span></button>
    <button onClick={() => onSelect("rooms")}><Icon icon="mdi:floor-plan" /><span>חדרים</span></button>
    <button onClick={() => onSelect("media")}><Icon icon="mdi:play-circle-outline" /><span>מדיה</span></button>
    <button onClick={() => onSelect("security")}><Icon icon="mdi:shield-home-outline" /><span>אבטחה</span></button>
    <button onClick={() => onSelect("more")}><Icon icon="mdi:dots-horizontal-circle-outline" /><span>עוד</span></button>
  </nav>;
}

function BottomSheet({ title, open, onClose, children }: React.PropsWithChildren<{ title: string; open: boolean; onClose: () => void }>) {
  if (!open) return null;
  return <div className="sheet-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="bottom-sheet glass" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sheet-handle" />
      <header><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="סגירה"><Icon icon="mdi:close" /></button></header>
      {children}
    </section>
  </div>;
}

function RoomList({ rooms, onSelect }: { rooms: RoomConfig[]; onSelect: (room: RoomConfig) => void }) {
  return <div className="sheet-grid">{rooms.map((room) => <button className="sheet-item" key={room.id} onClick={() => onSelect(room)}><span className="sheet-icon"><Icon icon={room.icon} /></span><span><strong>{room.name}</strong><small>{room.subtitle}</small></span><Icon icon="mdi:chevron-left" /></button>)}</div>;
}

function LinkList({ links, onSelect }: { links: LinkConfig[]; onSelect: (link: LinkConfig) => void }) {
  return <div className="sheet-grid">{links.map((link) => <button className="sheet-item" key={link.id} onClick={() => onSelect(link)}><span className="sheet-icon"><Icon icon={link.icon} /></span><strong>{link.name}</strong><Icon icon="mdi:chevron-left" /></button>)}</div>;
}

function WorkspaceView({ item, legacyDashboardPath, onHome }: { item: RoomConfig | LinkConfig; legacyDashboardPath: string; onHome: () => void }) {
  return <section className="workspace-view">
    <header className="workspace-header glass">
      <div className="workspace-title"><span><Icon icon={item.icon} /></span><div><small>HOMEiiOS</small><h1>{item.name}</h1></div></div>
      <button className="home-return" onClick={onHome}><Icon icon="mdi:home-rounded" /><span>חזרה לבית</span></button>
    </header>
    <div className="workspace-frame glass">
      <iframe title={item.name} src={`${legacyDashboardPath}/${item.legacyPath}?kiosk`} loading="lazy" allow="autoplay; fullscreen; microphone" />
    </div>
  </section>;
}

function AppearanceEditor({ value, presets, onChange }: { value: AppearanceSettings; presets: Array<{ id: string; name: string; image: string }>; onChange: (next: AppearanceSettings) => void }) {
  const set = <K extends keyof AppearanceSettings>(key: K, next: AppearanceSettings[K]) => onChange({ ...value, [key]: next });
  return <section className="appearance-editor">
    <div className="appearance-group"><h3>תצוגה ונגישות</h3>
    <div className="appearance-segments" aria-label="ערכת צבע">{(["system","dark","light"] as const).map((mode) => <button className={value.themeMode === mode ? "selected" : ""} key={mode} onClick={() => set("themeMode", mode)}>{mode === "system" ? "מערכת" : mode === "dark" ? "כהה" : "בהירה"}</button>)}</div>
    <span className="setting-caption">גווני ערכה כהה</span><div className="appearance-segments palette-segments">{([['rich-brown','חום עשיר','#241914','#3a2921','#fff8f2','#e6a96f','#efb478','#8fbef5'],['night-blue','כחול לילה','#111c2e','#1d2b42','#f4f8ff','#83bfff','#e8b875','#82bfff'],['granite','גרניט','#1a1c20','#292c31','#f5f5f4','#c4ccd8','#e2b67c','#a9c7ed']] as const).map(([id,label,section,tile,text,rail,accent,cool]) => <button className={value.darkPalette === id ? "selected" : ""} key={id} onClick={() => onChange({ ...value, themeMode:"dark", darkPalette:id, sectionColor:section, tileColor:tile, textColor:text, sidebarAccent:rail, sidebarIconColor:text, accent, coolAccent:cool })}>{label}</button>)}</div>
    <span className="setting-caption">גווני ערכה בהירה</span><div className="appearance-segments palette-segments">{([['bright-white','לבן','#ffffff','#e9eef5','#111827','#3978c5','#b87528','#3978c5'],['cream','שמנת','#fffaf1','#eae0d1','#302820','#a66f3f','#b87831','#4d7fac'],['ivory','אייבורי','#faf7ed','#e5dfd2','#292722','#8a744c','#a77431','#517da6'],['mocha','מוקה','#f3e9df','#d9c9bb','#332923','#9b684e','#a6633e','#607c9a']] as const).map(([id,label,section,tile,text,rail,accent,cool]) => <button className={value.lightPalette === id ? "selected" : ""} key={id} onClick={() => onChange({ ...value, themeMode:"light", lightPalette:id, sectionColor:section, tileColor:tile, textColor:text, sidebarAccent:rail, sidebarIconColor:text, accent, coolAccent:cool })}>{label}</button>)}</div>
    <div className="appearance-segments" aria-label="צפיפות">{(["comfort","compact"] as const).map((mode) => <button className={value.densityMode === mode ? "selected" : ""} key={mode} onClick={() => set("densityMode", mode)}>{mode === "comfort" ? "נוחה" : "קומפקטית"}</button>)}</div>
    <label className="contrast-toggle"><span>ניגודיות מוגברת</span><input type="checkbox" checked={value.highContrast} onChange={(event) => set("highContrast", event.target.checked)} /></label></div>
    <div className="appearance-group"><h3>צבעי הממשק</h3>
    <div className="color-fields">
      <label><span>צבע חם</span><input type="color" value={value.accent} onChange={(event) => set("accent", event.target.value)} /></label>
      <label><span>צבע משני</span><input type="color" value={value.coolAccent} onChange={(event) => set("coolAccent", event.target.value)} /></label>
      <label><span>רקע Sections</span><input type="color" value={value.sectionColor} onChange={(event) => set("sectionColor", event.target.value)} /></label>
      <label><span>צבע אריחים</span><input type="color" value={value.tileColor} onChange={(event) => set("tileColor", event.target.value)} /></label>
      <label><span>צבע טקסט</span><input type="color" value={value.textColor} onChange={(event) => set("textColor", event.target.value)} /></label>
      <label><span>הדגשה בסרגל</span><input type="color" value={value.sidebarAccent} onChange={(event) => set("sidebarAccent", event.target.value)} /></label>
      <label><span>אייקונים בסרגל</span><input type="color" value={value.sidebarIconColor} onChange={(event) => set("sidebarIconColor", event.target.value)} /></label>
    </div></div>
    <div className="appearance-group"><h3>זכוכית ומשטחים</h3>
    <label><span>שקיפות משטחים · {value.surfaceOpacity}%</span><input type="range" min="20" max="96" value={value.surfaceOpacity} onChange={(event) => set("surfaceOpacity", Number(event.target.value))} /></label>
    <label><span>שקיפות אריחים · {value.tileOpacity}%</span><input type="range" min="12" max="100" value={value.tileOpacity} onChange={(event) => set("tileOpacity", Number(event.target.value))} /></label>
    <label><span>כהות רקע הממשק · {value.backgroundDim}%</span><input type="range" min="0" max="80" value={value.backgroundDim} onChange={(event) => set("backgroundDim", Number(event.target.value))} /></label>
    <label><span>טשטוש · {value.blur}px</span><input type="range" min="0" max="40" value={value.blur} onChange={(event) => set("blur", Number(event.target.value))} /></label>
    <label><span>עיגול פינות · {value.radius}px</span><input type="range" min="8" max="38" value={value.radius} onChange={(event) => set("radius", Number(event.target.value))} /></label></div>
    <div className="appearance-group"><h3>רקע המערכת</h3>
    <label><span>תמונת רקע או נתיב `/local`</span><input className="text-input" type="text" value={value.background} placeholder="/local/homeiios/my-background.webp" onChange={(event) => set("background", event.target.value)} /></label>
    <div className="background-presets" aria-label="רקעים מוכנים">{presets.map((preset) => <button key={preset.id} className={value.background === preset.image ? "selected" : ""} style={preset.image ? { backgroundImage: `linear-gradient(rgba(4,7,12,.18),rgba(4,7,12,.35)),url(${preset.image})` } : undefined} onClick={() => set("background", preset.image)}><span>{preset.name}</span></button>)}</div></div>
    <button onClick={() => onChange(defaultConfig.appearance!)}>איפוס עיצוב במכשיר זה</button>
    <small>השינויים נשמרים מקומית בדפדפן. שמירה מערכתית תתווסף לעורך המרכזי.</small>
  </section>;
}

function configuredAreaEntities(definitions: Record<string, RoomDefinition>): Record<StatusDomain, string[]> {
  const unique = (values: Array<string | undefined>) => [...new Set(values.filter(Boolean) as string[])];
  const rooms = Object.values(definitions);
  return {
    light: unique(rooms.flatMap((room) => room.lights.map((item) => item.entity))),
    climate: unique(rooms.map((room) => room.climate)),
    media_player: unique(rooms.map((room) => room.media)),
    security: [],
    person: []
  };
}

function filterAreaEntities(entities:Record<StatusDomain,string[]>|undefined,hidden:string[]){if(!entities)return undefined;const blocked=new Set(hidden);return Object.fromEntries((Object.keys(entities) as StatusDomain[]).map((domain)=>[domain,entities[domain].filter((id)=>!blocked.has(id))])) as Record<StatusDomain,string[]>;}
function filterRoomDefinition(definition:RoomDefinition,hidden:string[]):RoomDefinition{const blocked=new Set(hidden);return {...definition,climate:definition.climate&&!blocked.has(definition.climate)?definition.climate:undefined,temperature:definition.temperature&&!blocked.has(definition.temperature)?definition.temperature:undefined,humidity:definition.humidity&&!blocked.has(definition.humidity)?definition.humidity:undefined,lights:definition.lights.filter((item)=>!blocked.has(item.entity)),curtains:definition.curtains?.filter((item)=>!blocked.has(item.entity)),media:definition.media&&!blocked.has(definition.media)?definition.media:undefined};}

function automaticRoomDefinition(entities: Record<StatusDomain, string[]> | undefined, environment:{temperature?:string;humidity?:string}|undefined, hass?: HomeAssistant): RoomDefinition | undefined {
  if (!entities) return undefined;
  return {
    climate: entities.climate[0],
    temperature:environment?.temperature,
    humidity:environment?.humidity,
    lights: entities.light.map((entity) => ({ entity, name: String(hass?.states[entity]?.attributes.friendly_name || entity), icon: "mdi:lightbulb-outline" })),
    media: entities.media_player[0],
    scenes: [],
    statusDomains: (["light", "climate", "media_player", "security"] as const).filter((domain) => entities[domain].length)
  };
}

const statusMeta: Record<StatusDomain, { label: string; icon: string; active: string; empty: string }> = {
  light: { label: "תאורה", icon: "mdi:lightbulb-group", active: "מוקדים פעילים", empty: "הכול כבוי" },
  climate: { label: "אקלים", icon: "mdi:snowflake-thermometer", active: "מזגנים פעילים", empty: "הכול כבוי" },
  media_player: { label: "מדיה", icon: "mdi:play-circle", active: "נגנים פעילים", empty: "אין נגינה" },
  security: { label: "ביטחון", icon: "mdi:shield-home", active: "פריטים דורשים בדיקה", empty: "הכול תקין" },
  person: { label: "בבית", icon: "mdi:account-group", active: "אנשים בבית", empty: "הבית ריק" }
};

function isDomainActive(domain: StatusDomain, state?: HassEntity) {
  if (!state || ["unknown", "unavailable"].includes(state.state)) return false;
  if (domain === "light") return state.state === "on";
  if (domain === "climate") return state.state !== "off";
  if (domain === "media_player") return ["playing", "paused", "buffering"].includes(state.state);
  if (domain === "security") return !["off", "closed", "locked", "idle", "standby"].includes(state.state);
  return state.state === "home";
}

function StatusCarousel({ hass, areaEntities, open, snapshot, onOpen }: { hass?: HomeAssistant; areaEntities: Record<StatusDomain, string[]>; open: StatusDomain | null; snapshot: Partial<Record<StatusDomain, number>>; onOpen: (domain: StatusDomain, ids: string[]) => void }) {
  const persons = Object.keys(hass?.states || {}).filter((id) => id.startsWith("person."));
  return <div className="status-carousel" aria-label="מצב הבית">
    {(Object.keys(statusMeta) as StatusDomain[]).map((domain) => {
      const ids = domain === "person" ? persons : areaEntities[domain];
      const activeIds = ids.filter((id) => isDomainActive(domain, hass?.states[id]));
      const liveCount = activeIds.length;
      const count = open ? snapshot[domain] ?? liveCount : liveCount;
      const meta = statusMeta[domain];
      return <button key={domain} className={`status-card status-${domain} ${count ? "active" : "idle"}`} onClick={() => onOpen(domain, domain === "person" ? ids : activeIds)}>
        <span className="status-card-icon"><Icon icon={meta.icon} /><i /></span><span><small>{meta.label}</small><strong>{count ? `${count} ${meta.active}` : meta.empty}</strong></span><Icon icon="mdi:chevron-left" />
      </button>;
    })}
  </div>;
}

function StatusDialog({ domain, hass, entityIds, onClose }: { domain: StatusDomain | null; hass?: HomeAssistant; entityIds: string[]; onClose: () => void }) {
  if (!domain) return null;
  const ids = entityIds;
  const meta = statusMeta[domain];
  return <div className="status-dialog-layer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`status-dialog status-${domain}`} role="dialog" aria-modal="true" aria-label={meta.label}>
      <header><span className="status-dialog-icon"><Icon icon={meta.icon} /></span><div><small>מצב הבית בזמן אמת</small><h2>{meta.label}</h2></div><button onClick={onClose} aria-label="סגירה"><Icon icon="mdi:close" /></button></header>
      <div className="status-entity-list">{ids.length ? ids.map((id) => { const state = hass?.states[id]; const active = isDomainActive(domain, state); const personLocation=domain === "person" ? String(state?.state === "home" ? "בבית" : state?.state === "not_home" ? "מחוץ לבית" : state?.state || "לא ידוע") : ""; return <article className={active ? "active" : "idle"} key={id}><span><Icon icon={domain === "person" ? "mdi:account" : meta.icon} /></span><div><strong>{String(state?.attributes.friendly_name || id)}</strong><small>{!state || ["unknown", "unavailable"].includes(state.state) ? "לא זמין" : domain === "person" ? personLocation : active ? "פעיל עכשיו" : "כבוי"}</small></div>{domain === "person" ? <button disabled={!state} onClick={() => window.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:id},bubbles:true,composed:true}))} aria-label={`הצגת ${String(state?.attributes.friendly_name || id)} במפה`}><Icon icon="mdi:map-marker-radius-outline" /></button> : <button disabled={!state || ["unknown", "unavailable"].includes(state.state)} onClick={() => hass?.callService("homeassistant", "toggle", {}, { entity_id: id })} aria-label={`${active ? "כיבוי" : "הדלקה"} ${String(state?.attributes.friendly_name || id)}`}><Icon icon="mdi:power" /></button>}</article>; }) : <div className="status-empty"><Icon icon="mdi:check-circle-outline" /><strong>{meta.empty}</strong></div>}</div>
      <footer><Icon icon="mdi:information-outline" /><span>המספר בכרטיס יתעדכן לאחר סגירת החלון</span></footer>
    </section>
  </div>;
}

function IntentDock({ onCinema, onClimate, onAway }: { onCinema: () => void; onClimate: () => void; onAway: () => void }) {
  const [open, setOpen] = useState(false);
  return <div className={`flow-launcher ${open ? "open" : ""}`}>
    <button className="flow-trigger glass-soft" onClick={() => setOpen((value) => !value)} aria-expanded={open}><HomeiiIcon name="cinema" /><span><small>HOMEii Flow</small><strong>מה עושים עכשיו?</strong></span><Icon icon={open ? "mdi:chevron-down" : "mdi:chevron-up"} /></button>
    {open && <nav className="intent-dock glass-soft" aria-label="מה תרצו לעשות">
      <button onClick={onCinema}><span><HomeiiIcon name="cinema" /></span><b>צפייה</b><small>מדיה ואווירה</small></button>
      <button onClick={onClimate}><span><HomeiiIcon name="climate" /></span><b>נוחות</b><small>אקלים בחדר</small></button>
      <button onClick={onAway}><span><HomeiiIcon name="away" /></span><b>יוצאים</b><small>בדיקת הבית</small></button>
    </nav>}
  </div>;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) { return <header className="section-heading"><div><h2>{title}</h2><p>{subtitle}</p></div></header>; }
function Status({ icon, label, value, active = false }: { icon: string; label: string; value: string; active?: boolean }) { return <div className={`status ${active ? "active" : ""}`}><Icon icon={icon} /><span><small>{label}</small><strong>{value}</strong></span></div>; }
function ActionButton({ icon, label, active = false, onClick }: { icon: string; label: string; active?: boolean; onClick: () => void }) { return <button className={`action-button ${active ? "active" : ""}`} onClick={onClick}><span><Icon icon={icon} /></span><strong>{label}</strong></button>; }
function ContextRow({ icon, label, value }: { icon: string; label: string; value: string }) { return <div className="context-row"><span className="context-icon"><Icon icon={icon} /></span><span>{label}</span><strong>{value}</strong></div>; }
