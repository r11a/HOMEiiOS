export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  user?: { id: string; name: string; is_admin: boolean };
  locale?: { language: string };
  callService(domain: string, service: string, data?: Record<string, unknown>, target?: Record<string, unknown>): Promise<unknown>;
  callApi?<T = unknown>(method: string, path: string, parameters?: Record<string, unknown>): Promise<T>;
  callWS?<T = unknown>(message: Record<string, unknown>): Promise<T>;
  navigate?(path: string): void;
}

export interface RoomConfig {
  id: string;
  areaIds?: string[];
  name: string;
  icon: string;
  subtitle: string;
  legacyPath: string;
}

export interface LinkConfig {
  id: string;
  name: string;
  icon: string;
  legacyPath: string;
}

export interface RoomDeviceConfig {
  entity: string;
  name: string;
  icon: string;
  kind?: "light" | "curtain";
}

export interface RoomSceneConfig {
  entity: string;
  name: string;
  icon: string;
}

export interface RoomDefinition {
  climate?: string;
  temperature?: string;
  humidity?: string;
  lights: RoomDeviceConfig[];
  curtains?: RoomDeviceConfig[];
  media?: string;
  scenes?: RoomSceneConfig[];
  statusDomains?: Array<"light" | "climate" | "media_player" | "security">;
}

export interface HomeOSConfig {
  homeTitle: string;
  dashboardPath: string;
  legacyDashboardPath: string;
  backgrounds: Record<string, string>;
  timeBackgrounds?: Partial<Record<"morning" | "day" | "evening" | "night", string>>;
  backgroundPresets?: Array<{ id: string; name: string; image: string }>;
  entities: Record<string, string>;
  rooms: RoomConfig[];
  roomDefinitions?: Record<string, RoomDefinition>;
  secondary: LinkConfig[];
  appearance?: AppearanceSettings;
  branding?: BrandingSettings;
}

export interface BrandingSettings {
  logo: string;
  animation: "spin" | "none";
  action: BrandAction;
}

export type BrandAction =
  | { type: "view"; target: string }
  | { type: "navigate"; target: string }
  | { type: "service"; target: string; entityId?: string; data?: Record<string, unknown> };

export interface AppearanceSettings {
  themeMode: "system" | "dark" | "light";
  densityMode: "comfort" | "compact";
  highContrast: boolean;
  accent: string;
  coolAccent: string;
  sectionColor: string;
  tileColor: string;
  background: string;
  backgroundDim: number;
  surfaceOpacity: number;
  tileOpacity: number;
  darkPalette: "rich-brown" | "night-blue" | "granite";
  lightPalette: "bright-white" | "cream" | "ivory" | "mocha";
  textColor: string;
  sidebarAccent: string;
  sidebarIconColor: string;
  blur: number;
  radius: number;
}
