"""HOMEii Dashboard Platform integration."""

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .storage import HomeiiStore
from .websocket import async_register
from .frontend import async_register_frontend, async_unregister_frontend


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up HOMEii from a config entry."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if "store" not in domain_data:
        store = HomeiiStore(hass)
        await store.async_load()
        domain_data.update({"store": store, "entry_id": entry.entry_id})
    if not domain_data.get("websocket_registered"):
        async_register(hass)
        domain_data["websocket_registered"] = True
    await async_register_frontend(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload HOMEii."""
    async_unregister_frontend(hass)
    domain_data = hass.data.get(DOMAIN, {})
    domain_data.pop("store", None)
    domain_data.pop("entry_id", None)
    return True
