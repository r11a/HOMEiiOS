# Changelog

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
