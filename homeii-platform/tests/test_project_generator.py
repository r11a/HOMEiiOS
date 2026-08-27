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
            {"entity_id": "sensor.router_rssi", "domain": "sensor", "device_class": "signal_strength"},
            {"entity_id": "update.router_firmware", "domain": "update", "device_class": None},
            {"entity_id": "event.future_domain", "domain": "event", "device_class": None},
            {"entity_id": "light.inherited", "domain": "light", "device_class": None, "assignment_source": "device"},
        ],
    }]
}


def test_generates_schema_shaped_area_project() -> None:
    project = MODULE.generate_project(INSTALLATION, "Main Home", "Premium Home")
    assert project["id"] == "main-home"
    assert project["name"] == "Premium Home"
    assert project["theme"]["preset"] == "rich-brown"
    assert project["template"] == "homeii-signature"
    assert project["permissions"]["defaultRole"] == "viewer"
    area = project["areas"]["living_room"]
    assert area["picture"] == "/local/living.jpg"
    assert [widget["widgetType"] for widget in area["widgets"]] == [
        "light.collection", "climate.thermostat", "sensor.temperature"
    ]
    assert area["widgets"][0]["entityIds"] == ["light.ceiling", "light.lamp"]
    assert area["titleMode"] == "auto"
    assert area["categories"][0] == "overview"


def test_generator_filters_diagnostics_and_caps_collections() -> None:
    entities = [
        {"entity_id": f"light.fixture_{index:02}", "domain": "light", "device_class": None, "available": True}
        for index in range(20)
    ]
    entities.extend([
        {"entity_id": "sensor.device_temperature", "domain": "sensor", "device_class": "temperature", "available": True},
        {"entity_id": "sensor.room_temperature", "domain": "sensor", "device_class": "temperature", "available": True},
        {"entity_id": "button.restart", "domain": "button", "device_class": None, "available": True},
    ])
    project = MODULE.generate_project({"areas": [{"area_id": "room", "name": "Room", "entities": entities}]})
    widgets = project["areas"]["room"]["widgets"]
    light_widget = next(widget for widget in widgets if widget["widgetType"] == "light.collection")
    sensor_widgets = [widget for widget in widgets if widget["widgetType"].startswith("sensor.")]
    assert len(light_widget["entityIds"]) == 12
    assert [item["entityIds"][0] for item in sensor_widgets] == ["sensor.room_temperature"]


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


def test_refresh_preserves_studio_overrides_and_exclusions() -> None:
    generated = MODULE.generate_project(INSTALLATION)
    existing = MODULE.generate_project(INSTALLATION)
    existing["brand"]["name"] = "Private Residence"
    existing["theme"]["tokens"]["accent"] = "#ff0000"
    area = existing["areas"]["living_room"]
    area["titleMode"] = "custom"
    area["title"] = "הסלון שלנו"
    area["excludedWidgetIds"] = ["living_room-light-collection"]
    merged = MODULE.merge_generated_project(generated, existing)
    assert merged["brand"]["name"] == "Private Residence"
    assert merged["theme"]["tokens"]["accent"] == "#ff0000"
    assert merged["areas"]["living_room"]["title"] == "הסלון שלנו"
    assert all(widget["id"] != "living_room-light-collection" for widget in merged["areas"]["living_room"]["widgets"])
