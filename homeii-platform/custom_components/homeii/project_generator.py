"""Deterministic Area-first HOMEii project generator."""

from __future__ import annotations

import re
from copy import deepcopy
from typing import Any


WIDGETS_BY_DOMAIN = {
    "light": "light.collection",
    "climate": "climate.thermostat",
    "media_player": "media.player",
    "camera": "camera.viewer",
    "cover": "cover.control",
    "alarm_control_panel": "security.alarm",
    "switch": "switch.collection",
}

DOMAIN_ORDER = (
    "light", "cover", "climate", "media_player", "camera",
    "alarm_control_panel", "switch", "sensor",
)

COLLECTION_LIMIT = 12
SENSOR_LIMIT = 4
AUTO_DOMAINS = set(DOMAIN_ORDER)
DIAGNOSTIC_DEVICE_CLASSES = {
    "battery", "signal_strength", "timestamp", "duration", "data_rate",
    "data_size", "frequency", "voltage", "current",
}
NOISY_NAME_PARTS = (
    "rssi", "linkquality", "link quality", "firmware", "uptime", "last seen",
    "last_seen", "diagnostic", "diagnostics", "device temperature", "cpu",
    "memory", "storage", "restart", "identify", "configuration", "device_temperature",
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


def _entity_score(entity: dict[str, Any]) -> int:
    """Score dashboard usefulness without relying on vendor-specific entity ids."""
    domain = entity.get("domain", "")
    device_class = entity.get("device_class")
    searchable = f"{entity.get('entity_id', '')} {entity.get('name', '')}".lower()
    if domain not in AUTO_DOMAINS or any(part in searchable for part in NOISY_NAME_PARTS):
        return -100
    if domain in {"light", "climate", "media_player", "camera", "cover", "alarm_control_panel"}:
        score = 90
    elif domain == "switch":
        score = 65
    elif domain == "sensor" and device_class == "temperature":
        score = 70
    else:
        score = 10
    if device_class in DIAGNOSTIC_DEVICE_CLASSES:
        score -= 55
    if entity.get("available") is False:
        score -= 45
    return score


def _relevant_entities(entities: list[dict[str, Any]], limit: int) -> list[dict[str, Any]]:
    ranked = sorted(entities, key=lambda item: (-_entity_score(item), item.get("entity_id", "")))
    return [item for item in ranked if _entity_score(item) >= 40][:limit]


def _area_widgets(area: dict[str, Any]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = {}
    for entity in area.get("entities", []):
        # Missing assignment_source is treated as direct for migrations/tests.
        if entity.get("domain") in AUTO_DOMAINS and entity.get("assignment_source", "entity") == "entity":
            grouped.setdefault(entity["domain"], []).append(entity)

    widgets: list[dict[str, Any]] = []
    for domain in DOMAIN_ORDER:
        limit = SENSOR_LIMIT if domain == "sensor" else COLLECTION_LIMIT
        entities = _relevant_entities(grouped.pop(domain, []), limit)
        if not entities:
            continue
        if domain == "sensor":
            for entity in entities:
                widget_type = _sensor_widget(entity)
                widgets.append(_binding(area["area_id"], widget_type, domain, [entity], "compact"))
            continue
        widget_type = WIDGETS_BY_DOMAIN.get(domain, "entity.generic")
        widgets.append(_binding(area["area_id"], widget_type, domain, entities, _widget_size(domain, len(entities))))

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
    template: str = "homeii-signature",
) -> dict[str, Any]:
    """Generate a schema-valid project preview without persisting it."""
    if template not in {"homeii-signature", "area-first"}:
        raise ValueError("unsupported_template")
    template = "homeii-signature" if template == "area-first" else template
    safe_id = _slug(project_id, "home")
    areas: dict[str, Any] = {}
    for area in installation.get("areas", []):
        area_id = area["area_id"]
        areas[area_id] = {
            "areaId": area_id,
            "title": area.get("name") or area_id,
            "titleMode": "auto",
            "picture": area.get("picture") or "",
            "hidden": False,
            "categories": ["overview", "lighting", "climate", "media", "security"],
            "widgets": _area_widgets(area),
        }
    return {
        "schemaVersion": 1,
        "revision": 1,
        "id": safe_id,
        "name": name.strip()[:80] or "My HOMEii",
        "template": template,
        "brand": {"name": "HOMEii", "tagline": "The intelligent home, beautifully orchestrated", "logo": ""},
        "theme": {"mode": "system", "preset": "rich-brown", "tokens": {"accent": "#d6a45d", "text": "#f8f5ef", "surface": "#1b1918", "radius": 24, "blur": 26, "tileOpacity": 0.72}},
        "areas": areas,
        "permissions": {"defaultRole": "viewer", "users": {}},
    }


def merge_generated_project(generated: dict[str, Any], existing: dict[str, Any] | None) -> dict[str, Any]:
    """Refresh HA bindings while preserving deliberate Studio overrides."""
    if not existing:
        return generated
    merged = deepcopy(generated)
    for key in ("name", "brand", "theme", "permissions"):
        if key in existing:
            merged[key] = deepcopy(existing[key])
    for area_id, area in merged["areas"].items():
        previous = existing.get("areas", {}).get(area_id, {})
        for key in ("hidden", "categories", "picture", "titleMode"):
            if key in previous:
                area[key] = deepcopy(previous[key])
        if previous.get("titleMode") == "custom":
            area["title"] = previous.get("title", area["title"])
        excluded = set(previous.get("excludedWidgetIds", []))
        manual = [widget for widget in previous.get("widgets", []) if not widget.get("settings", {}).get("generated", False)]
        area["excludedWidgetIds"] = sorted(excluded)
        area["widgets"] = [widget for widget in area["widgets"] if widget["id"] not in excluded] + deepcopy(manual)
    return merged
