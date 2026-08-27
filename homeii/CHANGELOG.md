# Changelog

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
