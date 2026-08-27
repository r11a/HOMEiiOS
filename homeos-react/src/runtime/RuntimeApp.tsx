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
type GeneratedArea = { areaId: string; title: string; titleMode?: "auto" | "custom"; picture?: string; hidden?: boolean; categories?: string[]; widgets: GeneratedWidget[] };
type GeneratedProject = { id: string; name: string; brand?: { name?: string; tagline?: string; logo?: string }; theme?: { mode: string; preset: string; tokens: Record<string, string | number> }; areas: Record<string, GeneratedArea> };
type ActiveProject = { revision: number; active_project_id?: string | null; project?: GeneratedProject | null; can_edit: boolean };

const domainLabels: Record<string, string> = {
  light: "תאורה", climate: "אקלים", media_player: "מדיה", camera: "מצלמות",
  cover: "פתחים", fan: "מאווררים", switch: "מתגים", sensor: "חיישנים",
  binary_sensor: "מצבים", lock: "מנעולים", person: "אנשים", weather: "מזג אוויר",
};
const categoryLabels: Record<string, string> = { overview: "סקירה", lighting: "תאורה", climate: "אקלים", media: "מדיה", security: "ביטחון", energy: "אנרגיה", cameras: "מצלמות" };
const widgetCategory = (type: string) => type.startsWith("light.") || type.startsWith("switch.") || type.startsWith("cover.") ? "lighting" : type.startsWith("climate.") || type === "sensor.temperature" ? "climate" : type.startsWith("media.") ? "media" : type.startsWith("camera.") ? "cameras" : type.startsWith("security.") ? "security" : type === "sensor.power" || type === "sensor.energy" ? "energy" : "overview";

export function RuntimeApp({ hass, narrow }: { hass?: HomeAssistant; narrow: boolean }) {
  const [discovery, setDiscovery] = useState<Discovery>();
  const [project, setProject] = useState<GeneratedProject>();
  const [storeRevision, setStoreRevision] = useState(1);
  const [published, setPublished] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overview");

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

  useEffect(() => {
    if (!hass?.callWS) return;
    const refreshAreas = async () => {
      try {
        const nextDiscovery = await hass.callWS?.<Discovery>({ type: "homeii/discovery/get" });
        if (nextDiscovery) setDiscovery(nextDiscovery);
      } catch {
        // Preserve the current UI during short HA reconnects.
      }
    };
    const timer = window.setInterval(() => { void refreshAreas(); }, 30_000);
    return () => window.clearInterval(timer);
  }, [hass?.callWS]);

  const generatedArea = selectedArea ? project?.areas[selectedArea] : undefined;
  const area = discovery?.areas.find((candidate) => candidate.area_id === selectedArea);
  const selectedEntityIds = useMemo(() => new Set(generatedArea?.widgets.flatMap((widget) => widget.entityIds) ?? []), [generatedArea]);
  const liveEntities = useMemo(() => area?.entities.filter((entity) => selectedEntityIds.has(entity.entity_id)).map((entity) => hass?.states[entity.entity_id] ?? entity) ?? [], [area, selectedEntityIds, hass?.states]);
  const categories = generatedArea?.categories?.length ? generatedArea.categories : ["overview", ...new Set((generatedArea?.widgets ?? []).map((widget) => widgetCategory(widget.widgetType)))];
  const visibleWidgets = generatedArea?.widgets.filter((widget) => selectedCategory === "overview" || widgetCategory(widget.widgetType) === selectedCategory) ?? [];
  const areaTitle = generatedArea?.titleMode === "custom" ? generatedArea.title : area?.name ?? generatedArea?.title;
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
        template: "homeii-signature",
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

  const tokens = project?.theme?.tokens ?? {};
  return <main className={`runtime-shell theme-${project?.theme?.preset ?? "granite"} ${narrow ? "is-narrow" : ""}`} dir="rtl" style={{ "--homeii-accent": String(tokens.accent ?? "#d6a45d"), "--homeii-text": String(tokens.text ?? "#f8f5ef"), "--homeii-surface": String(tokens.surface ?? "#1b1918"), "--homeii-radius": `${Number(tokens.radius ?? 24)}px`, "--homeii-blur": `${Number(tokens.blur ?? 26)}px`, "--homeii-tile-opacity": String(tokens.tileOpacity ?? .72) } as React.CSSProperties}>
    <header className="runtime-header">
      <div className="brand-mark" aria-hidden="true">{project?.brand?.logo ? <img src={project.brand.logo} alt="" /> : "H"}</div>
      <div><strong>{project?.brand?.name ?? "HOMEii"}</strong><span>{project?.brand?.tagline ?? "הבית שלך, ברור ונגיש"}</span></div>
      <div className="runtime-actions" style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 9 }}>
        {hass.user?.is_admin && !published && <button className="publish-button" style={{ minHeight: 42, paddingInline: 17, border: "1px solid #edc78a7a", borderRadius: 14, background: "linear-gradient(145deg,#d4a25e,#89623a)", color: "#17110b", fontWeight: 700, cursor: "pointer" }} onClick={publishGeneratedProject}>צור ופרסם דשבורד</button>}
        <div className="runtime-health"><i />{published ? "פורסם" : "תצוגה מקדימה"} · {discovery?.areas.length ?? 0} אזורים · {Object.values(discovery?.domains ?? {}).reduce((sum, value) => sum + value, 0)} ישויות</div>
      </div>
    </header>

    <nav className="area-nav" aria-label="חדרים ואזורים">
      {Object.values(project?.areas ?? {}).filter((item) => !item.hidden).map((item) => { const liveArea = discovery?.areas.find((candidate) => candidate.area_id === item.areaId); return <button key={item.areaId} className={item.areaId === selectedArea ? "active" : ""} onClick={() => { setSelectedArea(item.areaId); setSelectedCategory("overview"); }}>
        <span>{item.titleMode === "custom" ? item.title : liveArea?.name ?? item.title}</span><small>{item.widgets.length} רכיבים</small>
      </button>; })}
    </nav>

    <section className="runtime-content">
      <article className="area-hero" style={area?.picture ? { backgroundImage: `linear-gradient(90deg, rgba(10,12,16,.86), rgba(10,12,16,.22)), url(${area.picture})` } : undefined}>
        <span>{project?.brand?.name ?? "HOMEii"} · AREA</span><h1>{areaTitle ?? "לא נמצאו Areas"}</h1>
        <div className="hero-status"><b>{liveEntities.filter((entity) => !["off", "idle", "closed", "unavailable", "unknown"].includes(entity.state)).length}</b><span>פעילים עכשיו</span><i/><b>{liveEntities.length}</b><span>רכיבים נבחרים</span></div>
      </article>

      <nav className="category-nav" aria-label="קטגוריות בחדר">{categories.map((category) => <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>{categoryLabels[category] ?? category}</button>)}</nav>

      {generatedArea && <section className="product-widgets">
        {visibleWidgets.map((widget) => <RuntimeWidget key={widget.id} widget={widget} hass={hass} onFeedback={showFeedback} />)}
        {!visibleWidgets.length && <div className="runtime-empty"><strong>הקטגוריה עדיין ריקה</strong><span>מנהל יכול להוסיף אליה Widgets דרך HOMEii Studio.</span></div>}
      </section>}
    </section>
    {feedback && <div className="runtime-feedback" role="status">{feedback}</div>}
  </main>;
}
