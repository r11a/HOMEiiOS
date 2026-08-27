"""HOMEiiOS HAOS Ingress runtime."""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any

from aiohttp import ClientSession, ClientTimeout, web

WWW = Path("/opt/homeii/www")
OPTIONS = Path("/data/options.json")
TOKEN = os.environ.get("SUPERVISOR_TOKEN", "")
CORE_API = "http://supervisor/core/api"


def load_options() -> dict[str, Any]:
    try:
        value = json.loads(OPTIONS.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except (OSError, json.JSONDecodeError):
        return {}


logging.basicConfig(
    level=getattr(logging, str(load_options().get("log_level", "info")).upper(), logging.INFO),
    format="%(asctime)s %(levelname)s %(message)s",
)
LOGGER = logging.getLogger("homeiios")


def api_headers() -> dict[str, str]:
    return {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}


async def core_request(method: str, path: str, payload: Any = None) -> tuple[int, Any]:
    if not TOKEN:
        return 503, {"error": "Supervisor token is unavailable"}
    timeout = ClientTimeout(total=15)
    async with ClientSession(timeout=timeout) as session:
        async with session.request(method, f"{CORE_API}{path}", headers=api_headers(), json=payload) as response:
            try:
                body = await response.json()
            except Exception:
                body = {"error": await response.text()}
            return response.status, body


async def health(_: web.Request) -> web.Response:
    status, config = await core_request("GET", "/config")
    return web.json_response({
        "status": "ok" if status == 200 else "degraded",
        "version": "0.1.0-alpha.1",
        "home_assistant": status == 200,
        "location_name": config.get("location_name") if isinstance(config, dict) else None,
    })


async def bootstrap(request: web.Request) -> web.Response:
    status, states = await core_request("GET", "/states")
    if status != 200:
        return web.json_response({"error": "Home Assistant API unavailable"}, status=status)
    return web.json_response({
        "user": {
            "id": request.headers.get("X-Remote-User-Id", "homeiios-admin"),
            "name": request.headers.get("X-Remote-User-Name", "HOMEiiOS Admin"),
            "is_admin": True,
        },
        "states": states,
        "refresh_seconds": load_options().get("refresh_seconds", 2),
    })


async def service(request: web.Request) -> web.Response:
    domain = request.match_info["domain"]
    action = request.match_info["service"]
    if not domain.replace("_", "").isalnum() or not action.replace("_", "").isalnum():
        raise web.HTTPBadRequest(text="Invalid service")
    payload = await request.json()
    if not isinstance(payload, dict):
        raise web.HTTPBadRequest(text="Invalid payload")
    status, result = await core_request("POST", f"/services/{domain}/{action}", payload)
    return web.json_response(result, status=status)


async def index(_: web.Request) -> web.FileResponse:
    return web.FileResponse(WWW / "index.html")


app = web.Application(client_max_size=4 * 1024 * 1024)
app.router.add_get("/api/health", health)
app.router.add_get("/api/bootstrap", bootstrap)
app.router.add_post("/api/services/{domain}/{service}", service)
app.router.add_get("/", index)
app.router.add_static("/assets", WWW, show_index=False)

LOGGER.info("Starting HOMEiiOS Alpha on Ingress port 8099")
web.run_app(app, host="0.0.0.0", port=8099, access_log=LOGGER)

