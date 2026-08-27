export type HomeiiRole = "viewer" | "operator" | "admin";
export type WidgetSize = "compact" | "regular" | "expanded";
export type HomeiiAction = "view" | "control" | "edit" | "admin";
export type HomeiiResource =
  | `project:${string}` | `dashboard:${string}` | `page:${string}`
  | `area:${string}` | `widget:${string}` | `domain:${string}` | `entity:${string}`;

export interface AccessRule {
  id: string;
  effect: "allow" | "deny";
  users: string[];
  actions: HomeiiAction[];
  resources: Array<HomeiiResource | "*">;
}

export interface AccessPolicy {
  defaults: { actions: HomeiiAction[] };
  rules: AccessRule[];
}

export interface EntityCapabilities {
  domain: string;
  features: string[];
  deviceClass?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface WidgetBinding {
  id: string;
  areaId: string;
  widgetType: string;
  entityIds: string[];
  capabilityQuery: { domain: string; requires?: string[]; prefers?: string[] };
  size: WidgetSize;
  settings: Record<string, unknown>;
}

export interface AreaLayout {
  areaId: string;
  title?: string;
  picture?: string;
  hidden: boolean;
  widgets: WidgetBinding[];
}

export interface HomeiiProject {
  schemaVersion: 1;
  revision: number;
  id: string;
  name: string;
  brand: { name: string; logo?: string };
  theme: { mode: "system" | "dark" | "light"; preset: string; tokens: Record<string, string | number> };
  areas: Record<string, AreaLayout>;
  permissions: { defaultRole: HomeiiRole; users: Record<string, { role: HomeiiRole; areas?: string[] }>; policy?: AccessPolicy };
}

export interface WidgetManifest<TSettings extends Record<string, unknown> = Record<string, unknown>> {
  type: string;
  version: number;
  domains: string[];
  requires: string[];
  optional: string[];
  sizes: WidgetSize[];
  defaults: TSettings;
}
