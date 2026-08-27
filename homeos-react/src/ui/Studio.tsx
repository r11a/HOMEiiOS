import React, { useEffect, useMemo, useState } from "react";
import type { HomeAssistant } from "../types";

const Icon = ({ icon }: { icon: string }) => React.createElement("ha-icon", { icon });
type WidgetSize = "compact" | "regular" | "expanded";
type StudioWidget = { id: string; type: string; title: string; entityIds: string[]; size: WidgetSize; order: number; visible: boolean; settings: Record<string, unknown> };
type StudioArea = { id: string; name: string; picture?: string | null; template: string; widgets: StudioWidget[] };
type StudioProject = { schemaVersion: 2; revision: number; id: string; name: string; status: "draft" | "published"; updatedAt: string; theme: { preset: string; tokens: Record<string, string | number> }; breakpoints: Record<string, number>; areas: Record<string, StudioArea>; permissions: { defaultRole: string; users: Record<string, unknown> } };
type ProjectSummary = { id: string; name: string; status: string; updatedAt: string; areas: number; template: string; archived: boolean };
type ProjectRegistry = { revision: number; activeProjectId: string | null; projects: ProjectSummary[] };
type DiscoveredEntity = { entity_id: string; domain: string; name: string; device_class?: string; state?: string; supported_features?: number };
type Discovery = { areas: Array<{ id: string; name: string; picture?: string; domains: Record<string, string[]>; entities: DiscoveredEntity[] }>; counts: { areas: number; devices: number; entities: number } };

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
const templates = {
  balanced: { label: "מאוזן", icon: "mdi:view-dashboard-variant-outline", domains: ["light","climate","media_player","camera","lock","sensor"] },
  comfort: { label: "נוחות", icon: "mdi:sofa-outline", domains: ["climate","light","cover","sensor","media_player"] },
  media: { label: "קולנוע", icon: "mdi:movie-open-outline", domains: ["media_player","light","climate","sensor"] },
  security: { label: "ביטחון", icon: "mdi:shield-home-outline", domains: ["camera","lock","sensor","light"] }
} as const;

function ProjectManager({ registry, onOpen, onCreate, onDuplicate, onClose }: { registry: ProjectRegistry; onOpen: (id: string) => void; onCreate: () => void; onDuplicate: (id: string) => void; onClose: () => void }) {
  const projects = registry.projects.filter((project) => !project.archived);
  return <section className="project-manager" dir="rtl"><header><div className="studio-brand"><span><Icon icon="mdi:view-dashboard-outline"/></span><div><small>HOMEiiOS Studio</small><strong>הדשבורדים שלי</strong></div></div><button onClick={onClose} aria-label="סגירה"><Icon icon="mdi:close"/></button></header><div className="project-manager-intro"><div><small>PROJECT MANAGER</small><h1>ממשק מתאים לכל מסך ולכל משתמש</h1><p>צור מספר דשבורדים, פרסם אותם בנפרד וחזור לערוך בכל זמן.</p></div><button className="new-project" onClick={onCreate}><Icon icon="mdi:plus"/><span><strong>דשבורד חדש</strong><small>פתיחת אשף ההקמה</small></span></button></div><div className="project-list">{projects.map((project)=><article key={project.id}><span className="project-icon"><Icon icon="mdi:view-dashboard-variant-outline"/></span><div><small>{project.status === "published" ? "מפורסם" : "טיוטה"} · {project.areas} חדרים</small><h2>{project.name}</h2><code>{project.id}</code></div><nav><button onClick={()=>onDuplicate(project.id)} aria-label="שכפול"><Icon icon="mdi:content-copy"/></button><button className="open" onClick={()=>onOpen(project.id)}>פתיחה <Icon icon="mdi:arrow-left"/></button></nav></article>)}{!projects.length&&<div className="project-empty"><Icon icon="mdi:view-dashboard-outline"/><strong>עדיין אין דשבורדים</strong><button onClick={onCreate}>יצירת הדשבורד הראשון</button></div>}</div></section>;
}

function SetupWizard({ discovery, onCancel, onComplete }: { discovery: Discovery; onCancel: () => void; onComplete: (project: StudioProject) => void }) {
  const [step,setStep]=useState(0); const [name,setName]=useState("הבית שלי"); const [template,setTemplate]=useState<keyof typeof templates>("balanced"); const [source,setSource]=useState<"areas"|"yaml"|"hybrid">("areas"); const [selectedAreas,setSelectedAreas]=useState<string[]>(discovery.areas.map((area)=>area.id)); const [theme,setTheme]=useState("granite"); const [accent,setAccent]=useState("#75b8ff"); const [background,setBackground]=useState("mineral-glass"); const [heroImages,setHeroImages]=useState<Record<string,string>>({}); const [categories,setCategories]=useState(["camera","alarm_control_panel","energy"]); const [shortcuts,setShortcuts]=useState([{name:"",url:""}]); const [yaml,setYaml]=useState(""); const [busy,setBusy]=useState(false);
  const steps=["זהות","סגנון","מקור","חדרים","תמונות","קטגוריות","סיכום"];
  const finish=async()=>{setBusy(true);try{let project=await api<StudioProject>("projects",{method:"POST",body:JSON.stringify({name,template})});const areas=Object.fromEntries(Object.entries(project.areas).filter(([id])=>selectedAreas.includes(id)).map(([id,area])=>[id,{...area,template,picture:heroImages[id]||area.picture}]));project={...project,areas,theme:{preset:theme,tokens:{accent,background}},permissions:{...project.permissions},setup:{source,background,categories,shortcuts:shortcuts.filter(item=>item.name&&item.url),yaml:source==="areas"?"":yaml},setupComplete:true} as StudioProject;project=await api<StudioProject>(`projects/${project.id}`,{method:"PUT",body:JSON.stringify(project)});onComplete(project)}finally{setBusy(false)}};
  return <section className="setup-wizard" dir="rtl"><header><button onClick={onCancel}><Icon icon="mdi:close"/></button><div><small>HOMEiiOS SETUP</small><strong>יצירת Dashboard</strong></div><span>{step+1} / {steps.length}</span></header><nav className="wizard-progress">{steps.map((label,index)=><span className={index===step?"active":index<step?"done":""} key={label}><i>{index<step?<Icon icon="mdi:check"/>:index+1}</i><b>{label}</b></span>)}</nav><main>
    {step===0&&<section><small>נתחיל מהבסיס</small><h1>איך נקרא לדשבורד?</h1><p>אפשר ליצור בהמשך דשבורדים נוספים לטאבלט, לטלפון או למשתמשים שונים.</p><label className="wizard-name"><span>שם הדשבורד</span><input autoFocus value={name} onChange={(event)=>setName(event.target.value)}/></label></section>}
    {step===1&&<section><small>שפה עיצובית</small><h1>בחר תבנית וערכת צבעים</h1><div className="wizard-template-grid">{Object.entries(templates).map(([id,item])=><button className={template===id?"active":""} onClick={()=>setTemplate(id as keyof typeof templates)} key={id}><Icon icon={item.icon}/><strong>{item.label}</strong><small>{item.domains.length} סוגי Widgets</small></button>)}</div><div className="wizard-theme-row">{["granite","night-blue","rich-brown","ivory"].map(id=><button className={theme===id?"active":""} onClick={()=>setTheme(id)} key={id}><i className={`swatch-${id}`}/>{id}</button>)}<label><span>הדגשה</span><input type="color" value={accent} onChange={(event)=>setAccent(event.target.value)}/></label></div></section>}
    {step===2&&<section><small>מקור התוכן</small><h1>איך נבנה את הממשק?</h1><div className="wizard-source">{[["areas","בנייה אוטומטית לפי Areas","HOMEiiOS יסרוק חדרים וישויות"],["yaml","ייבוא Lovelace YAML","המרת דשבורד קיים"],["hybrid","שילוב Areas ו־YAML","בנייה אוטומטית עם תוכן קיים"]].map(([id,title,desc])=><button className={source===id?"active":""} onClick={()=>setSource(id as typeof source)} key={id}><Icon icon={id==="areas"?"mdi:home-map-marker":id==="yaml"?"mdi:code-json":"mdi:merge"}/><span><strong>{title}</strong><small>{desc}</small></span></button>)}</div>{source!=="areas"&&<textarea value={yaml} onChange={(event)=>setYaml(event.target.value)} placeholder="הדבק Lovelace YAML כאן"/>}</section>}
    {step===3&&<section><small>Areas של Home Assistant</small><h1>בחר את החדרים שיופיעו</h1><div className="wizard-areas">{discovery.areas.map(area=><label className={selectedAreas.includes(area.id)?"active":""} key={area.id}><input type="checkbox" checked={selectedAreas.includes(area.id)} onChange={()=>setSelectedAreas(current=>current.includes(area.id)?current.filter(id=>id!==area.id):[...current,area.id])}/><Icon icon="mdi:floor-plan"/><span><strong>{area.name}</strong><small>{area.entities.length} ישויות · {Object.keys(area.domains).length} דומיינים</small></span></label>)}</div></section>}
    {step===4&&<section><small>Hero ורקע</small><h1>בחר את מעטפת הממשק</h1><p>בחר רקע מערכת והדבק כתובת תמונת Hero לכל חדר. ניתן להחליף ולהעלות תמונות גם לאחר היצירה.</p><div className="wizard-backgrounds">{["mineral-glass","dark-silk","sage-bronze","calm-stone"].map(id=><button className={background===id?"active":""} onClick={()=>setBackground(id)} key={id}><i className={`background-${id}`}/><strong>{id}</strong></button>)}</div><div className="wizard-hero-images">{discovery.areas.filter(area=>selectedAreas.includes(area.id)).map(area=><label key={area.id}><span>{area.name}</span><input value={heroImages[area.id]||""} onChange={(event)=>setHeroImages(current=>({...current,[area.id]:event.target.value}))} placeholder="/local/homeii/room.jpg או https://…"/></label>)}</div></section>}
    {step===5&&<section><small>מעבר לחדרים</small><h1>בחר קטגוריות מערכת</h1><div className="wizard-categories">{[["camera","מצלמות","mdi:cctv"],["alarm_control_panel","אזעקה","mdi:shield-home"],["intercom","אינטרקום","mdi:doorbell-video"],["energy","אנרגיה","mdi:lightning-bolt"],["music","מוזיקה","mdi:music"],["shortcuts","קיצורים","mdi:link-variant"]].map(([id,label,icon])=><label className={categories.includes(id)?"active":""} key={id}><input type="checkbox" checked={categories.includes(id)} onChange={()=>setCategories(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id])}/><Icon icon={icon}/><strong>{label}</strong></label>)}</div>{categories.includes("shortcuts")&&<div className="wizard-shortcuts"><strong>קיצורים לדשבורדים, Ingress וקישורים</strong>{shortcuts.map((shortcut,index)=><div key={index}><input value={shortcut.name} onChange={(event)=>setShortcuts(current=>current.map((item,i)=>i===index?{...item,name:event.target.value}:item))} placeholder="שם הקיצור"/><input dir="ltr" value={shortcut.url} onChange={(event)=>setShortcuts(current=>current.map((item,i)=>i===index?{...item,url:event.target.value}:item))} placeholder="/dashboard-path או /api/hassio_ingress/…"/></div>)}<button onClick={()=>setShortcuts(current=>[...current,{name:"",url:""}])}><Icon icon="mdi:plus"/> הוסף קיצור</button></div>}</section>}
    {step===6&&<section><small>מוכן ליצירה</small><h1>{name}</h1><div className="wizard-summary"><span><b>{selectedAreas.length}</b> חדרים</span><span><b>{categories.length}</b> קטגוריות</span><span><b>{templates[template].label}</b> תבנית</span><span><b>{theme}</b> ערכה</span></div><p>הפרויקט ייווצר כטיוטה. שום דבר לא יוצג למשתמשים עד שתלחץ פרסום ב־Studio.</p></section>}
  </main><footer><button disabled={step===0||busy} onClick={()=>setStep(value=>value-1)}>חזרה</button><button className="next" disabled={!name.trim()||!selectedAreas.length||busy} onClick={()=>step===steps.length-1?finish():setStep(value=>value+1)}>{busy?"יוצר פרויקט…":step===steps.length-1?"צור ופתח ב־Studio":"המשך"}<Icon icon="mdi:arrow-left"/></button></footer></section>;
}

export function Studio({ hass, onClose }: { hass?: HomeAssistant; onClose: () => void }) {
  const [screen,setScreen]=useState<"manager"|"wizard"|"editor">("manager");
  const [registry,setRegistry]=useState<ProjectRegistry|null>(null);
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
    Promise.all([api<ProjectRegistry>("projects"), api<Discovery>("discovery")]).then(([nextRegistry, nextDiscovery]) => {
      setRegistry(nextRegistry); setDiscovery(nextDiscovery); setNotice("");
    }).catch((error) => setNotice(`טעינת Studio נכשלה: ${error.message}`));
  }, []);
  const openProject=async(id:string)=>{setNotice("טוען פרויקט…");try{const next=await api<StudioProject>(`projects/${id}`);setProject(next);setAreaId(Object.keys(next.areas)[0]||"");setScreen("editor");setNotice("")}catch(error){setNotice(`טעינת הפרויקט נכשלה: ${(error as Error).message}`)}};
  const duplicateProject=async(id:string)=>{const next=await api<StudioProject>(`projects/${id}/duplicate`,{method:"POST"});const list=await api<ProjectRegistry>("projects");setRegistry(list);await openProject(next.id)};

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
  const applyTemplate = (templateId: keyof typeof templates) => mutateArea((current) => {
    const discovered = discovery?.areas.find((item) => item.id === areaId);
    const existing = new Map(current.widgets.map((widget) => [widget.type, widget]));
    const widgets = templates[templateId].domains.flatMap((type) => {
      const ids = discovered?.domains[type] || [];
      if (!ids.length) return [];
      const previous = existing.get(type);
      return [{ id: previous?.id || `${areaId}-${type}`, type, title: previous?.title || widgetMeta[type]?.label || type, entityIds: previous?.entityIds?.length ? previous.entityIds : ids, size: previous?.size || (type === "climate" || type === "media_player" ? "expanded" : "regular"), order: 0, visible: previous?.visible ?? true, settings: previous?.settings || {} } as StudioWidget];
    }).map((widget, order) => ({ ...widget, order }));
    return { ...current, template: templateId, widgets };
  });
  const toggleEntity = (widget: StudioWidget, entityId: string) => updateWidget(widget.id, { entityIds: widget.entityIds.includes(entityId) ? widget.entityIds.filter((id) => id !== entityId) : [...widget.entityIds, entityId] });
  const save = async (publish = false) => {
    if (!project) return;
    setNotice(publish ? "מפרסם לכל המכשירים…" : "שומר טיוטה…");
    try { const saved = await api<StudioProject>(`projects/${project.id}`, { method: "PUT", body: JSON.stringify({ ...project, status: publish ? "published" : "draft" }) }); setProject(saved); setNotice(publish ? "הגרסה פורסמה לכל המכשירים" : "הטיוטה נשמרה"); if (publish) window.dispatchEvent(new CustomEvent("homeii-project-published", { detail: saved })); }
    catch (error) { setNotice(`השמירה נכשלה: ${(error as Error).message}`); }
  };
  const previewMigration = async () => {
    setNotice("מנתח Lovelace YAML…");
    try { const result = await api<Record<string, unknown>>("migration/preview", { method: "POST", body: JSON.stringify({ yaml }) }); setMigration(result); setNotice("הניתוח הושלם ללא שינוי הדשבורד המקורי"); }
    catch (error) { setNotice(`הייבוא נכשל: ${(error as Error).message}`); }
  };

  if (!registry||!discovery) return <section className="studio-loading"><Icon icon="mdi:progress-clock" /><strong>{notice}</strong></section>;
  if(screen==="manager")return <ProjectManager registry={registry} onClose={onClose} onCreate={()=>setScreen("wizard")} onOpen={openProject} onDuplicate={duplicateProject}/>;
  if(screen==="wizard")return <SetupWizard discovery={discovery} onCancel={()=>setScreen("manager")} onComplete={async(next)=>{setProject(next);setAreaId(Object.keys(next.areas)[0]||"");setRegistry(await api<ProjectRegistry>("projects"));setScreen("editor")}}/>;
  if (!project) return <section className="studio-loading"><Icon icon="mdi:progress-clock" /><strong>{notice}</strong></section>;
  return <section className={`studio studio-${viewport}`} dir="rtl">
    <header className="studio-topbar"><div className="studio-brand"><span><Icon icon="mdi:view-dashboard-outline" /></span><div><small>{project.name}</small><strong>Studio</strong></div></div><nav>{(["layout","theme","migration"] as const).map((item) => <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item === "layout" ? "מבנה" : item === "theme" ? "עיצוב" : "המרה"}</button>)}</nav><div className="studio-actions"><button onClick={() => setScreen("manager")}><Icon icon="mdi:view-dashboard"/> פרויקטים</button><button onClick={() => save(false)}>שמור טיוטה</button><button className="publish" onClick={() => save(true)}>פרסם</button><button aria-label="סגירה" onClick={onClose}><Icon icon="mdi:close" /></button></div></header>
    <div className="studio-body">
      <aside className="studio-library"><h3>Areas</h3><div className="studio-areas">{Object.values(project.areas).map((item) => <button className={areaId === item.id ? "active" : ""} onClick={() => { setAreaId(item.id); setSelectedId(null); }} key={item.id}><Icon icon="mdi:home-map-marker" /><span><strong>{item.name}</strong><small>{item.widgets.length} Widgets</small></span></button>)}</div><h3>תבנית חדר</h3><div className="template-library">{Object.entries(templates).map(([id, template]) => <button className={area?.template === id ? "active" : ""} onClick={() => applyTemplate(id as keyof typeof templates)} key={id}><Icon icon={template.icon}/><span>{template.label}</span></button>)}</div><h3>ספריית Widgets</h3><div className="widget-library">{Object.entries(widgetMeta).map(([type, meta]) => <button onClick={() => addWidget(type)} key={type}><Icon icon={meta.icon} /><span>{meta.label}</span><Icon icon="mdi:plus" /></button>)}</div></aside>
      <main className="studio-workspace">
        <div className="viewport-switch">{(["mobile","tablet","desktop"] as const).map((size) => <button className={viewport === size ? "active" : ""} onClick={() => setViewport(size)} key={size}>{size}</button>)}<span>{discovery?.counts.areas || 0} Areas · {discovery?.counts.entities || 0} Entities</span></div>
        {mode === "layout" && <div className="studio-device"><header style={area?.picture ? { backgroundImage: `linear-gradient(#07101a66,#07101acc),url(${area.picture})` } : undefined}><small>{area?.template}</small><h1>{area?.name || "בחר Area"}</h1></header><div className="studio-grid">{widgets.map((widget) => { const meta = widgetMeta[widget.type] || { label: widget.type, icon: "mdi:view-dashboard-outline" }; const states=widget.entityIds.map((id)=>hass?.states[id]).filter(Boolean); const active=states.filter((state)=>!["off","idle","standby","unavailable","unknown"].includes(state!.state)).length; return <article draggable className={`studio-widget size-${widget.size} domain-${widget.type} ${active ? "live" : ""} ${selectedId === widget.id ? "selected" : ""} ${widget.visible ? "" : "hidden"}`} onDragStart={(event) => event.dataTransfer.setData("text/widget", widget.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => reorder(event.dataTransfer.getData("text/widget"), widget.id)} onClick={() => setSelectedId(widget.id)} key={widget.id}><span><Icon icon={meta.icon} /></span><div><small>{meta.label}</small><strong>{widget.title}</strong><em>{widget.entityIds.length} ישויות · {active} פעילות</em></div><Icon icon="mdi:drag" /></article>; })}</div></div>}
        {mode === "theme" && <div className="studio-theme"><h2>Design Tokens</h2><p>שינויים גלובליים החלים על Dashboard, Widgets וחלונות קופצים.</p>{[["accent","צבע הדגשה","#75b8ff"],["surface","צבע משטח","#171d27"],["text","צבע טקסט","#f7f8fb"]].map(([key,label,fallback]) => <label key={key}><span>{label}</span><input type="color" value={String(project.theme.tokens[key] || fallback)} onChange={(event) => setProject({ ...project, status:"draft", theme: { ...project.theme, tokens: { ...project.theme.tokens, [key]: event.target.value } } })} /></label>)}</div>}
        {mode === "migration" && <div className="studio-migration"><h2>המרת Lovelace YAML</h2><p>המקור נשאר ללא שינוי. HOMEiiOS מציג Preview ודוח תאימות לפני יצירת Widgets.</p><textarea value={yaml} onChange={(event) => setYaml(event.target.value)} placeholder="הדבק כאן YAML של דשבורד קיים"/><button onClick={previewMigration}>נתח דשבורד</button>{migration && <pre>{JSON.stringify(migration, null, 2)}</pre>}</div>}
      </main>
      <aside className="studio-inspector"><h3>Inspector</h3>{selected ? <><label><span>כותרת</span><input value={selected.title} onChange={(event) => updateWidget(selected.id, { title: event.target.value })}/></label><label><span>גודל</span><select value={selected.size} onChange={(event) => updateWidget(selected.id, { size: event.target.value as WidgetSize })}><option value="compact">Compact</option><option value="regular">Regular</option><option value="expanded">Expanded</option></select></label><label className="studio-check"><input type="checkbox" checked={selected.visible} onChange={(event) => updateWidget(selected.id, { visible: event.target.checked })}/><span>מוצג בדשבורד</span></label>{selected.type === "ha-card" && <label><span>הגדרת כרטיס HA ‏(JSON)</span><textarea className="ha-card-config" value={JSON.stringify(selected.settings.card || {},null,2)} onChange={(event)=>{try{updateWidget(selected.id,{settings:{...selected.settings,card:JSON.parse(event.target.value)}})}catch{}}}/><small>הרינדור המלא יופעל ב־HA Panel Runtime.</small></label>}<div className="inspector-entities"><strong>ישויות ב־Area</strong>{(discovery?.areas.find((item)=>item.id===areaId)?.entities || []).filter((item)=>selected.type==="ha-card" || item.domain===selected.type).map((item)=><label className="entity-choice" key={item.entity_id}><input type="checkbox" checked={selected.entityIds.includes(item.entity_id)} onChange={()=>toggleEntity(selected,item.entity_id)}/><span><b>{item.name}</b><small>{item.entity_id} · {hass?.states[item.entity_id]?.state || item.state || "—"}</small></span></label>)}</div><button className="danger" onClick={() => { mutateArea((current) => ({...current,widgets:current.widgets.filter((widget)=>widget.id!==selected.id).map((widget,order)=>({...widget,order}))}));setSelectedId(null); }}>הסר Widget</button></> : <p>בחר Widget ב־Canvas כדי לערוך אותו.</p>}</aside>
    </div>
    {notice && <footer className="studio-notice"><Icon icon="mdi:information-outline" />{notice}</footer>}
  </section>;
}

