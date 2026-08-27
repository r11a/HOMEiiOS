# HOMEii Platform

HAOS-first product foundation for a synchronized, editable and auto-generated Home Assistant dashboard.

## Architecture

- `/homeii` at the repository root is the installable Supervisor App. This
  nested platform directory retains the control-plane source and architecture
  references without a second discoverable `config.yaml`.
- `custom_components/homeii`: narrow security bridge for HA user permissions, registries and WebSocket API.
- Existing React panel: presentation and visual editor; it will migrate from browser `localStorage` to this API.
- Existing React panel: presentation, onboarding and visual editor.

## WebSocket contract

- `homeii/config/get`: authenticated configuration read.
- `homeii/discovery/get`: live Area/Device/Entity model.
- `homeii/config/patch`: administrator-only atomic patch with revision conflict protection.
- `homeii/project/preview`: administrator-only deterministic Area-first project generation without persistence.

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

## Current foundation

- HA entity read permissions are applied before discovery data leaves Home Assistant.
- The first Area-first generator maps known domains to rich widget types and preserves unknown domains through `entity.generic`.
- Generated previews are deterministic and do not mutate the installation.

## Next implementation milestone

1. Package a self-contained HA custom panel and connect it to the WebSocket API.
2. Render the generated preview with live HA state and a lossless HA card host.
3. Add draft/publish project persistence with revision history.
4. Introduce capability adapters beyond the initial domain mapping.
5. Add migration from current `config.json` and browser profiles.
