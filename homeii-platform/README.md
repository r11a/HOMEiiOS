# HOMEii Platform

HAOS-first product foundation for a synchronized, editable and auto-generated Home Assistant dashboard.

## Architecture

- `homeii/`: mandatory Supervisor App control plane with Ingress, durable `/data` storage, assets, migrations and backups.
- `custom_components/homeii`: narrow security bridge for HA user permissions, registries and WebSocket API.
- Existing React panel: presentation and visual editor; it will migrate from browser `localStorage` to this API.
- Existing React panel: presentation, onboarding and visual editor.

## WebSocket contract

- `homeii/config/get`: authenticated configuration read.
- `homeii/discovery/get`: live Area/Device/Entity model.
- `homeii/config/patch`: administrator-only atomic patch with revision conflict protection.

## Configuration hierarchy

`global defaults → profile → user → device → session`

The App owns projects/assets/backups. The integration bridge owns HA-aware global/profile/device configuration. Session-only UI state remains in the browser.

## Safety

- Non-admin users cannot mutate platform configuration.
- Ingress exposes health only; it has no configuration write endpoint.
- Full configuration reads are admin-only. Regular users receive only their effective profile and access scope.
- Writes use optimistic concurrency (`revision`) to prevent one tablet overwriting another.
- Unknown future configuration keys are preserved.
- Existing HOMEii dashboard files are not modified by this prototype.

## Next implementation milestone

1. Connect the React Control Center to the WebSocket API.
2. Add the onboarding wizard and suggested room templates.
3. Introduce the domain widget registry and capability-based controls.
4. Add migration from current `config.json` and browser profiles.
5. Package and validate the HAOS repository on amd64 and aarch64 before expanding architectures.
