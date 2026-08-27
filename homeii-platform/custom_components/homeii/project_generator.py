"""Deterministic Area-first HOMEii project generator."""

from __future__ import annotations

import re
from typing import Any


WIDGETS_BY_DOMAIN = {
    "light": "light.collection",
    "climate": "climate.thermostat",
    "media_player": "media.player",
    "camera": "camera.viewer",
    "cover": "cover.control",
    "fan": "fan.control",
    "vacuum": "vacuum.control",
    "lock": "security.lock",
    "alarm_control_panel": "security.alarm",
    "switch": "switch.collection",
    "scene": "scene.collection",
    "script": "script.collection",
    "weather": "weather.forecast",
    "person": "person.presence",
}

DOMAIN_ORDER = (
    "light", "climate", "media_player", "camera", "cover", "fan", "vacuum",
    "lock", "alarm_control_panel", "switch", "scene", "script", "weather", "person",
    "sensor", "binary_sensor",
)


def _slug(value: str, fallback: str) -> str:
    slug = re.sub(r"[^a-z0-9_-]+", "-", value.lower()).strip("-")
    return (slug or fallback)[:64]


def _widget_size(domain: str, count: int) -> str:
    if domain in {"climate", "camera", "media_player", "weather"}:
        return "expanded"
    if count > 4:
        return "expanded"
    return "regular"


def _sensor_widget(entity: dict[str, Any]) -> str:
    device_class = entity.get("device_class")
    if device_class in {"temperature", "humidity", "energy", "power"}:
        return f"sensor.{device_class}"
    return "sensor.value"


def _area_widgets(area: dict[str, Any]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = {}
    for entity in area.get("entities", []):
        grouped.setdefault(entity["domain"], []).append(entity)

    widgets: list[dict[str, Any]] = []
    for domain in DOMAIN_ORDER:
        entities = grouped.pop(domain, [])
        if not entities:
            continue
        if domain in {"sensor", "binary_sensor"}:
            for entity in entities:
                widget_type = _sensor_widget(entity) if domain == "sensor" else "binary_sensor.status"
                widgets.append(_binding(area["area_id"], widget_type, domain, [entity], "compact"))
            continue
        widget_type = WIDGETS_BY_DOMAIN.get(domain, "entity.generic")
        widgets.append(_binding(area["area_id"], widget_type, domain, entities, _widget_size(domain, len(entities))))

    for domain in sorted(grouped):
        widgets.append(_binding(area["area_id"], "entity.generic", domain, grouped[domain], "regular"))
    return widgets


def _binding(area_id: str, widget_type: str, domain: str, entities: list[dict[str, Any]], size: str) -> dict[str, Any]:
    return {
        "id": f"{area_id}-{_slug(widget_type, domain)}",
        "areaId": area_id,
        "widgetType": widget_type,
        "entityIds": [entity["entity_id"] for entity in entities],
        "capabilityQuery": {"domain": domain},
        "size": size,
        "settings": {"generated": True},
    }


def generate_project(
    installation: dict[str, Any],
    project_id: str = "home",
    name: str = "My HOMEii",
    template: str = "area-first",
) -> dict[str, Any]:
    """Generate a schema-valid project preview without persisting it."""
    if template != "area-first":
        raise ValueError("unsupported_template")
    safe_id = _slug(project_id, "home")
    areas: dict[str, Any] = {}
    for area in installation.get("areas", []):
        area_id = area["area_id"]
        areas[area_id] = {
            "areaId": area_id,
            "title": area.get("name") or area_id,
            "picture": area.get("picture") or "",
            "hidden": False,
            "widgets": _area_widgets(area),
        }
    return {
        "schemaVersion": 1,
        "revision": 1,
        "id": safe_id,
        "name": name.strip()[:80] or "My HOMEii",
        "brand": {"name": "HOMEii"},
        "theme": {"mode": "system", "preset": "granite", "tokens": {}},
        "areas": areas,
        "permissions": {"defaultRole": "viewer", "users": {}},
    }
