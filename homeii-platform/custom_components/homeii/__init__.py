"""HOMEii Dashboard Platform integration."""

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .storage import HomeiiStore
from .websocket import async_register


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up HOMEii from a config entry."""
    if DOMAIN not in hass.data:
        store = HomeiiStore(hass)
        await store.async_load()
        hass.data[DOMAIN] = {"store": store, "entry_id": entry.entry_id}
        async_register(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload HOMEii."""
    hass.data.pop(DOMAIN, None)
    return True
