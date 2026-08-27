import React, { useEffect, useRef, useState } from "react";
import type { HomeAssistant } from "../types";

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{ createCardElement(config: Record<string, unknown>): HTMLElement & { hass?: HomeAssistant } }>;
  }
}

export function HACardHost({ hass, config }: { hass: HomeAssistant; config: Record<string, unknown> }) {
  const host = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let card: (HTMLElement & { hass?: HomeAssistant }) | undefined;
    let cancelled = false;
    async function mount() {
      try {
        if (!window.loadCardHelpers) throw new Error("HA card helpers are unavailable");
        const helpers = await window.loadCardHelpers();
        if (cancelled || !host.current) return;
        card = helpers.createCardElement(config);
        card.hass = hass;
        host.current.replaceChildren(card);
      } catch (reason) { if (!cancelled) setError(reason instanceof Error ? reason.message : String(reason)); }
    }
    void mount();
    return () => { cancelled = true; card?.remove(); };
  }, [config]);
  useEffect(() => { const card=host.current?.firstElementChild as (HTMLElement & { hass?:HomeAssistant })|null; if(card) card.hass=hass; }, [hass]);
  return <article className="runtime-widget ha-card-widget">{error ? <div><strong>כרטיס HA לא נטען</strong><small>{error}</small></div> : <div ref={host}/>}</article>;
}
