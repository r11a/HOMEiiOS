# ADR-0003: Versioned schema and forward migrations

Status: accepted

## Decision

`packages/contracts/schema/homeii-project.schema.json` is the source of truth for stored project documents. TypeScript types, Studio forms and Python validation must track the schema version. Writes use optimistic revision checks. Migrations never run in the browser and always create an HAOS backup first.
