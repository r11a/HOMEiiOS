const versionResponse = await fetch(`/local/homeiios-app/version.json?t=${Date.now()}`, {
  cache: "no-store"
});

if (!versionResponse.ok) {
  throw new Error(`HOMEiiOS version manifest unavailable: ${versionResponse.status}`);
}

const { version } = await versionResponse.json();
await import(`/local/homeiios-app/homeiios-panel.js?v=${encodeURIComponent(version)}`);
