"""Static persistence contract tests independent from a HA runtime."""

from pathlib import Path

ROOT = Path(__file__).parents[1]


def test_project_and_activation_are_saved_in_one_store_write() -> None:
    source = (ROOT / "custom_components/homeii/storage.py").read_text(encoding="utf-8")
    start = source.index("async def async_upsert_project")
    end = source.index("@staticmethod", start)
    method = source[start:end]
    assert 'next_value["projects"][project_id]' in method
    assert 'next_value["global"]["active_project_id"]' in method
    assert method.count("await self._store.async_save") == 1
    assert 'if expected_revision != self.data["revision"]' in method
