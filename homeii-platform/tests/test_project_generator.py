"""Area-first generator contract tests."""

import importlib.util
from pathlib import Path
import sys

MODULE_PATH = Path(__file__).parents[1] / "custom_components/homeii/project_generator.py"
SPEC = importlib.util.spec_from_file_location("homeii_project_generator", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


INSTALLATION = {
    "areas": [{
        "area_id": "living_room",
        "name": "Living Room",
        "picture": "/local/living.jpg",
        "entities": [
            {"entity_id": "light.ceiling", "domain": "light", "device_class": None},
            {"entity_id": "light.lamp", "domain": "light", "device_class": None},
            {"entity_id": "climate.living", "domain": "climate", "device_class": None},
            {"entity_id": "sensor.living_temperature", "domain": "sensor", "device_class": "temperature"},
            {"entity_id": "event.future_domain", "domain": "event", "device_class": None},
        ],
    }]
}


def test_generates_schema_shaped_area_project() -> None:
    project = MODULE.generate_project(INSTALLATION, "Main Home", "Premium Home")
    assert project["id"] == "main-home"
    assert project["name"] == "Premium Home"
    assert project["theme"]["preset"] == "granite"
    assert project["permissions"]["defaultRole"] == "viewer"
    area = project["areas"]["living_room"]
    assert area["picture"] == "/local/living.jpg"
    assert [widget["widgetType"] for widget in area["widgets"]] == [
        "light.collection", "climate.thermostat", "sensor.temperature", "entity.generic"
    ]
    assert area["widgets"][0]["entityIds"] == ["light.ceiling", "light.lamp"]


def test_generator_is_deterministic() -> None:
    first = MODULE.generate_project(INSTALLATION)
    second = MODULE.generate_project(INSTALLATION)
    assert first == second


def test_unknown_template_is_rejected() -> None:
    try:
        MODULE.generate_project(INSTALLATION, template="unknown")
    except ValueError as err:
        assert str(err) == "unsupported_template"
    else:
        raise AssertionError("Unsupported template was accepted")
