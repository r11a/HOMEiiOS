"""UI setup flow for HOMEii."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries

from .const import DOMAIN


class HomeiiConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Configure one HOMEii platform instance."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        """Create the singleton HOMEii entry."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        if user_input is not None:
            return self.async_create_entry(title=user_input["name"], data={"name": user_input["name"]})
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({vol.Required("name", default="HOMEii"): str}),
        )
