"""Safe Lovelace YAML to HOMEii intermediate representation migration."""

from __future__ import annotations

from dataclasses import dataclass, field
import re
from typing import Any

import yaml


@dataclass
class MigrationReport:
    """Result of a non-destructive migration preview."""

    project: dict[str, Any]
    warnings: list[dict[str, Any]] = field(default_factory=list)
    statistics: dict[str, int] = field(default_factory=dict)


class LovelaceLoader(yaml.SafeLoader):
    """Safe loader that preserves HA-specific tags without executing them."""


def _preserve_tag(loader: LovelaceLoader, suffix: str, node: yaml.Node) -> Any:
    if isinstance(node, yaml.ScalarNode):
        value: Any = loader.construct_scalar(node)
    elif isinstance(node, yaml.SequenceNode):
        value = loader.construct_sequence(node)
    else:
        value = loader.construct_mapping(node)
    return {"$ha_tag": suffix, "value": value}


LovelaceLoader.add_multi_constructor("!", _preserve_tag)

STANDARD_WIDGETS = {
    "thermostat": "climate.thermostat",
    "light": "light.control",
    "media-control": "media.player",
    "weather-forecast": "weather.forecast",
    "alarm-panel": "security.alarm",
    "map": "location.map",
    "gauge": "sensor.gauge",
    "sensor": "sensor.value",
    "button": "action.button",
    "tile": "entity.tile",
    "picture-entity": "camera.viewer",
    "entities": "entity.collection",
}

CUSTOM_WIDGETS = {
    "custom:advanced-camera-card": "camera.advanced",
    "custom:homeii-music-flow": "media.music-flow",
    "custom:homeii-ma-card": "media.music-assistant",
    "custom:bubble-card": "entity.bubble",
    "custom:mushroom-light-card": "light.control",
    "custom:mushroom-climate-card": "climate.thermostat",
    "custom:button-card": "action.template-button",
    "custom:mini-graph-card": "sensor.history",
    "custom:apexcharts-card": "sensor.chart",
}


def _slug(value: str, fallback: str) -> str:
    normalized = re.sub(r"[^a-z0-9_-]+", "-", value.lower()).strip("-")
    return normalized or fallback


def _entities(value: Any) -> list[str]:
    found: list[str] = []
    if isinstance(value, str) and "." in value and not value.startswith(("/", "http", "#")):
        found.append(value)
    elif isinstance(value, list):
        for item in value:
            if isinstance(item, str):
                found.extend(_entities(item))
            elif isinstance(item, dict):
                found.extend(_entities(item.get("entity")))
    elif isinstance(value, dict):
        for key in ("entity", "entity_id", "camera_entity"):
            found.extend(_entities(value.get(key)))
        for key in ("entities", "cameras", "triggers_update"):
            found.extend(_entities(value.get(key)))
    return list(dict.fromkeys(found))


def _walk_cards(cards: Any, path: str, report: MigrationReport) -> list[dict[str, Any]]:
    if not isinstance(cards, list):
        return []
    widgets: list[dict[str, Any]] = []
    for index, card in enumerate(cards):
        card_path = f"{path}.cards[{index}]"
        if not isinstance(card, dict):
            report.warnings.append({"path": card_path, "code": "invalid_card", "message": "Card is not an object"})
            continue
        card_type = str(card.get("type", "unknown"))
        nested = card.get("cards")
        if isinstance(nested, list) and card_type in ("vertical-stack", "horizontal-stack", "grid", "custom:stack-in-card"):
            widgets.extend(_walk_cards(nested, card_path, report))
            continue
        widget_type = STANDARD_WIDGETS.get(card_type) or CUSTOM_WIDGETS.get(card_type)
        confidence = "high" if widget_type else "legacy"
        if not widget_type:
            widget_type = "legacy.lovelace-card"
            report.warnings.append({"path": card_path, "code": "unsupported_card", "message": f"{card_type} will be preserved as a legacy widget"})
        widget = {
            "id": f"migrated-{len(report.project.get('_widget_ids', [])) + len(widgets) + 1}",
            "widgetType": widget_type,
            "sourceType": card_type,
            "entityIds": _entities(card),
            "size": "regular",
            "confidence": confidence,
            "settings": {"source": card},
        }
        widgets.append(widget)
        report.statistics[confidence] = report.statistics.get(confidence, 0) + 1
    return widgets


def migrate_lovelace_yaml(content: str, known_areas: list[dict[str, Any]]) -> MigrationReport:
    """Parse YAML and return a non-destructive HOMEii migration preview."""
    if len(content.encode("utf-8")) > 2_000_000:
        raise ValueError("yaml_too_large")
    try:
        source = yaml.load(content, Loader=LovelaceLoader)
    except yaml.YAMLError as err:
        raise ValueError("invalid_yaml") from err
    if not isinstance(source, dict):
        raise ValueError("invalid_dashboard")
    views = source.get("views", [])
    if not isinstance(views, list):
        raise ValueError("missing_views")

    area_lookup: dict[str, str] = {}
    for area in known_areas:
        area_id = str(area.get("area_id", ""))
        for label in (area_id, area.get("name", ""), *(area.get("aliases", []) or [])):
            area_lookup[re.sub(r"[\s_-]+", "", str(label).lower())] = area_id

    project: dict[str, Any] = {"schemaVersion": 1, "revision": 1, "id": "imported-dashboard", "name": str(source.get("title", "Imported dashboard")), "areas": {}, "unassignedViews": []}
    report = MigrationReport(project=project, statistics={"views": len(views), "high": 0, "legacy": 0})
    for index, view in enumerate(views):
        if not isinstance(view, dict):
            report.warnings.append({"path": f"views[{index}]", "code": "invalid_view", "message": "View is not an object"})
            continue
        title = str(view.get("title") or view.get("path") or f"View {index + 1}")
        normalized = re.sub(r"[\s_-]+", "", title.lower())
        area_id = area_lookup.get(normalized)
        layout = {
            "areaId": area_id or _slug(str(view.get("path", title)), f"view-{index + 1}"),
            "title": title,
            "hidden": bool(view.get("visible") is False),
            "picture": (view.get("background") or {}).get("image") if isinstance(view.get("background"), dict) else view.get("background"),
            "widgets": _walk_cards(view.get("cards", []), f"views[{index}]", report),
            "source": {"path": view.get("path"), "type": view.get("type")},
        }
        if area_id:
            project["areas"][area_id] = layout
        else:
            project["unassignedViews"].append(layout)
            report.warnings.append({"path": f"views[{index}]", "code": "area_unmatched", "message": f"No HA Area matched '{title}'"})
    report.statistics["warnings"] = len(report.warnings)
    return report
