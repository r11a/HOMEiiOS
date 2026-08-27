"""Migration engine behavior tests."""

import importlib.util
from pathlib import Path
import sys

MODULE_PATH = Path(__file__).parents[1] / "custom_components/homeii/migration.py"
SPEC = importlib.util.spec_from_file_location("homeii_migration", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


def test_standard_and_custom_cards_are_mapped_and_unknown_is_preserved() -> None:
    source = """
title: Existing home
views:
  - title: Living Room
    path: living
    cards:
      - type: thermostat
        entity: climate.living
      - type: custom:advanced-camera-card
        cameras:
          - camera_entity: camera.entrance
      - type: custom:vendor-unknown
        entity: sensor.anything
"""
    report = MODULE.migrate_lovelace_yaml(source, [{"area_id": "living_room", "name": "Living Room", "aliases": []}])
    widgets = report.project["areas"]["living_room"]["widgets"]
    assert [item["widgetType"] for item in widgets] == ["climate.thermostat", "camera.advanced", "legacy.lovelace-card"]
    assert widgets[0]["entityIds"] == ["climate.living"]
    assert report.statistics["legacy"] == 1


def test_templates_remain_data_and_are_not_executed() -> None:
    source = """
views:
  - title: Test
    cards:
      - type: custom:button-card
        entity: light.test
        name: '[[[ return states["sensor.secret"].state ]]]'
"""
    report = MODULE.migrate_lovelace_yaml(source, [])
    raw = report.project["unassignedViews"][0]["widgets"][0]["settings"]["source"]
    assert raw["name"].startswith("[[[")


def test_oversized_yaml_is_rejected() -> None:
    try:
        MODULE.migrate_lovelace_yaml("x" * 2_000_001, [])
    except ValueError as err:
        assert str(err) == "yaml_too_large"
    else:
        raise AssertionError("Oversized YAML was accepted")
