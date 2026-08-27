import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const addonRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wwwRoot = resolve(addonRoot, "rootfs/opt/homeii/www");
const indexHtml = readFileSync(resolve(wwwRoot, "index.html"), "utf8");
const serverSource = readFileSync(resolve(addonRoot, "rootfs/opt/homeii/server.py"), "utf8");

assert.match(
  indexHtml,
  /src=["']\.\/assets\/homeii-studio\.js["']/,
  "index.html must load the Studio bundle through the Ingress-safe /assets route",
);
assert.ok(
  existsSync(resolve(wwwRoot, "homeii-studio.js")),
  "The HOMEii Studio bundle must be present in the add-on image",
);
assert.match(
  serverSource,
  /add_static\(\s*["']\/assets["']\s*,\s*WWW/,
  "server.py must expose the packaged frontend through /assets",
);

console.log("HOMEiiOS add-on package verification passed");
