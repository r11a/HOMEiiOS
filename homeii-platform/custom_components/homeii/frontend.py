"""Register the self-contained HOMEii panel in Home Assistant."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

PANEL_PATH = "homeii"
PANEL_URL = "/homeii_static/homeii-panel.js"
PANEL_FILE = Path(__file__).parent / "frontend" / "homeii-panel.js"


async def async_register_frontend(hass: HomeAssistant) -> None:
    """Serve and register the HOMEii native custom panel."""
    if not PANEL_FILE.exists():
        raise RuntimeError("HOMEii frontend bundle is missing")
    try:
        await hass.http.async_register_static_paths([
            StaticPathConfig(PANEL_URL, str(PANEL_FILE), cache_headers=False),
        ])
    except RuntimeError:
        # Static paths live for the HA process lifetime; an integration reload
        # only needs to re-register the sidebar panel.
        pass
    if frontend.async_panel_exists(hass, PANEL_PATH):
        frontend.async_remove_panel(hass, PANEL_PATH)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_PATH,
        webcomponent_name="homeii-panel",
        sidebar_title="HOMEii",
        sidebar_icon="mdi:view-dashboard-variant",
        module_url=PANEL_URL,
        require_admin=False,
        handle_safe_area=True,
        config={"runtime": "native", "version": 1},
    )


def async_unregister_frontend(hass: HomeAssistant) -> None:
    """Remove the sidebar panel when the integration unloads."""
    if frontend.async_panel_exists(hass, PANEL_PATH):
        frontend.async_remove_panel(hass, PANEL_PATH)
