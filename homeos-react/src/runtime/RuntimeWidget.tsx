import React, { useMemo } from "react";
import type { HomeAssistant, HassEntity } from "../types";
import { HACardHost } from "./HACardHost";

type Widget = { id: string; widgetType: string; entityIds: string[]; size: string; settings?: Record<string, unknown> };
const labels: Record<string, string> = { "light.collection":"תאורה","climate.thermostat":"אקלים","media.player":"מדיה","camera.viewer":"מצלמה","cover.control":"פתחים","fan.control":"מאוורר","switch.collection":"מתגים","security.lock":"מנעול","security.alarm":"אזעקה","sensor.temperature":"טמפרטורה","sensor.humidity":"לחות","sensor.power":"הספק","sensor.energy":"אנרגיה","sensor.value":"חיישן","binary_sensor.status":"מצב","person.presence":"נוכחות","weather.forecast":"מזג אוויר","entity.generic":"ישויות" };
const entityName = (entity?: HassEntity) => String(entity?.attributes.friendly_name ?? entity?.entity_id.split(".")[1]?.replaceAll("_", " ") ?? "ישות");
const inactive = new Set(["off", "unavailable", "unknown", "idle", "not_home", "closed"]);

export function RuntimeWidget({ widget, hass, onFeedback }: { widget: Widget; hass: HomeAssistant; onFeedback: (message: string) => void }) {
  const entities = useMemo(() => widget.entityIds.map((id) => hass.states[id]).filter(Boolean), [widget.entityIds, hass.states]);
  const primary = entities[0];
  const active = entities.filter((entity) => !inactive.has(entity.state)).length;
  async function toggle(entity: HassEntity) { await hass.callService("homeassistant", "toggle", {}, { entity_id: entity.entity_id }); onFeedback(`${entityName(entity)} · הפעולה נשלחה`); }
  async function climateStep(delta: number) { if (!primary) return; const target=Number(primary.attributes.temperature ?? primary.attributes.target_temp_high ?? 24); await hass.callService("climate","set_temperature",{temperature:target+delta},{entity_id:primary.entity_id}); onFeedback(`טמפרטורת היעד ${target+delta}°`); }

  if (widget.widgetType === "legacy.lovelace-card" && widget.settings?.source && typeof widget.settings.source === "object") return <HACardHost hass={hass} config={widget.settings.source as Record<string, unknown>} />;

  if (widget.widgetType === "climate.thermostat" && primary) {
    const current=Number(primary.attributes.current_temperature ?? 0), target=Number(primary.attributes.temperature ?? primary.attributes.target_temp_high ?? 0), mode=primary.state;
    return <article className={`runtime-widget climate-widget mode-${mode} size-${widget.size}`}><header><div><small>אקלים בחדר</small><h3>{entityName(primary)}</h3></div><span>{mode}</span></header><div className="climate-orbit"><div><small>עכשיו</small><strong>{current.toFixed(1)}°</strong><b>יעד {target.toFixed(1)}°</b></div></div><footer><button onClick={()=>climateStep(.5)}>+</button><span>{String(primary.attributes.hvac_action ?? mode)}</span><button onClick={()=>climateStep(-.5)}>−</button></footer></article>;
  }
  if (widget.widgetType === "camera.viewer" && primary) return <article className={`runtime-widget camera-widget size-${widget.size}`}><img src={`/api/camera_proxy/${primary.entity_id}`} alt={entityName(primary)} loading="lazy"/><header><div><small>מצלמה</small><h3>{entityName(primary)}</h3></div><span>LIVE</span></header></article>;
  if (widget.widgetType === "media.player" && primary) { const playing=primary.state==="playing"; return <article className={`runtime-widget media-widget ${playing?"is-active":""} size-${widget.size}`}><header><div><small>מדיה</small><h3>{entityName(primary)}</h3></div><span>{primary.state}</span></header><div className="media-title"><strong>{String(primary.attributes.media_title ?? "אין תוכן פעיל")}</strong><small>{String(primary.attributes.media_artist ?? primary.attributes.app_name ?? "")}</small></div><footer><button onClick={()=>hass.callService("media_player","media_previous_track",{},{entity_id:primary.entity_id})}>‹</button><button className="media-main" onClick={()=>hass.callService("media_player",playing?"media_pause":"media_play",{},{entity_id:primary.entity_id})}>{playing?"Ⅱ":"▶"}</button><button onClick={()=>hass.callService("media_player","media_next_track",{},{entity_id:primary.entity_id})}>›</button></footer></article>; }
  if (widget.widgetType.startsWith("sensor.") && primary) return <article className={`runtime-widget sensor-widget size-${widget.size}`}><header><div><small>{labels[widget.widgetType]??"חיישן"}</small><h3>{entityName(primary)}</h3></div></header><strong className="sensor-value">{primary.state}<small>{String(primary.attributes.unit_of_measurement??"")}</small></strong></article>;
  return <article className={`runtime-widget collection-widget ${active?"is-active":""} size-${widget.size}`}><header><div><small>{labels[widget.widgetType]??widget.widgetType}</small><h3>{active?`${active} פעילים`:"הכל שקט"}</h3></div><span>{entities.length}</span></header><div className="entity-controls">{entities.slice(0,8).map((entity)=><button className={!inactive.has(entity.state)?"active":""} key={entity.entity_id} onClick={()=>toggle(entity)}><i/><span><strong>{entityName(entity)}</strong><small>{entity.state}</small></span></button>)}</div></article>;
}
