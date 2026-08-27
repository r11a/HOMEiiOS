"""HOMEiiOS HAOS Ingress runtime."""

from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml
from aiohttp import ClientSession, ClientTimeout, web

WWW = Path(os.environ.get("HOMEII_WWW_PATH", "/opt/homeii/www"))
OPTIONS = Path("/data/options.json")
PROJECT = Path("/data/homeiios-project.json")
PUBLISHED_PROJECT = Path("/data/homeiios-published.json")
TOKEN = os.environ.get("SUPERVISOR_TOKEN", "")
CORE_API = "http://supervisor/core/api"
CORE_WS = "ws://supervisor/core/websocket"


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


async def core_ws(commands: list[dict[str, Any]]) -> list[Any]:
    if not TOKEN:
        raise RuntimeError("Supervisor token is unavailable")
    timeout = ClientTimeout(total=20)
    async with ClientSession(timeout=timeout) as session:
        async with session.ws_connect(CORE_WS) as socket:
            hello = await socket.receive_json()
            if hello.get("type") != "auth_required":
                raise RuntimeError("Unexpected Home Assistant WebSocket greeting")
            await socket.send_json({"type": "auth", "access_token": TOKEN})
            authenticated = await socket.receive_json()
            if authenticated.get("type") != "auth_ok":
                raise RuntimeError("Home Assistant WebSocket authentication failed")
            results: list[Any] = []
            for request_id, command in enumerate(commands, 1):
                await socket.send_json({"id": request_id, **command})
                response = await socket.receive_json()
                if not response.get("success"):
                    raise RuntimeError(str(response.get("error", "WebSocket command failed")))
                results.append(response.get("result"))
            return results


async def discovery_model() -> dict[str, Any]:
    areas, devices, entities = await core_ws([
        {"type": "config/area_registry/list"},
        {"type": "config/device_registry/list"},
        {"type": "config/entity_registry/list"},
    ])
    state_status, states = await core_request("GET", "/states")
    if state_status != 200:
        states = []
    state_map = {item.get("entity_id"): item for item in states if isinstance(item, dict)}
    device_areas = {item.get("id"): item.get("area_id") for item in devices if isinstance(item, dict)}
    grouped: dict[str, dict[str, Any]] = {
        area["area_id"]: {"id": area["area_id"], "name": area.get("name") or area["area_id"], "icon": area.get("icon"), "picture": area.get("picture"), "domains": {}, "entities": []}
        for area in areas if isinstance(area, dict) and area.get("area_id")
    }
    for entry in entities:
        if not isinstance(entry, dict) or entry.get("disabled_by"):
            continue
        entity_id = entry.get("entity_id")
        area_id = entry.get("area_id") or device_areas.get(entry.get("device_id"))
        if not entity_id or area_id not in grouped:
            continue
        domain = entity_id.split(".", 1)[0]
        state = state_map.get(entity_id, {})
        model = {
            "entity_id": entity_id,
            "domain": domain,
            "name": state.get("attributes", {}).get("friendly_name") or entry.get("name") or entity_id,
            "device_id": entry.get("device_id"),
            "device_class": entry.get("original_device_class") or state.get("attributes", {}).get("device_class"),
            "state": state.get("state"),
            "supported_features": state.get("attributes", {}).get("supported_features", 0),
        }
        grouped[area_id]["entities"].append(model)
        grouped[area_id]["domains"].setdefault(domain, []).append(entity_id)
    return {"areas": list(grouped.values()), "counts": {"areas": len(grouped), "devices": len(devices), "entities": len(entities)}}


def default_project(discovery: dict[str, Any]) -> dict[str, Any]:
    areas: dict[str, Any] = {}
    priority = ["light", "climate", "media_player", "camera", "cover", "lock", "vacuum", "sensor"]
    for area in discovery.get("areas", []):
        widgets = []
        for domain in priority:
            entity_ids = area.get("domains", {}).get(domain, [])
            if not entity_ids:
                continue
            widgets.append({
                "id": f"{area['id']}-{domain}", "type": domain, "title": domain.replace("_", " ").title(),
                "entityIds": entity_ids, "size": "regular", "order": len(widgets), "visible": True, "settings": {}
            })
        areas[area["id"]] = {"id": area["id"], "name": area["name"], "picture": area.get("picture"), "template": "premium-room", "widgets": widgets}
    return {
        "schemaVersion": 2, "revision": 1, "id": "default", "name": "HOMEiiOS",
        "status": "draft", "updatedAt": "", "theme": {"preset": "granite", "tokens": {}},
        "breakpoints": {"mobile": 480, "tablet": 1024, "desktop": 1440}, "areas": areas,
        "permissions": {"defaultRole": "operator", "users": {}},
    }


def load_project() -> dict[str, Any] | None:
    try:
        value = json.loads(PROJECT.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else None
    except (OSError, json.JSONDecodeError):
        return None


def save_json(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding="utf-8")
    temporary.replace(path)


async def health(_: web.Request) -> web.Response:
    status, config = await core_request("GET", "/config")
    return web.json_response({
        "status": "ok" if status == 200 else "degraded",
        "version": "0.2.0-alpha.1",
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


async def discovery(_: web.Request) -> web.Response:
    try:
        return web.json_response(await discovery_model())
    except Exception as error:
        LOGGER.exception("Area discovery failed")
        return web.json_response({"error": str(error)}, status=502)


async def project_get(_: web.Request) -> web.Response:
    project = load_project()
    if project is None:
        try:
            project = default_project(await discovery_model())
        except Exception:
            LOGGER.exception("Could not generate the initial project")
            project = default_project({"areas": []})
    return web.json_response(project)


async def runtime_project(_: web.Request) -> web.Response:
    try:
        value = json.loads(PUBLISHED_PROJECT.read_text(encoding="utf-8"))
        if not isinstance(value, dict):
            raise ValueError("Invalid published project")
        return web.json_response(value)
    except (OSError, json.JSONDecodeError, ValueError):
        return web.json_response({"published": False}, status=404)


async def project_put(request: web.Request) -> web.Response:
    value = await request.json()
    if not isinstance(value, dict) or value.get("schemaVersion") != 2 or not isinstance(value.get("areas"), dict):
        raise web.HTTPBadRequest(text="Invalid HOMEiiOS project")
    current = load_project()
    expected = int(value.get("revision", 0))
    if current and expected != int(current.get("revision", 0)):
        return web.json_response({"error": "revision_conflict", "currentRevision": current.get("revision")}, status=409)
    value["revision"] = expected + 1
    value["updatedAt"] = datetime.now(timezone.utc).isoformat()
    save_json(PROJECT, value)
    if value.get("status") == "published":
        save_json(PUBLISHED_PROJECT, value)
    return web.json_response(value)


def migration_summary(value: Any) -> dict[str, Any]:
    cards: list[dict[str, Any]] = []
    entities: set[str] = set()
    views = value.get("views", []) if isinstance(value, dict) else []

    def visit(node: Any, path: str = "root") -> None:
        if isinstance(node, dict):
            card_type = node.get("type")
            if isinstance(card_type, str):
                cards.append({"path": path, "type": card_type, "strategy": "native" if card_type in {"tile", "entities", "light", "thermostat", "media-control", "picture-entity", "gauge", "sensor"} else "ha-card-host"})
            entity_id = node.get("entity")
            if isinstance(entity_id, str) and "." in entity_id:
                entities.add(entity_id)
            for key, child in node.items():
                visit(child, f"{path}.{key}")
        elif isinstance(node, list):
            for index, child in enumerate(node):
                visit(child, f"{path}[{index}]")

    visit(value)
    return {"views": len(views), "cards": cards, "entities": sorted(entities), "native": sum(item["strategy"] == "native" for item in cards), "hosted": sum(item["strategy"] == "ha-card-host" for item in cards)}


async def migration_preview(request: web.Request) -> web.Response:
    body = await request.json()
    source = body.get("yaml", "") if isinstance(body, dict) else ""
    if not isinstance(source, str) or not source.strip() or len(source) > 1_000_000:
        raise web.HTTPBadRequest(text="Invalid or oversized YAML")
    try:
        parsed = yaml.safe_load(source)
    except yaml.YAMLError as error:
        return web.json_response({"error": "invalid_yaml", "detail": str(error)}, status=400)
    return web.json_response(migration_summary(parsed))


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


async def frontend_error(request: web.Request) -> web.Response:
    try:
        payload = await request.json()
    except Exception:
        payload = {"message": await request.text()}
    LOGGER.error("Frontend error: %s", json.dumps(payload, ensure_ascii=False)[:2000])
    return web.json_response({"reported": True})


async def index(_: web.Request) -> web.FileResponse:
    return web.FileResponse(WWW / "index.html")


@web.middleware
async def no_cache_boot_files(request: web.Request, handler: Any) -> web.StreamResponse:
    response = await handler(request)
    if request.path == "/" or request.path.endswith(("bridge.js", "homeiios-panel.js", "config.json")):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
    return response


app = web.Application(client_max_size=4 * 1024 * 1024, middlewares=[no_cache_boot_files])
app.router.add_get("/api/health", health)
app.router.add_get("/api/bootstrap", bootstrap)
app.router.add_get("/api/discovery", discovery)
app.router.add_get("/api/project", project_get)
app.router.add_get("/api/runtime-project", runtime_project)
app.router.add_put("/api/project", project_put)
app.router.add_post("/api/migration/preview", migration_preview)
app.router.add_post("/api/services/{domain}/{service}", service)
app.router.add_post("/api/frontend-error", frontend_error)
app.router.add_get("/", index)
app.router.add_static("/assets", WWW, show_index=False)

if __name__ == "__main__":
    LOGGER.info("Starting HOMEiiOS Alpha on Ingress port 8099")
    web.run_app(app, host="0.0.0.0", port=8099, access_log=LOGGER)
