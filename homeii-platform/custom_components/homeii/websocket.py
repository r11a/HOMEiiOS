"""WebSocket API consumed by the HOMEii React panel."""

from __future__ import annotations

from typing import Any
from copy import deepcopy

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.auth.permissions.const import POLICY_READ
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .discovery import async_build_installation_model
from .storage import HomeiiStore
from .migration import migrate_lovelace_yaml
from .project_generator import generate_project


def _can_read_entity(connection: websocket_api.ActiveConnection, entity_id: str) -> bool:
    """Apply HA's own entity read permissions before HOMEii sees an entity."""
    user = connection.user
    return bool(
        user.is_admin
        or user.permissions.access_all_entities(POLICY_READ)
        or user.permissions.check_entity(entity_id, POLICY_READ)
    )


def _project_for_user(project: dict[str, Any], connection: websocket_api.ActiveConnection) -> dict[str, Any]:
    """Return a project with entity bindings filtered by HA read permissions."""
    if connection.user.is_admin:
        return deepcopy(project)
    filtered = deepcopy(project)
    for area in filtered.get("areas", {}).values():
        visible_widgets = []
        for widget in area.get("widgets", []):
            widget["entityIds"] = [
                entity_id for entity_id in widget.get("entityIds", [])
                if _can_read_entity(connection, entity_id)
            ]
            if widget["entityIds"] or widget.get("widgetType") == "legacy.lovelace-card":
                visible_widgets.append(widget)
        area["widgets"] = visible_widgets
    return filtered


@websocket_api.websocket_command({vol.Required("type"): "homeii/config/get"})
@websocket_api.async_response
async def ws_get_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Return synchronized configuration to authenticated users."""
    store: HomeiiStore = hass.data[DOMAIN]["store"]
    if connection.user.is_admin:
        connection.send_result(msg["id"], store.data)
        return
    data = store.data
    global_config = deepcopy(data["global"])
    permissions = global_config.pop("permissions", {})
    user_rule = permissions.get("users", {}).get(connection.user.id, {})
    profile_id = user_rule.get("profile", permissions.get("default_profile", "global"))
    profile = deepcopy(data.get("profiles", {}).get(profile_id, data.get("profiles", {}).get("global", {})))
    connection.send_result(msg["id"], {
        "schema_version": data["schema_version"],
        "revision": data["revision"],
        "global": global_config,
        "profile": profile,
        "access": {
            "role": user_rule.get("role", permissions.get("default_role", "viewer")),
            "areas": user_rule.get("areas", []),
            "can_edit": False,
        },
    })


@websocket_api.websocket_command({vol.Required("type"): "homeii/discovery/get"})
@websocket_api.async_response
async def ws_get_discovery(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Return the live Area/Entity installation model."""
    connection.send_result(
        msg["id"],
        async_build_installation_model(hass, lambda entity_id: _can_read_entity(connection, entity_id)),
    )


@websocket_api.websocket_command({
    vol.Required("type"): "homeii/project/preview",
    vol.Optional("project_id", default="home"): str,
    vol.Optional("name", default="My HOMEii"): str,
    vol.Optional("template", default="area-first"): str,
})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_project_preview(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Generate an Area-first project preview; do not persist it."""
    installation = async_build_installation_model(hass)
    try:
        project = generate_project(installation, msg["project_id"], msg["name"], msg["template"])
    except ValueError as err:
        connection.send_error(msg["id"], str(err), "HOMEii project preview failed")
        return
    connection.send_result(msg["id"], project)


@websocket_api.websocket_command({vol.Required("type"): "homeii/project/active"})
@websocket_api.async_response
async def ws_project_active(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Return the active published project visible to this HA user."""
    store: HomeiiStore = hass.data[DOMAIN]["store"]
    project_id = store.data["global"].get("active_project_id")
    project = store.data["projects"].get(project_id) if project_id else None
    connection.send_result(msg["id"], {
        "revision": store.data["revision"],
        "active_project_id": project_id,
        "project": _project_for_user(project, connection) if project else None,
        "can_edit": bool(connection.user.is_admin),
    })


@websocket_api.websocket_command({
    vol.Required("type"): "homeii/project/generate",
    vol.Optional("project_id", default="home"): str,
    vol.Optional("name", default="My HOMEii"): str,
    vol.Optional("template", default="area-first"): str,
    vol.Required("revision"): int,
})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_project_generate(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Generate, publish and activate an Area-first project atomically."""
    store: HomeiiStore = hass.data[DOMAIN]["store"]
    installation = async_build_installation_model(hass)
    try:
        project = generate_project(installation, msg["project_id"], msg["name"], msg["template"])
        result = await store.async_upsert_project(project, msg["revision"], activate=True)
    except ValueError as err:
        connection.send_error(msg["id"], str(err), "HOMEii project was not generated")
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({
    vol.Required("type"): "homeii/config/patch",
    vol.Required("path"): [str],
    vol.Required("value"): object,
    vol.Required("revision"): int,
})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_patch_config(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Patch configuration. Only HA administrators may mutate it."""
    store: HomeiiStore = hass.data[DOMAIN]["store"]
    try:
        result = await store.async_patch(msg["path"], msg["value"], msg["revision"])
    except ValueError as err:
        connection.send_error(msg["id"], str(err), "HOMEii configuration was not updated")
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({
    vol.Required("type"): "homeii/migration/preview",
    vol.Required("yaml"): str,
})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_migration_preview(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Safely preview a Lovelace YAML migration without persisting it."""
    from homeassistant.helpers import area_registry as ar

    areas = ar.async_get(hass).async_list_areas()
    known_areas = [{"area_id": area.id, "name": area.name, "aliases": list(area.aliases)} for area in areas]
    try:
        report = migrate_lovelace_yaml(msg["yaml"], known_areas)
    except ValueError as err:
        connection.send_error(msg["id"], str(err), "Dashboard migration preview failed")
        return
    connection.send_result(msg["id"], {"project": report.project, "warnings": report.warnings, "statistics": report.statistics})


def async_register(hass: HomeAssistant) -> None:
    """Register HOMEii commands."""
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_get_discovery)
    websocket_api.async_register_command(hass, ws_project_preview)
    websocket_api.async_register_command(hass, ws_project_active)
    websocket_api.async_register_command(hass, ws_project_generate)
    websocket_api.async_register_command(hass, ws_patch_config)
    websocket_api.async_register_command(hass, ws_migration_preview)
