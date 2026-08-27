import React, { useEffect, useMemo, useState } from "react";

type Widget = { id: string; widgetType: string; entityIds: string[]; size: "compact" | "regular" | "expanded"; settings: Record<string, unknown> };
type Area = { areaId: string; title?: string; titleMode?: "auto" | "custom"; picture?: string; hidden: boolean; categories?: string[]; excludedWidgetIds?: string[]; widgets: Widget[] };
type Project = { id: string; name: string; template?: string; brand: { name: string; tagline?: string; logo?: string }; theme: { mode: string; preset: string; tokens: Record<string, string | number> }; areas: Record<string, Area>; permissions: Record<string, unknown> };
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
const categoryLabels: Record<string, string> = { overview: "סקירה", lighting: "תאורה", climate: "אקלים", media: "מדיה", security: "ביטחון", energy: "אנרגיה", cameras: "מצלמות" };
const presets: Record<string, Record<string, string | number>> = {
  "rich-brown": { accent: "#d6a45d", text: "#f8f5ef", surface: "#1b1918", radius: 24, blur: 26, tileOpacity: .72 },
  "night-blue": { accent: "#75b8ff", text: "#f4f8ff", surface: "#111a29", radius: 24, blur: 28, tileOpacity: .7 },
  granite: { accent: "#aeb9c8", text: "#f6f7f9", surface: "#191b20", radius: 22, blur: 24, tileOpacity: .76 },
  ivory: { accent: "#9d744a", text: "#241d17", surface: "#f3ede3", radius: 24, blur: 22, tileOpacity: .82 },
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

  useEffect(() => {
    const refreshAreaNames = async () => {
      try {
        setDiscovery(await api<Discovery>("discovery"));
      } catch {
        // Keep the last good registry snapshot while HA or Ingress reconnects.
      }
    };
    const timer = window.setInterval(() => { void refreshAreaNames(); }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  async function generate() {
    if (!active) return;
    setSaving(true);
    try {
      const result = await api<{ revision: number; project: Project }>("generate", { method: "POST", body: JSON.stringify({ project_id: project?.id ?? "home", name: project?.name ?? "הבית שלי", template: project?.template ?? "homeii-signature", revision: active.revision }) });
      setActive({ ...active, revision: result.revision, active_project_id: result.project.id, project: result.project });
      setProject(result.project); setSelectedArea(Object.keys(result.project.areas)[0] || ""); setStatus("Project נוצר ופורסם");
    } catch (error) { setStatus(`היצירה נכשלה: ${(error as Error).message}`); } finally { setSaving(false); }
  }

  function updateArea(areaId: string, change: (area: Area) => Area) {
    setProject((current) => current ? { ...current, areas: { ...current.areas, [areaId]: change(current.areas[areaId]) } } : current);
  }

  function updateToken(name: string, value: string | number) {
    setProject((current) => current ? { ...current, theme: { ...current.theme, tokens: { ...current.theme.tokens, [name]: value } } } : current);
  }

  function applyPreset(preset: string) {
    setProject((current) => current ? { ...current, theme: { ...current.theme, preset, tokens: { ...presets[preset], ...Object.fromEntries(Object.entries(current.theme.tokens).filter(([key]) => !["accent", "text", "surface", "radius", "blur", "tileOpacity"].includes(key))) } } } : current);
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
  const areaName = (areaId: string, fallback?: string, mode?: string) => mode === "custom" ? fallback ?? areaId : discovery?.areas.find((item) => item.area_id === areaId)?.name ?? fallback ?? areaId;
  const entityCount = useMemo(() => Object.values(project?.areas ?? {}).reduce((sum, item) => sum + item.widgets.reduce((inner, widget) => inner + widget.entityIds.length, 0), 0), [project]);

  if (!project) return <main className="studio-empty" dir="rtl"><div className="studio-logo">H</div><small>HOMEii CONTROL PLANE</small><h1>ניצור את הדשבורד הראשון שלך</h1><p>{discovery?.areas.length ?? 0} Areas נמצאו ב־Home Assistant. ה־Integration יבחר Widgets מתאימים וישמור Project מסונכרן.</p><button disabled={saving || !active} onClick={generate}>{saving ? "יוצר…" : "צור HOMEii אוטומטית"}</button><span>{status}</span></main>;

  const previewStyle = { "--preview-accent": String(project.theme.tokens.accent ?? "#d6a45d"), "--preview-text": String(project.theme.tokens.text ?? "#f8f5ef"), "--preview-surface": String(project.theme.tokens.surface ?? "#1b1918"), "--preview-radius": `${Number(project.theme.tokens.radius ?? 24)}px`, "--preview-blur": `${Number(project.theme.tokens.blur ?? 26)}px`, "--preview-opacity": String(project.theme.tokens.tileOpacity ?? .72) } as React.CSSProperties;
  return <main className="studio-shell" dir="rtl" style={previewStyle}>
    <header className="studio-topbar"><div className="studio-logo">{project.brand.logo ? <img src={project.brand.logo} alt="" /> : "H"}</div><div><small>HOMEii DESIGN STUDIO</small><strong>{project.name}</strong></div><div className="studio-status"><i />{status}</div><button className="secondary" disabled={saving} onClick={() => void generate()}>רענן תוכן מ־HA</button><button className="secondary" onClick={() => void load()}>סנכרון</button><a href="/homeii">פתח Dashboard</a><button disabled={saving} onClick={save}>{saving ? "שומר…" : "פרסם לכל המכשירים"}</button></header>
    <aside className="studio-sidebar"><h2>Areas · תוכן</h2>{Object.values(project.areas).map((item) => <button className={selectedArea === item.areaId ? "active" : ""} onClick={() => setSelectedArea(item.areaId)} key={item.areaId}><span>{areaName(item.areaId, item.title, item.titleMode)}</span><small>{item.widgets.length} Widgets נבחרו</small></button>)}</aside>
    <section className="studio-canvas">
      <div className="studio-hero" style={area?.picture ? { backgroundImage: `linear-gradient(90deg,#111d,#1113),url(${area.picture})` } : undefined}><small>{project.brand.name} · LIVE PREVIEW</small><h1>{area ? areaName(area.areaId, area.title, area.titleMode) : ""}</h1><p>{project.brand.tagline}</p><div className="studio-categories">{(area?.categories ?? []).map((category) => <span key={category}>{categoryLabels[category] ?? category}</span>)}</div></div>
      <div className="studio-widgets">{area?.widgets.map((widget) => <article key={widget.id}><div className="widget-icon">{widgetLabels[widget.widgetType]?.[0] ?? "H"}</div><div><strong>{widgetLabels[widget.widgetType] ?? widget.widgetType}</strong><small>{widget.entityIds.length} ישויות · {widget.size}</small></div><select value={widget.size} onChange={(event) => updateArea(area.areaId, (current) => ({ ...current, widgets: current.widgets.map((item) => item.id === widget.id ? { ...item, size: event.target.value as Widget["size"] } : item) }))}><option value="compact">קומפקטי</option><option value="regular">רגיל</option><option value="expanded">מורחב</option></select><button onClick={() => updateArea(area.areaId, (current) => ({ ...current, excludedWidgetIds: widget.settings?.generated ? [...new Set([...(current.excludedWidgetIds ?? []), widget.id])] : current.excludedWidgetIds, widgets: current.widgets.filter((item) => item.id !== widget.id) }))}>הסר</button></article>)}</div>
    </section>
    <aside className="studio-inspector"><section><small className="eyebrow">BRAND SYSTEM</small><h2>מיתוג גלובלי</h2><label>שם המותג<input value={project.brand.name} onChange={(event) => setProject({ ...project, brand: { ...project.brand, name: event.target.value } })} /></label><label>שורת מותג<input value={project.brand.tagline ?? ""} onChange={(event) => setProject({ ...project, brand: { ...project.brand, tagline: event.target.value } })} /></label><label>כתובת לוגו<input dir="ltr" value={project.brand.logo ?? ""} onChange={(event) => setProject({ ...project, brand: { ...project.brand, logo: event.target.value } })} /></label></section><section><small className="eyebrow">DESIGN TOKENS</small><h2>ערכת הממשק</h2><label>ערכת בסיס<select value={project.theme.preset} onChange={(event) => applyPreset(event.target.value)}><option value="rich-brown">Rich Brown</option><option value="night-blue">Night Blue</option><option value="granite">Granite</option><option value="ivory">Ivory</option></select></label><div className="color-pair"><label>הדגשה<input type="color" value={String(project.theme.tokens.accent ?? "#d6a45d")} onChange={(event) => updateToken("accent", event.target.value)} /></label><label>טקסט<input type="color" value={String(project.theme.tokens.text ?? "#f8f5ef")} onChange={(event) => updateToken("text", event.target.value)} /></label><label>משטח<input type="color" value={String(project.theme.tokens.surface ?? "#1b1918")} onChange={(event) => updateToken("surface", event.target.value)} /></label></div><label>עיגול פינות · {Number(project.theme.tokens.radius ?? 24)}px<input type="range" min="12" max="38" value={Number(project.theme.tokens.radius ?? 24)} onChange={(event) => updateToken("radius", Number(event.target.value))} /></label><label>טשטוש זכוכית · {Number(project.theme.tokens.blur ?? 26)}px<input type="range" min="0" max="48" value={Number(project.theme.tokens.blur ?? 26)} onChange={(event) => updateToken("blur", Number(event.target.value))} /></label><label>שקיפות אריחים · {Math.round(Number(project.theme.tokens.tileOpacity ?? .72) * 100)}%<input type="range" min="35" max="95" value={Number(project.theme.tokens.tileOpacity ?? .72) * 100} onChange={(event) => updateToken("tileOpacity", Number(event.target.value) / 100)} /></label></section>{area && <section><small className="eyebrow">AREA OVERRIDES</small><h2>החדר הנבחר</h2><label className="toggle-row"><input type="checkbox" checked={area.titleMode === "custom"} onChange={(event) => updateArea(area.areaId, (current) => ({ ...current, titleMode: event.target.checked ? "custom" : "auto", title: event.target.checked ? areaName(current.areaId, current.title) : current.title }))} />שם מותאם במקום שם HA</label>{area.titleMode === "custom" && <label>שם מוצג<input value={area.title ?? ""} onChange={(event) => updateArea(area.areaId, (current) => ({ ...current, title: event.target.value }))} /></label>}<label>תמונת Hero<input dir="ltr" value={area.picture ?? ""} onChange={(event) => updateArea(area.areaId, (current) => ({ ...current, picture: event.target.value }))} /></label><div className="category-picker">{Object.entries(categoryLabels).map(([id, label]) => <button key={id} className={(area.categories ?? []).includes(id) ? "active" : ""} onClick={() => updateArea(area.areaId, (current) => ({ ...current, categories: (current.categories ?? []).includes(id) ? (current.categories ?? []).filter((item) => item !== id) : [...(current.categories ?? []), id] }))}>{label}</button>)}</div></section>}<div className="studio-metrics"><span><b>{Object.keys(project.areas).length}</b> Areas</span><span><b>{entityCount}</b> bindings</span></div></aside>
  </main>;
}
