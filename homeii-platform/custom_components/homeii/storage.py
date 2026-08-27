"""Versioned persistent storage for HOMEii configuration."""

from __future__ import annotations

from copy import deepcopy
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import CONFIG_SCHEMA_VERSION, DEFAULT_PROFILE_ID, STORAGE_KEY, STORAGE_VERSION


def default_data() -> dict[str, Any]:
    """Return a new default HOMEii document."""
    return {
        "schema_version": CONFIG_SCHEMA_VERSION,
        "revision": 1,
        "global": {
            "brand": {"name": "HOMEii", "logo": "", "language": "he", "direction": "rtl"},
            "theme": {"preset": "granite", "mode": "system", "tokens": {}},
            "navigation": {"areas": [], "special_views": []},
            "area_overrides": {},
            "entity_overrides": {},
            "permissions": {"default_role": "viewer", "users": {}},
        },
        "profiles": {
            DEFAULT_PROFILE_ID: {"inherits": None, "overrides": {}},
        },
        "devices": {},
        "projects": {},
    }


class HomeiiStore:
    """Own and validate the synchronized HOMEii configuration."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store[dict[str, Any]](hass, STORAGE_VERSION, STORAGE_KEY)
        self.data = default_data()

    async def async_load(self) -> None:
        """Load persisted data."""
        stored = await self._store.async_load()
        if isinstance(stored, dict):
            self.data = self._normalize(stored)

    async def async_replace(self, value: dict[str, Any], expected_revision: int) -> dict[str, Any]:
        """Atomically replace configuration with optimistic concurrency."""
        if expected_revision != self.data["revision"]:
            raise ValueError("revision_conflict")
        next_value = self._normalize(deepcopy(value))
        next_value["revision"] = expected_revision + 1
        self.data = next_value
        await self._store.async_save(self.data)
        return deepcopy(self.data)

    async def async_patch(self, path: list[str], value: Any, expected_revision: int) -> dict[str, Any]:
        """Patch one configuration path atomically."""
        if expected_revision != self.data["revision"]:
            raise ValueError("revision_conflict")
        if not path or any(not isinstance(part, str) or not part for part in path):
            raise ValueError("invalid_path")
        next_value = deepcopy(self.data)
        cursor: dict[str, Any] = next_value
        for part in path[:-1]:
            child = cursor.setdefault(part, {})
            if not isinstance(child, dict):
                raise ValueError("invalid_path")
            cursor = child
        cursor[path[-1]] = value
        next_value["revision"] += 1
        self.data = self._normalize(next_value)
        await self._store.async_save(self.data)
        return deepcopy(self.data)

    @staticmethod
    def _normalize(value: dict[str, Any]) -> dict[str, Any]:
        """Apply safe defaults without discarding future keys."""
        base = default_data()
        base.update(value)
        base["schema_version"] = CONFIG_SCHEMA_VERSION
        base["revision"] = max(1, int(base.get("revision", 1)))
        for key in ("global", "profiles", "devices", "projects"):
            if not isinstance(base.get(key), dict):
                base[key] = default_data()[key]
        return base
