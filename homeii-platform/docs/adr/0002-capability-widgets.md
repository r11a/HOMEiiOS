# ADR-0002: Capability-based widgets

Status: accepted

## Decision

Select widgets and controls by HA domain plus capabilities, not by entity ID or vendor.

Examples:

- A light without `brightness` receives a binary control.
- A dimmable light receives swipe dimming.
- A climate entity receives only the HVAC modes and ranges it advertises.
- A camera receives a live provider only when available and permitted.

This prevents invalid controls and makes automatic Area generation portable between installations.
