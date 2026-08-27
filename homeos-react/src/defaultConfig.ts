import type { HomeOSConfig } from "./types";

export const defaultConfig: HomeOSConfig = {
  homeTitle: "הבית שלנו",
  dashboardPath: "/homeiios",
  legacyDashboardPath: "/dashboard-clean",
  branding: {
    logo: "/local/homeiios/homeiios-logo-v2.png",
    animation: "spin",
    action: { type: "view", target: "home" }
  },
  backgrounds: { home: "/local/homeiios/homeiios-livingroom-warm.png" },
  timeBackgrounds: {
    morning: "/local/homeiios/homeiios-livingroom-morning.png",
    day: "/local/homeiios/homeiios-livingroom-day.png",
    evening: "/local/homeiios/homeiios-livingroom-evening.png",
    night: "/local/homeiios/homeiios-livingroom-night.png"
  },
  backgroundPresets: [
    { id: "automatic", name: "אוטומטי", image: "" },
    { id: "mineral", name: "זכוכית מינרלית", image: "/local/homeiios/background-mineral-glass.png" },
    { id: "smoke", name: "כחול עשן", image: "/local/homeiios/background-smoke-blue.png" },
    { id: "silk", name: "משי כהה", image: "/local/homeiios/background-dark-silk.png" }
    ,{ id: "sage", name: "מרווה וברונזה", image: "/local/homeiios/background-sage-bronze.png" }
    ,{ id: "vivid-cobalt", name: "קובלט וקורל", image: "/local/homeiios/background-vivid-cobalt-coral.png" }
    ,{ id: "vivid-emerald", name: "אמרלד וענבר", image: "/local/homeiios/background-vivid-emerald-amber.png" }
    ,{ id: "calm-stone", name: "אבן רגועה", image: "/local/homeiios/background-calm-stone.png" }
  ],
  entities: {
    temperature: "sensor.ims_temperature",
    weather: "weather.ims_weather",
    power: "sensor.shelly_power_1",
    intercomCount: "sensor.intercom_person_count",
    nightMode: "input_boolean.night_mode",
    kiosk: "input_boolean.kiosk_full",
    allLights: "group.all_lights",
    restoreScene: "scene.restor"
  },
  rooms: [],
  roomDefinitions: {},
  secondary: [],
  appearance: {
    themeMode: "system",
    densityMode: "comfort",
    highContrast: false,
    accent: "#f6bd72",
    coolAccent: "#a8ceff",
    sectionColor: "#111825",
    tileColor: "#202a3a",
    background: "",
    backgroundDim: 22,
    surfaceOpacity: 64,
    tileOpacity: 58,
    darkPalette: "granite",
    lightPalette: "ivory",
    textColor: "#f5f5f4",
    sidebarAccent: "#7fb6ff",
    sidebarIconColor: "#cfe6ff",
    blur: 24,
    radius: 26
  }
};
