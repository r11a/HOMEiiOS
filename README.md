<div align="center">
  <img src="assets/homeiios/homeiios-logo-v2.png" alt="HOMEiiOS" width="132" />
  <h1>HOMEiiOS</h1>
  <p><strong>A premium dashboard operating system for Home Assistant OS.</strong></p>
  <p>React runtime · HOMEii Studio · Area Engine · Widget SDK · HAOS Control Plane</p>
</div>

> **Proprietary software — All Rights Reserved.** Viewing this repository does
> not grant permission to use, copy, modify, install or distribute any part of
> HOMEiiOS. See [LICENSE](LICENSE).

## Repository contents

- `homeii-platform/` — HAOS-first commercial platform foundation: Supervisor
  App, Integration Bridge, synchronized contracts, permissions, automatic Area
  discovery, Widget SDK and Lovelace YAML migration engine.
- `homeos-react/` — current working HOMEii React dashboard prototype and its
  visual system.
- `assets/` — original HOMEiiOS branding, room Hero images and interface
  backgrounds.
- root YAML files — preserved development history and migration reference
  dashboards. Embedded credentials have been removed and replaced with
  `!secret` references.

## Product principles

- Home Assistant remains the source of truth for users, Areas, devices,
  entities, states and services.
- Only HA administrators may persist HOMEiiOS configuration.
- Permissions can be restricted by project, dashboard, page, Area, widget,
  domain and entity.
- Every HA domain is discoverable. Known domains receive premium capability
  widgets; unknown domains receive a safe generic widget.
- Existing Lovelace YAML is migrated through a safe preview pipeline; unknown
  custom cards are preserved rather than discarded.
- Configuration is versioned, revision-protected and migration-ready.

## Status

The existing React prototype is operational. The next-generation platform is
under active development and is intentionally isolated until its installation,
migration and responsive test gates pass.

Architecture details: [homeii-platform/docs/ARCHITECTURE.md](homeii-platform/docs/ARCHITECTURE.md).

## Security

Never commit Home Assistant secrets, access tokens, API keys, private URLs or
`.storage` data. Use `secrets.yaml` locally. Security issues must not be opened
as public issues; contact the owner privately.

## Copyright

Copyright © 2026 Ronen / HOMEiiOS. All rights reserved. HOMEiiOS and HOMEii are
proprietary names and visual identities.
