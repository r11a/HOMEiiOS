"""HOMEii resource authorization. HA permissions remain the upper bound."""

from __future__ import annotations

from dataclasses import dataclass
from fnmatch import fnmatchcase
from typing import Any, Literal

Action = Literal["view", "control", "edit", "admin"]


@dataclass(frozen=True)
class AccessRequest:
    """One authorization decision."""

    user_id: str
    is_ha_admin: bool
    action: Action
    resources: tuple[str, ...]


def _principal_matches(rule: dict[str, Any], request: AccessRequest) -> bool:
    users = rule.get("users", [])
    return "*" in users or request.user_id in users


def _resource_matches(rule: dict[str, Any], request: AccessRequest) -> bool:
    patterns = rule.get("resources", [])
    return any(fnmatchcase(resource, pattern) for resource in request.resources for pattern in patterns)


def is_allowed(policy: dict[str, Any], request: AccessRequest) -> bool:
    """Evaluate deny-first HOMEii policy. HA admins always administer HOMEii."""
    if request.is_ha_admin:
        return True
    matching = [
        rule for rule in policy.get("rules", [])
        if request.action in rule.get("actions", [])
        and _principal_matches(rule, request)
        and _resource_matches(rule, request)
    ]
    if any(rule.get("effect") == "deny" for rule in matching):
        return False
    if any(rule.get("effect") == "allow" for rule in matching):
        return True
    defaults = policy.get("defaults", {})
    return request.action in defaults.get("actions", ["view"])
