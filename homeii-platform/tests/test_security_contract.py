"""Static security contract tests that do not require a HA runtime."""

from pathlib import Path

ROOT = Path(__file__).parents[1]


def test_configuration_patch_requires_ha_admin() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    marker = '@websocket_api.websocket_command({\n    vol.Required("type"): "homeii/config/patch"'
    start = source.index(marker)
    handler = source[start:source.index("def async_register", start)]
    assert "@websocket_api.require_admin" in handler


def test_ingress_does_not_expose_configuration_writes() -> None:
    source = (ROOT / "homeii/rootfs/opt/homeii/server.py").read_text(encoding="utf-8")
    assert 'app.router.add_put("/api/state"' not in source
    assert 'app.router.add_patch("/api/state"' not in source
    assert 'app.router.add_post("/api/state"' not in source


def test_regular_user_config_is_redacted() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    assert 'global_config.pop("permissions", {})' in source
    assert '"can_edit": False' in source


def test_discovery_is_filtered_by_ha_entity_permissions() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    assert "permissions.check_entity(entity_id, POLICY_READ)" in source
    assert "async_build_installation_model(hass, lambda entity_id: _can_read_entity" in source


def test_project_preview_requires_ha_admin() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    marker = 'vol.Required("type"): "homeii/project/preview"'
    start = source.index(marker)
    handler = source[start:source.index("async def ws_patch_config", start)]
    assert "@websocket_api.require_admin" in handler


def test_project_generation_requires_ha_admin_and_revision() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    marker = 'vol.Required("type"): "homeii/project/generate"'
    start = source.index(marker)
    handler = source[start:source.index("async def ws_patch_config", start)]
    assert "@websocket_api.require_admin" in handler
    assert 'vol.Required("revision"): int' in handler
    assert "async_upsert_project" in handler


def test_published_project_is_filtered_for_regular_users() -> None:
    source = (ROOT / "custom_components/homeii/websocket.py").read_text(encoding="utf-8")
    assert "_project_for_user(project, connection)" in source
    assert "if _can_read_entity(connection, entity_id)" in source
