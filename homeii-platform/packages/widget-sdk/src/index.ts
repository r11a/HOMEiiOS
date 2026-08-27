import type { EntityCapabilities, WidgetManifest } from "@homeii/contracts";
export { genericControl, genericEntityManifest } from "./generic";

export interface WidgetDefinition<TSettings extends Record<string, unknown> = Record<string, unknown>> {
  manifest: WidgetManifest<TSettings>;
  validate(settings: unknown): settings is TSettings;
}

export class WidgetRegistry {
  readonly #widgets = new Map<string, WidgetDefinition>();

  register(definition: WidgetDefinition): void {
    if (this.#widgets.has(definition.manifest.type)) throw new Error(`Duplicate widget: ${definition.manifest.type}`);
    this.#widgets.set(definition.manifest.type, definition);
  }

  get(type: string): WidgetDefinition | undefined { return this.#widgets.get(type); }

  compatible(capabilities: EntityCapabilities): WidgetDefinition[] {
    return [...this.#widgets.values()].filter(({ manifest }) =>
      (manifest.domains.includes("*") || manifest.domains.includes(capabilities.domain)) && manifest.requires.every((feature) => capabilities.features.includes(feature))
    );
  }
}
