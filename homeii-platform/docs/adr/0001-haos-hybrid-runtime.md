# ADR-0001: HAOS hybrid runtime

Status: accepted

## Decision

Use a Supervisor App for the control plane and a narrow custom integration for HA-native authorization, registries and WebSocket commands. Keep rendering in a React custom panel.

## Why

The App provides durable product operations and Ingress. The integration can enforce HA administrator status without giving the App broad Supervisor or `/config` access. The panel remains responsive and receives live HA state without polling.

## Rejected alternatives

- Add-on only: cannot safely infer the initiating HA user's authorization for every dashboard mutation.
- Frontend only: browser storage cannot synchronize or migrate installation-wide configuration.
- Integration only: unsuitable for large asset workflows, release management and backups.
