"""Minimal HOMEii HAOS control-plane service."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from aiohttp import web

DATA_DIR = Path("/data")
STATE_PATH = DATA_DIR / "homeii-platform.json"
OPTIONS_PATH = DATA_DIR / "options.json"
SCHEMA_VERSION = 1


def load_json(path: Path, fallback: dict[str, Any]) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else fallback
    except (OSError, json.JSONDecodeError):
        return fallback


def save_json(path: Path, value: dict[str, Any]) -> None:
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")
    temporary.replace(path)


def state() -> dict[str, Any]:
    return load_json(STATE_PATH, {"schema_version": SCHEMA_VERSION, "revision": 1, "projects": {}, "assets": {}})


def ingress_user(request: web.Request) -> str:
    return request.headers.get("X-Remote-User-Id", "unknown")


async def health(request: web.Request) -> web.Response:
    current = state()
    options = load_json(OPTIONS_PATH, {})
    return web.json_response({
        "status": "ok",
        "version": os.getenv("BUILD_VERSION", "0.1.0"),
        "schema_version": current.get("schema_version"),
        "revision": current.get("revision"),
        "channel": options.get("channel", "stable"),
        "supervisor": bool(os.getenv("SUPERVISOR_TOKEN")),
        "user": ingress_user(request),
    })


async def get_state(request: web.Request) -> web.Response:
    return web.json_response(state())


async def index(_: web.Request) -> web.Response:
    return web.Response(text="""<!doctype html><html lang=\"he\" dir=\"rtl\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>body{margin:0;background:#11151d;color:#f6f7f9;font:16px system-ui;display:grid;place-items:center;min-height:100vh}.card{padding:32px;border:1px solid #ffffff20;border-radius:28px;background:#ffffff0c;backdrop-filter:blur(24px);text-align:center}b{font-size:32px}span{display:block;color:#aeb7c5;margin-top:8px}</style><div class=\"card\"><b>HOMEii Studio</b><span>Control Plane is running</span></div></html>""", content_type="text/html")


app = web.Application(client_max_size=32 * 1024 * 1024)
app.router.add_get("/", index)
app.router.add_get("/api/health", health)
# Configuration mutations are intentionally not exposed through Ingress.
# They must pass through the integration WebSocket API and HA's admin check.
web.run_app(app, host="0.0.0.0", port=8099)
