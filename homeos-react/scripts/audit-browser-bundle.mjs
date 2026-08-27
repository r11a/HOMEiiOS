import { readFileSync } from "node:fs";

const path = new URL("../dist/homeiios-panel.js", import.meta.url);
const source = readFileSync(path, "utf8");
const forbidden = [
  [/process\.env/g, "process.env"],
  [/\brequire\s*\(/g, "require()"],
  [/\bmodule\.exports\b/g, "module.exports"],
  [/\b__dirname\b/g, "__dirname"],
  [/\b__filename\b/g, "__filename"]
];

const failures = forbidden.filter(([pattern]) => pattern.test(source)).map(([, label]) => label);
if (failures.length) {
  console.error(`Browser bundle contains Node-only globals: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("Browser bundle audit passed");

