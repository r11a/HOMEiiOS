# Changelog

## 0.4.0-alpha.1

- Make the HOMEii Integration the single project source of truth.
- Add an allow-listed Add-on bridge to the Integration WebSocket API.
- Replace the legacy Ingress dashboard with the first synchronized HOMEii Studio.
- Edit Area pictures, theme tokens, widget sizes and visibility, then publish to every native dashboard client.

## 0.3.0-alpha.2

- Recover the existing Alpha dashboard when a 0.3 Project Registry exists but
  is still empty, preserving both legacy draft and published snapshots.

## 0.3.0-alpha.1

- Replace the single-dashboard store with a versioned multi-project registry.
- Migrate the existing draft and published dashboard automatically without
  deleting the legacy files.
- Add a Project Manager with create, open and duplicate flows.
- Add a seven-step setup wizard for identity, template and theme, Area/YAML
  source, room selection, per-room Hero images, system background, categories,
  dashboard/Ingress shortcuts and final review.
- Give every project independent draft, published snapshot, revision, theme,
  Areas, setup choices and permissions data.
- Allow runtime selection through a stable `?project=<projectId>` parameter.

## 0.2.0-alpha.3

- Add Area-aware room templates for balanced, comfort, cinema and security
  layouts; templates create only widgets backed by compatible HA entities.
- Add a live Studio canvas with active entity counts and domain state styling.
- Add an entity binding inspector with friendly names, current HA state and
  explicit per-widget selection.
- Add a structured JSON editor that preserves regular HA card configuration
  for the upcoming native HA Panel card host.

## 0.2.0-alpha.2

- Raise the authenticated Home Assistant WebSocket message ceiling from the
  aiohttp 4 MiB default to a bounded 32 MiB so Studio discovery works with
  large entity registries.

## 0.2.0-alpha.1

- Add the first HOMEii Studio vertical slice with Area discovery, a responsive
  canvas, drag-and-drop ordering, widget sizing, visibility controls, theme
  tokens, device previews and safe Lovelace YAML migration reports.
- Persist draft and published projects independently and make the dashboard
  runtime consume only the last published revision on every device.
- Replace the browser's missing `ha-icon` fallback with a generated registry of
  native Material Design SVG paths, eliminating diamond placeholder glyphs.
- Add optimistic revision checks and atomic project writes to avoid silently
  overwriting Studio changes.

## 0.1.0-alpha.6

- Build React explicitly for a browser production runtime.
- Remove Node-only `process.env` references that prevented the panel module
  from executing in Home Assistant Ingress.
- Add a build gate that rejects Node-only globals in future browser bundles.

## 0.1.0-alpha.5

- Disable browser caching for the Ingress bootstrap modules.
- Report frontend bootstrap and runtime failures into the App log.

## 0.1.0-alpha.4

- Fix the Ingress frontend module URL from `/assets/assets/homeiios-panel.js`
  to `/assets/homeiios-panel.js`.

## 0.1.0-alpha.3

- Temporarily disable the custom AppArmor profile to isolate persistent S6
  `/init` startup failures on the HAOS test host.
- Keep the Alpha isolated behind administrator-only Ingress with no published
  network ports and only its dedicated app configuration mapped writable.

## 0.1.0-alpha.2

- Allow the Home Assistant base image and S6 Overlay bootstrap through the
  HOMEiiOS AppArmor profile.
- Fix startup failure reporting `/init: Permission denied`.

## 0.1.0-alpha.1

- First installable HAOS repository layout.
- HOMEiiOS React runtime served through Ingress.
- Live Home Assistant state polling and service-call bridge.
- Administrator-only panel and health diagnostics.
