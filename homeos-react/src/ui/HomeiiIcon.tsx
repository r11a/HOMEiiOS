import React from "react";

export type HomeiiIconName = "home" | "living" | "dining" | "bedroom" | "office" | "bath" | "outdoor" | "light" | "climate" | "media" | "people" | "settings" | "more" | "cinema" | "away";

export function HomeiiIcon({ name, className = "" }: { name: HomeiiIconName; className?: string }) {
  const art: Record<HomeiiIconName, React.ReactNode> = {
    home: <><path d="m4 11 8-6.5 8 6.5"/><path d="M6.5 10v9h11v-9M10 19v-5h4v5"/></>,
    living: <><path d="M5 12V9.5a2.5 2.5 0 0 1 5 0V12h4V9.5a2.5 2.5 0 0 1 5 0V12"/><path d="M4 12h16v6H4zM6 18v2M18 18v2"/></>,
    dining: <><path d="M7 4v7M4.5 4v4.5A2.5 2.5 0 0 0 7 11v9M9.5 4v4.5A2.5 2.5 0 0 1 7 11"/><path d="M16 4v16M16 4c3 1.5 4 5 0 8"/></>,
    bedroom: <><path d="M4 12h16v6H4zM5 12V7h6a3 3 0 0 1 3 3v2M4 18v2M20 18v2"/><path d="M7 9h3"/></>,
    office: <><rect x="5" y="5" width="14" height="9" rx="2"/><path d="M12 14v3M8 19h8M8 17h8"/></>,
    bath: <><path d="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM7 19v1M17 19v1"/><path d="M7 11V6a2 2 0 0 1 4 0"/></>,
    outdoor: <><path d="M12 4v16M5 9c2-4 5-4 7 0M19 9c-2-4-5-4-7 0M6 14c2-3 4-3 6 0M18 14c-2-3-4-3-6 0"/></>,
    light: <><path d="M8 14a6 6 0 1 1 8 0c-1.2.9-1.5 1.7-1.5 2.5h-5C9.5 15.7 9.2 15 8 14Z"/><path d="M9.5 19h5M10.5 21h3"/></>,
    climate: <><path d="M7 9h10M9 6h6"/><path className="hi-motion" d="M6 14c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"/></>,
    media: <><rect x="4" y="6" width="16" height="12" rx="3"/><path d="m10 10 5 2-5 2v-4Z"/></>,
    people: <><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3.5 19c.5-4 10.5-4 11 0M14 16c3-1 6 .5 6.5 3"/></>,
    settings: <><path d="M5 7h14M5 17h14M5 12h14"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="11" cy="17" r="2"/></>,
    more: <><circle cx="6" cy="6" r="1.5"/><circle cx="12" cy="6" r="1.5"/><circle cx="18" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/><circle cx="12" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></>,
    cinema: <><rect x="4" y="7" width="16" height="12" rx="3"/><path d="m10 11 5 2-5 2v-4ZM6 4l2 3M12 4l2 3M18 4l2 3"/></>,
    away: <><path d="m3.5 11 8-6.5 8 6.5M6 10v9h7"/><path className="hi-motion" d="M12 15h8m-3-3 3 3-3 3"/></>
  };
  return <svg className={`homeii-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{art[name]}</svg>;
}

export function roomIconName(id: string, name: string): HomeiiIconName {
  const value = `${id} ${name}`.toLowerCase();
  if (/living|סלון/.test(value)) return "living";
  if (/dining|kitchen|מטבח|אוכל/.test(value)) return "dining";
  if (/bed|שינה|אגם|ליעד/.test(value)) return "bedroom";
  if (/office|משרד/.test(value)) return "office";
  if (/bath|מקלחת|אמבט/.test(value)) return "bath";
  if (/out|חוץ|מרפסת|גג/.test(value)) return "outdoor";
  return "home";
}
