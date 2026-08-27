import React, { useEffect, useMemo, useState } from "react";

type Widget = { id: string; widgetType: string; entityIds: string[]; size: "compact" | "regular" | "expanded"; settings: Record<string, unknown> };
type Area = { areaId: string; title?: string; picture?: string; hidden: boolean; widgets: Widget[] };
type Project = { id: string; name: string; brand: { name: string; logo?: string }; theme: { mode: string; preset: string; tokens: Record<string, string | number> }; areas: Record<string, Area>; permissions: Record<string, unknown> };
type ActiveResponse = { revision: number; active_project_id?: string | null; project?: Project | null; can_edit: boolean };
type Discovery = { areas: Array<{ area_id: string; name: string; entities: unknown[]; domains: string[] }> };

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`./api/platform/${path}`, { cache: "no-store", headers: { "Content-Type": "application/json" }, ...options });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response.json() as Promise<T>;
}

const widgetLabels: Record<string, string> = {
  "light.collection": "תאורה", "climate.thermostat": "תרמוסטט", "media.player": "מדיה",
  "camera.viewer": "מצלמה", "sensor.temperature": "טמפרטורה", "sensor.humidity": "לחות",
  "entity.generic": "ישות כללית", "switch.collection": "מתגים", "security.lock": "מנעולים",
};

export function StudioApp() {
  const [active, setActive] = useState<ActiveResponse>();
  const [discovery, setDiscovery] = useState<Discovery>();
  const [project, setProject] = useState<Project>();
  const [selectedArea, setSelectedArea] = useState("");
  const [status, setStatus] = useState("טוען את HOMEii…");
  const [saving, setSaving] = useState(false);

  async function load() {
    setStatus("מסנכרן עם Home Assistant…");
    try {
      const [nextActive, nextDiscovery] = await Promise.all([api<ActiveResponse>("active"), api<Discovery>("discovery")]);
      setActive(nextActive); setDiscovery(nextDiscovery); setProject(nextActive.project ?? undefined);
      setSelectedArea((current) => current || Object.keys(nextActive.project?.areas ?? {})[0] || "");
      setStatus(nextActive.project ? "מסונכרן · Project פעיל" : "מוכן ליצירת Project ראשון");
    } catch (error) { setStatus(`שגיאת חיבור: ${(error as Error).message}`); }
  }
  useEffect(() => { void load(); }, []);

  async function generate() {
    if (!active) return;
    setSaving(true);
    try {
      const result = await api<{ revision: number; project: Project }>("generate", { method: "POST", body: JSON.stringify({ project_id: "home", name: "הבית שלי", template: "area-first", revision: active.revision }) });
      setActive({ ...active, revision: result.revision, active_project_id: result.project.id, project: result.project });
      setProject(result.project); setSelectedArea(Object.keys(result.project.areas)[0] || ""); setStatus("Project נוצר ופורסם");
    } catch (error) { setStatus(`היצירה נכשלה: ${(error as Error).message}`); } finally { setSaving(false); }
  }

  function updateArea(areaId: string, change: (area: Area) => Area) {
    setProject((current) => current ? { ...current, areas: { ...current.areas, [areaId]: change(current.areas[areaId]) } } : current);
  }

  async function save() {
    if (!project || !active) return;
    setSaving(true);
    try {
      const result = await api<{ revision: number }>("config", { method: "PATCH", body: JSON.stringify({ path: ["projects", project.id], value: project, revision: active.revision }) });
      setActive({ ...active, revision: result.revision, project }); setStatus("השינויים פורסמו לכל המכשירים");
    } catch (error) { setStatus(`השמירה נכשלה: ${(error as Error).message}`); } finally { setSaving(false); }
  }

  const area = project?.areas[selectedArea];
  const entityCount = useMemo(() => Object.values(project?.areas ?? {}).reduce((sum, item) => sum + item.widgets.reduce((inner, widget) => inner + widget.entityIds.length, 0), 0), [project]);

  if (!project) return <main className="studio-empty" dir="rtl"><div className="studio-logo">H</div><small>HOMEii CONTROL PLANE</small><h1>ניצור את הדשבורד הראשון שלך</h1><p>{discovery?.areas.length ?? 0} Areas נמצאו ב־Home Assistant. ה־Integration יבחר Widgets מתאימים וישמור Project מסונכרן.</p><button disabled={saving || !active} onClick={generate}>{saving ? "יוצר…" : "צור HOMEii אוטומטית"}</button><span>{status}</span></main>;

  return <main className="studio-shell" dir="rtl">
    <header className="studio-topbar"><div className="studio-logo">H</div><div><small>HOMEii STUDIO</small><strong>{project.name}</strong></div><div className="studio-status"><i />{status}</div><a href="/homeii">פתח Dashboard</a><button disabled={saving} onClick={save}>{saving ? "שומר…" : "פרסם שינויים"}</button></header>
    <aside className="studio-sidebar"><h2>Areas</h2>{Object.values(project.areas).map((item) => <button className={selectedArea === item.areaId ? "active" : ""} onClick={() => setSelectedArea(item.areaId)} key={item.areaId}><span>{item.title}</span><small>{item.widgets.length} Widgets</small></button>)}</aside>
    <section className="studio-canvas">
      <div className="studio-hero" style={area?.picture ? { backgroundImage: `linear-gradient(90deg,#111d,#1113),url(${area.picture})` } : undefined}><small>AREA PREVIEW</small><h1>{area?.title}</h1><span>{area?.widgets.reduce((sum, widget) => sum + widget.entityIds.length, 0)} ישויות מחוברות</span></div>
      <div className="studio-widgets">{area?.widgets.map((widget) => <article key={widget.id}><div className="widget-icon">{widgetLabels[widget.widgetType]?.[0] ?? "H"}</div><div><strong>{widgetLabels[widget.widgetType] ?? widget.widgetType}</strong><small>{widget.entityIds.length} ישויות · {widget.size}</small></div><select value={widget.size} onChange={(event) => updateArea(area.areaId, (current) => ({ ...current, widgets: current.widgets.map((item) => item.id === widget.id ? { ...item, size: event.target.value as Widget["size"] } : item) }))}><option value="compact">קומפקטי</option><option value="regular">רגיל</option><option value="expanded">מורחב</option></select><button onClick={() => updateArea(area.areaId, (current) => ({ ...current, widgets: current.widgets.filter((item) => item.id !== widget.id) }))}>הסר</button></article>)}</div>
    </section>
    <aside className="studio-inspector"><h2>עיצוב גלובלי</h2><label>שם הדשבורד<input value={project.name} onChange={(event) => setProject({ ...project, name: event.target.value })} /></label><label>ערכת בסיס<select value={project.theme.preset} onChange={(event) => setProject({ ...project, theme: { ...project.theme, preset: event.target.value } })}><option value="granite">Granite</option><option value="night-blue">Night Blue</option><option value="rich-brown">Rich Brown</option><option value="ivory">Ivory</option></select></label><label>צבע הדגשה<input type="color" value={String(project.theme.tokens.accent ?? "#d6a45d")} onChange={(event) => setProject({ ...project, theme: { ...project.theme, tokens: { ...project.theme.tokens, accent: event.target.value } } })} /></label><label>תמונת Hero<input dir="ltr" value={area?.picture ?? ""} onChange={(event) => area && updateArea(area.areaId, (current) => ({ ...current, picture: event.target.value }))} /></label><div className="studio-metrics"><span><b>{Object.keys(project.areas).length}</b> Areas</span><span><b>{entityCount}</b> bindings</span></div></aside>
  </main>;
}
