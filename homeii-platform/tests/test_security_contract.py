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
