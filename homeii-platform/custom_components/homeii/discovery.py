"""Build the installation model from Home Assistant registries."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar, device_registry as dr, entity_registry as er

def async_build_installation_model(hass: HomeAssistant) -> dict[str, Any]:
    """Return areas and their effective entities, including device-inherited areas."""
    areas = ar.async_get(hass)
    devices = dr.async_get(hass)
    entities = er.async_get(hass)
    result: dict[str, Any] = {"areas": [], "unassigned": [], "domains": {}}
    by_area: dict[str, list[dict[str, Any]]] = {area.id: [] for area in areas.async_list_areas()}

    for entry in entities.entities.values():
        if entry.disabled_by is not None:
            continue
        domain = entry.entity_id.split(".", 1)[0]
        device = devices.async_get(entry.device_id) if entry.device_id else None
        area_id = entry.area_id or (device.area_id if device else None)
        state = hass.states.get(entry.entity_id)
        item = {
            "entity_id": entry.entity_id,
            "domain": domain,
            "name": entry.name or entry.original_name or (state.name if state else entry.entity_id),
            "device_id": entry.device_id,
            "area_id": area_id,
            "device_class": entry.original_device_class or (state.attributes.get("device_class") if state else None),
            "state": state.state if state else None,
            "available": bool(state and state.state not in ("unknown", "unavailable")),
        }
        result["domains"].setdefault(domain, 0)
        result["domains"][domain] += 1
        if area_id in by_area:
            by_area[area_id].append(item)
        else:
            result["unassigned"].append(item)

    for area in areas.async_list_areas():
        area_entities = by_area[area.id]
        result["areas"].append({
            "area_id": area.id,
            "name": area.name,
            "aliases": list(area.aliases),
            "floor_id": area.floor_id,
            "picture": area.picture,
            "entities": area_entities,
            "domains": sorted({item["domain"] for item in area_entities}),
        })
    return result
