import React, { useEffect, useMemo, useState } from "react";
import type { HomeAssistant } from "../types";

const Icon = ({ icon }: { icon: string }) => React.createElement("ha-icon", { icon });
type WidgetSize = "compact" | "regular" | "expanded";
type StudioWidget = { id: string; type: string; title: string; entityIds: string[]; size: WidgetSize; order: number; visible: boolean; settings: Record<string, unknown> };
type StudioArea = { id: string; name: string; picture?: string | null; template: string; widgets: StudioWidget[] };
type StudioProject = { schemaVersion: 2; revision: number; id: string; name: string; status: "draft" | "published"; updatedAt: string; theme: { preset: string; tokens: Record<string, string | number> }; breakpoints: Record<string, number>; areas: Record<string, StudioArea>; permissions: { defaultRole: string; users: Record<string, unknown> } };
type Discovery = { areas: Array<{ id: string; name: string; picture?: string; domains: Record<string, string[]> }>; counts: { areas: number; devices: number; entities: number } };

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`./api/${path}`, { cache: "no-store", ...options, headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response.json();
}

const widgetMeta: Record<string, { label: string; icon: string }> = {
  light: { label: "תאורה", icon: "mdi:lightbulb-group" }, climate: { label: "אקלים", icon: "mdi:thermostat" },
  media_player: { label: "מדיה", icon: "mdi:speaker-multiple" }, camera: { label: "מצלמה", icon: "mdi:cctv" },
  cover: { label: "כיסוי", icon: "mdi:curtains" }, lock: { label: "נעילה", icon: "mdi:shield-lock-outline" },
  vacuum: { label: "שואב", icon: "mdi:robot-vacuum" }, sensor: { label: "מידע", icon: "mdi:chart-line" },
  "ha-card": { label: "כרטיס HA", icon: "mdi:view-dashboard-outline" }
};

export function Studio({ hass, onClose }: { hass?: HomeAssistant; onClose: () => void }) {
  const [project, setProject] = useState<StudioProject | null>(null);
  const [discovery, setDiscovery] = useState<Discovery | null>(null);
  const [areaId, setAreaId] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"layout" | "theme" | "migration">("layout");
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [yaml, setYaml] = useState("");
  const [migration, setMigration] = useState<Record<string, unknown> | null>(null);
  const [notice, setNotice] = useState("טוען את HOMEii Studio…");

  useEffect(() => {
    Promise.all([api<StudioProject>("project"), api<Discovery>("discovery")]).then(([nextProject, nextDiscovery]) => {
      setProject(nextProject); setDiscovery(nextDiscovery); setAreaId(Object.keys(nextProject.areas)[0] || ""); setNotice("");
    }).catch((error) => setNotice(`טעינת Studio נכשלה: ${error.message}`));
  }, []);

  const area = project?.areas[areaId];
  const widgets = useMemo(() => [...(area?.widgets || [])].sort((a, b) => a.order - b.order), [area]);
  const selected = widgets.find((widget) => widget.id === selectedId);
  const mutateArea = (change: (area: StudioArea) => StudioArea) => setProject((current) => current ? { ...current, status: "draft", areas: { ...current.areas, [areaId]: change(current.areas[areaId]) } } : current);
  const updateWidget = (id: string, patch: Partial<StudioWidget>) => mutateArea((current) => ({ ...current, widgets: current.widgets.map((widget) => widget.id === id ? { ...widget, ...patch } : widget) }));
  const reorder = (source: string, target: string) => mutateArea((current) => {
    const ordered = [...current.widgets].sort((a, b) => a.order - b.order);
    const from = ordered.findIndex((widget) => widget.id === source); const to = ordered.findIndex((widget) => widget.id === target);
    if (from < 0 || to < 0) return current;
    const [moved] = ordered.splice(from, 1); ordered.splice(to, 0, moved);
    return { ...current, widgets: ordered.map((widget, order) => ({ ...widget, order })) };
  });
  const addWidget = (type: string) => mutateArea((current) => {
    const ids = discovery?.areas.find((item) => item.id === areaId)?.domains[type] || [];
    const widget: StudioWidget = { id: `${areaId}-${type}-${Date.now()}`, type, title: widgetMeta[type]?.label || type, entityIds: ids, size: "regular", order: current.widgets.length, visible: true, settings: type === "ha-card" ? { card: { type: "tile", entity: ids[0] || "" } } : {} };
    setSelectedId(widget.id); return { ...current, widgets: [...current.widgets, widget] };
  });
  const save = async (publish = false) => {
    if (!project) return;
    setNotice(publish ? "מפרסם לכל המכשירים…" : "שומר טיוטה…");
    try { const saved = await api<StudioProject>("project", { method: "PUT", body: JSON.stringify({ ...project, status: publish ? "published" : "draft" }) }); setProject(saved); setNotice(publish ? "הגרסה פורסמה לכל המכשירים" : "הטיוטה נשמרה"); if (publish) window.dispatchEvent(new CustomEvent("homeii-project-published", { detail: saved })); }
    catch (error) { setNotice(`השמירה נכשלה: ${(error as Error).message}`); }
  };
  const previewMigration = async () => {
    setNotice("מנתח Lovelace YAML…");
    try { const result = await api<Record<string, unknown>>("migration/preview", { method: "POST", body: JSON.stringify({ yaml }) }); setMigration(result); setNotice("הניתוח הושלם ללא שינוי הדשבורד המקורי"); }
    catch (error) { setNotice(`הייבוא נכשל: ${(error as Error).message}`); }
  };

  if (!project) return <section className="studio-loading"><Icon icon="mdi:progress-clock" /><strong>{notice}</strong></section>;
  return <section className={`studio studio-${viewport}`} dir="rtl">
    <header className="studio-topbar"><div className="studio-brand"><span><Icon icon="mdi:view-dashboard-outline" /></span><div><small>HOMEiiOS</small><strong>Studio</strong></div></div><nav>{(["layout","theme","migration"] as const).map((item) => <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item === "layout" ? "מבנה" : item === "theme" ? "עיצוב" : "המרה"}</button>)}</nav><div className="studio-actions"><button onClick={() => save(false)}>שמור טיוטה</button><button className="publish" onClick={() => save(true)}>פרסם</button><button aria-label="סגירה" onClick={onClose}><Icon icon="mdi:close" /></button></div></header>
    <div className="studio-body">
      <aside className="studio-library"><h3>Areas</h3><div className="studio-areas">{Object.values(project.areas).map((item) => <button className={areaId === item.id ? "active" : ""} onClick={() => { setAreaId(item.id); setSelectedId(null); }} key={item.id}><Icon icon="mdi:home-map-marker" /><span><strong>{item.name}</strong><small>{item.widgets.length} Widgets</small></span></button>)}</div><h3>ספריית Widgets</h3><div className="widget-library">{Object.entries(widgetMeta).map(([type, meta]) => <button onClick={() => addWidget(type)} key={type}><Icon icon={meta.icon} /><span>{meta.label}</span><Icon icon="mdi:plus" /></button>)}</div></aside>
      <main className="studio-workspace">
        <div className="viewport-switch">{(["mobile","tablet","desktop"] as const).map((size) => <button className={viewport === size ? "active" : ""} onClick={() => setViewport(size)} key={size}>{size}</button>)}<span>{discovery?.counts.areas || 0} Areas · {discovery?.counts.entities || 0} Entities</span></div>
        {mode === "layout" && <div className="studio-device"><header style={area?.picture ? { backgroundImage: `linear-gradient(#07101a66,#07101acc),url(${area.picture})` } : undefined}><small>{area?.template}</small><h1>{area?.name || "בחר Area"}</h1></header><div className="studio-grid">{widgets.map((widget) => { const meta = widgetMeta[widget.type] || { label: widget.type, icon: "mdi:view-dashboard-outline" }; return <article draggable className={`studio-widget size-${widget.size} ${selectedId === widget.id ? "selected" : ""} ${widget.visible ? "" : "hidden"}`} onDragStart={(event) => event.dataTransfer.setData("text/widget", widget.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => reorder(event.dataTransfer.getData("text/widget"), widget.id)} onClick={() => setSelectedId(widget.id)} key={widget.id}><span><Icon icon={meta.icon} /></span><div><small>{meta.label}</small><strong>{widget.title}</strong><em>{widget.entityIds.length} ישויות</em></div><Icon icon="mdi:drag" /></article>; })}</div></div>}
        {mode === "theme" && <div className="studio-theme"><h2>Design Tokens</h2><p>שינויים גלובליים החלים על Dashboard, Widgets וחלונות קופצים.</p>{[["accent","צבע הדגשה","#75b8ff"],["surface","צבע משטח","#171d27"],["text","צבע טקסט","#f7f8fb"]].map(([key,label,fallback]) => <label key={key}><span>{label}</span><input type="color" value={String(project.theme.tokens[key] || fallback)} onChange={(event) => setProject({ ...project, status:"draft", theme: { ...project.theme, tokens: { ...project.theme.tokens, [key]: event.target.value } } })} /></label>)}</div>}
        {mode === "migration" && <div className="studio-migration"><h2>המרת Lovelace YAML</h2><p>המקור נשאר ללא שינוי. HOMEiiOS מציג Preview ודוח תאימות לפני יצירת Widgets.</p><textarea value={yaml} onChange={(event) => setYaml(event.target.value)} placeholder="הדבק כאן YAML של דשבורד קיים"/><button onClick={previewMigration}>נתח דשבורד</button>{migration && <pre>{JSON.stringify(migration, null, 2)}</pre>}</div>}
      </main>
      <aside className="studio-inspector"><h3>Inspector</h3>{selected ? <><label><span>כותרת</span><input value={selected.title} onChange={(event) => updateWidget(selected.id, { title: event.target.value })}/></label><label><span>גודל</span><select value={selected.size} onChange={(event) => updateWidget(selected.id, { size: event.target.value as WidgetSize })}><option value="compact">Compact</option><option value="regular">Regular</option><option value="expanded">Expanded</option></select></label><label className="studio-check"><input type="checkbox" checked={selected.visible} onChange={(event) => updateWidget(selected.id, { visible: event.target.checked })}/><span>מוצג בדשבורד</span></label><div className="inspector-entities"><strong>ישויות</strong>{selected.entityIds.map((id) => <code key={id}>{hass?.states[id]?.attributes.friendly_name as string || id}</code>)}</div><button className="danger" onClick={() => { mutateArea((current) => ({...current,widgets:current.widgets.filter((widget)=>widget.id!==selected.id).map((widget,order)=>({...widget,order}))}));setSelectedId(null); }}>הסר Widget</button></> : <p>בחר Widget ב־Canvas כדי לערוך אותו.</p>}</aside>
    </div>
    {notice && <footer className="studio-notice"><Icon icon="mdi:information-outline" />{notice}</footer>}
  </section>;
}
