import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join } from "node:path";

const root = new URL("../rootfs/opt/homeii/www/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" };
const states = [
  { entity_id: "sensor.ims_temperature", state: "24.5", attributes: { friendly_name: "Temperature" } },
  { entity_id: "group.all_lights", state: "off", attributes: { friendly_name: "All lights" } }
];

createServer(async (request, response) => {
  if (request.url === "/api/bootstrap") {
    response.setHeader("content-type", "application/json");
    response.end(JSON.stringify({ user: { id: "smoke", name: "Smoke Admin", is_admin: true }, states, refresh_seconds: 30 }));
    return;
  }
  if (request.url === "/api/frontend-error" && request.method === "POST") {
    let body = "";
    request.on("data", (chunk) => body += chunk);
    request.on("end", () => { console.error(`FRONTEND_ERROR ${body}`); response.end('{"reported":true}'); });
    return;
  }
  const rawPath = request.url === "/" ? "index.html" : request.url.replace(/^\/assets\//, "").split("?", 1)[0].replace(/^\//, "");
  const path = join(root, rawPath);
  try {
    const info = await stat(path);
    if (!info.isFile()) throw new Error("not a file");
    response.setHeader("content-type", types[extname(path)] || "application/octet-stream");
    createReadStream(path).pipe(response);
  } catch {
    response.statusCode = 404;
    response.end("Not found");
  }
}).listen(8877, "127.0.0.1", () => console.log("HOMEiiOS smoke server http://127.0.0.1:8877"));

