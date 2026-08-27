"""Authorization precedence and scope tests."""

import importlib.util
from pathlib import Path
import sys

PATH = Path(__file__).parents[1] / "custom_components/homeii/permissions.py"
SPEC = importlib.util.spec_from_file_location("homeii_permissions", PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def request(user: str, action: str, *resources: str, admin: bool = False):
    return MODULE.AccessRequest(user, admin, action, resources)


POLICY = {
    "defaults": {"actions": ["view"]},
    "rules": [
        {"effect": "allow", "users": ["child"], "actions": ["control"], "resources": ["area:bedroom", "entity:light.bed"]},
        {"effect": "deny", "users": ["child"], "actions": ["control"], "resources": ["domain:lock", "entity:lock.*"]},
    ],
}


def test_admin_always_manages_homeii():
    assert MODULE.is_allowed(POLICY, request("admin", "admin", "project:home", admin=True))


def test_allow_can_be_scoped_to_area_and_entity():
    assert MODULE.is_allowed(POLICY, request("child", "control", "area:bedroom", "entity:light.bed"))
    assert not MODULE.is_allowed(POLICY, request("child", "control", "area:living", "entity:light.living"))


def test_deny_wins_over_allow():
    assert not MODULE.is_allowed(POLICY, request("child", "control", "area:bedroom", "domain:lock", "entity:lock.bedroom"))


def test_default_view_only():
    assert MODULE.is_allowed(POLICY, request("guest", "view", "dashboard:main"))
    assert not MODULE.is_allowed(POLICY, request("guest", "edit", "dashboard:main"))
