# HOMEiiOS Alpha — installation test

1. Install the app and wait for the build to complete.
2. Start it and enable **Start on boot** and **Watchdog**.
3. Open **HOMEiiOS** from the sidebar or choose **Open Web UI**.
4. Verify that the connection indicator is green and entity states update.
5. Test one non-critical light before testing scenes, climate or security.

## Scope of this Alpha

- Live entity states are read through the Home Assistant API.
- Card actions call Home Assistant services through a guarded same-origin API.
- The Ingress panel is administrator-only.
- The visual editor still stores device-local preferences in the browser.
- Area-registry synchronization and central profile persistence remain the next
  integration milestone.

## Support diagnostics

Open `/api/health` below the app's Ingress URL or inspect the app log. Never
publish logs containing private entity names or internal URLs.

