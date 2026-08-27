# ADR-0004: AI-assisted Studio boundary

Status: accepted

## Decision

AI is an optional planning provider for HOMEii Studio, never the dashboard runtime or an authorization boundary. A provider receives a minimized, permission-filtered installation summary and returns versioned HOMEii project operations. The same schema validator, preview, revision check, undo history and administrator publish flow used by manual editing also apply to AI output.

## Safety and privacy

- No entity state, person location, camera frame or user identity leaves HA unless an administrator explicitly enables and scopes a provider.
- Secrets and access tokens are never part of a prompt or stored project.
- AI may recommend bindings and layouts but cannot widen HA or HOMEii permissions.
- Service calls require a separate runtime action path and are not executed from generated layout operations.
- Every proposal records provider, model, timestamp, input scope and a human-readable explanation without storing hidden reasoning.

## Extension contract

Providers implement `analyze`, `propose_project_operations` and optionally `propose_widget_settings`. Output is a list of typed operations such as `add_widget`, `move_widget`, `bind_entities`, `set_token` and `set_visibility`. Unknown operations are rejected. Applying operations is deterministic and provider-independent.

This design supports local models, Home Assistant Assist/LLM APIs and remote providers without coupling the persisted dashboard to one vendor.
