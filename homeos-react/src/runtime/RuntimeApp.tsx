import React, { useEffect, useMemo, useState } from "react";
import type { HomeAssistant } from "../types";
import { RuntimeWidget } from "./RuntimeWidget";

type DiscoveredEntity = {
  entity_id: string;
  domain: string;
  name: string;
  state: string | null;
  available: boolean;
  device_class?: string | null;
};

type DiscoveredArea = {
  area_id: string;
  name: string;
  floor_id?: string | null;
  picture?: string | null;
  domains: string[];
  entities: DiscoveredEntity[];
};

type Discovery = { areas: DiscoveredArea[]; unassigned: DiscoveredEntity[]; domains: Record<string, number> };
type GeneratedWidget = { id: string; widgetType: string; entityIds: string[]; size: string; settings?: Record<string, unknown> };
type GeneratedProject = { id: string; name: string; theme?: { mode: string; preset: string; tokens: Record<string, string | number> }; areas: Record<string, { title: string; widgets: GeneratedWidget[] }> };
type ActiveProject = { revision: number; active_project_id?: string | null; project?: GeneratedProject | null; can_edit: boolean };

const domainLabels: Record<string, string> = {
  light: "תאורה", climate: "אקלים", media_player: "מדיה", camera: "מצלמות",
  cover: "פתחים", fan: "מאווררים", switch: "מתגים", sensor: "חיישנים",
  binary_sensor: "מצבים", lock: "מנעולים", person: "אנשים", weather: "מזג אוויר",
};

export function RuntimeApp({ hass, narrow }: { hass?: HomeAssistant; narrow: boolean }) {
  const [discovery, setDiscovery] = useState<Discovery>();
  const [project, setProject] = useState<GeneratedProject>();
  const [storeRevision, setStoreRevision] = useState(1);
  const [published, setPublished] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!hass?.callWS) return;
    let cancelled = false;
    setLoading(true);
    setError(undefined);
    Promise.all([
      hass.callWS<Discovery>({ type: "homeii/discovery/get" }),
      hass.callWS<ActiveProject>({ type: "homeii/project/active" }),
    ]).then(async ([nextDiscovery, active]) => {
      if (cancelled) return;
      let nextProject = active.project ?? undefined;
      if (!nextProject && hass.user?.is_admin) {
        nextProject = await hass.callWS?.<GeneratedProject>({ type: "homeii/project/preview", project_id: "home", name: "הבית שלי", template: "area-first" });
      }
      setDiscovery(nextDiscovery);
      setProject(nextProject);
      setStoreRevision(active.revision);
      setPublished(Boolean(active.project));
      setSelectedArea((current) => current || nextDiscovery.areas[0]?.area_id);
    }).catch((reason: unknown) => {
      if (!cancelled) setError(reason instanceof Error ? reason.message : String(reason));
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [hass?.callWS, hass?.user?.id, hass?.user?.is_admin]);

  const area = discovery?.areas.find((candidate) => candidate.area_id === selectedArea);
  const generatedArea = selectedArea ? project?.areas[selectedArea] : undefined;
  const liveEntities = useMemo(() => area?.entities.map((entity) => hass?.states[entity.entity_id] ?? entity) ?? [], [area, hass?.states]);
  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  }

  async function publishGeneratedProject() {
    if (!hass?.callWS || !hass.user?.is_admin) return;
    setLoading(true);
    setError(undefined);
    try {
      const result = await hass.callWS<{ revision: number; project: GeneratedProject }>({
        type: "homeii/project/generate",
        project_id: project?.id ?? "home",
        name: project?.name ?? "הבית שלי",
        template: "area-first",
        revision: storeRevision,
      });
      setProject(result.project);
      setStoreRevision(result.revision);
      setPublished(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setLoading(false);
    }
  }

  if (!hass) return <main className="runtime-state"><span className="pulse" />מתחבר ל־Home Assistant…</main>;
  if (loading) return <main className="runtime-state"><span className="pulse" />סורק Areas וישויות…</main>;
  if (error) return <main className="runtime-state runtime-error"><strong>החיבור ל־HOMEii נכשל</strong><code>{error}</code></main>;

  return <main className={`runtime-shell theme-${project?.theme?.preset ?? "granite"} ${narrow ? "is-narrow" : ""}`} dir="rtl" style={{ "--homeii-accent": String(project?.theme?.tokens.accent ?? "#d6a45d") } as React.CSSProperties}>
    <header className="runtime-header">
      <div className="brand-mark" aria-hidden="true">H</div>
      <div><strong>HOMEii</strong><span>Runtime Preview · מחובר ל־HA</span></div>
      <div className="runtime-actions" style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 9 }}>
        {hass.user?.is_admin && !published && <button className="publish-button" style={{ minHeight: 42, paddingInline: 17, border: "1px solid #edc78a7a", borderRadius: 14, background: "linear-gradient(145deg,#d4a25e,#89623a)", color: "#17110b", fontWeight: 700, cursor: "pointer" }} onClick={publishGeneratedProject}>צור ופרסם דשבורד</button>}
        <div className="runtime-health"><i />{published ? "פורסם" : "תצוגה מקדימה"} · {discovery?.areas.length ?? 0} אזורים · {Object.values(discovery?.domains ?? {}).reduce((sum, value) => sum + value, 0)} ישויות</div>
      </div>
    </header>

    <nav className="area-nav" aria-label="חדרים ואזורים">
      {discovery?.areas.map((item) => <button key={item.area_id} className={item.area_id === selectedArea ? "active" : ""} onClick={() => setSelectedArea(item.area_id)}>
        <span>{item.name}</span><small>{item.entities.length} ישויות</small>
      </button>)}
    </nav>

    <section className="runtime-content">
      <article className="area-hero" style={area?.picture ? { backgroundImage: `linear-gradient(90deg, rgba(10,12,16,.86), rgba(10,12,16,.22)), url(${area.picture})` } : undefined}>
        <span>AREA של Home Assistant</span><h1>{area?.name ?? "לא נמצאו Areas"}</h1>
        <div className="domain-chips">{area?.domains.map((domain) => <span key={domain}>{domainLabels[domain] ?? domain}</span>)}</div>
      </article>

      {generatedArea && <section className="product-widgets">
        {generatedArea.widgets.map((widget) => <RuntimeWidget key={widget.id} widget={widget} hass={hass} onFeedback={showFeedback} />)}
      </section>}

      <div className="runtime-grid">
        <section className="preview-card">
          <header><div><span>{published ? "Project פעיל" : "יצירה אוטומטית"}</span><h2>{published ? "Widgets שפורסמו" : "Widgets מוצעים"}</h2></div><b>{generatedArea?.widgets.length ?? 0}</b></header>
          {hass.user?.is_admin ? <div className="widget-list">{generatedArea?.widgets.map((widget) => <div key={widget.id} className="widget-row">
            <i /><div><strong>{widget.widgetType}</strong><small>{widget.entityIds.length} ישויות · {widget.size}</small></div>
          </div>)}</div> : <p>תצוגת המחולל זמינה למנהל בלבד.</p>}
        </section>

        <section className="preview-card">
          <header><div><span>מצב חי</span><h2>ישויות ב־Area</h2></div><b>{liveEntities.length}</b></header>
          <div className="entity-list">{liveEntities.slice(0, 18).map((entity) => {
            const id = "entity_id" in entity ? entity.entity_id : "";
            const fallback = area?.entities.find((candidate) => candidate.entity_id === id);
            return <button key={id} onClick={() => hass.navigate?.(`/config/entities/entity/${id}`)}>
              <div><strong>{fallback?.name ?? id}</strong><small>{id}</small></div><span className={entity.state === "unavailable" ? "unavailable" : ""}>{entity.state}</span>
            </button>;
          })}</div>
        </section>
      </div>
    </section>
    {feedback && <div className="runtime-feedback" role="status">{feedback}</div>}
  </main>;
}
