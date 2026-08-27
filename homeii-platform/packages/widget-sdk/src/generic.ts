import type { EntityCapabilities, WidgetManifest } from "@homeii/contracts";

export const genericEntityManifest: WidgetManifest = {
  type: "entity.generic",
  version: 1,
  domains: ["*"],
  requires: [],
  optional: ["toggle", "set_value", "select_option", "press", "open", "close"],
  sizes: ["compact", "regular", "expanded"],
  defaults: { showName: true, showState: true, control: "auto" },
};

export function genericControl(capabilities: EntityCapabilities): "toggle" | "slider" | "select" | "details" {
  if (capabilities.features.includes("set_value") && capabilities.min !== undefined && capabilities.max !== undefined) return "slider";
  if (capabilities.features.includes("select_option")) return "select";
  if (capabilities.features.includes("toggle")) return "toggle";
  return "details";
}
