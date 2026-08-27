import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { HomeOSApp } from "./ui/HomeOSApp";
import type { HomeAssistant } from "./types";
import styles from "./styles.css?inline";
import { registerMdiIconElement } from "./mdiElement";

registerMdiIconElement();

class HOMEiiOSPanel extends HTMLElement {
  private root: Root;
  private _hass?: HomeAssistant;
  private _narrow = false;
  private _route: unknown;
  private _panel: unknown;

  constructor() {
    super();
    const mount = document.createElement("div");
    mount.className = "homeiios-mount";
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styles;
    shadow.append(style, mount);
    this.root = createRoot(mount);
  }

  set hass(value: HomeAssistant) {
    this._hass = value;
    this.renderPanel();
  }

  set narrow(value: boolean) {
    this._narrow = value;
    this.renderPanel();
  }

  set route(value: unknown) {
    this._route = value;
    this.renderPanel();
  }

  set panel(value: unknown) {
    this._panel = value;
    this.renderPanel();
  }

  connectedCallback() {
    // HA may assign these properties before the async module defines this
    // custom element. Re-assign own properties so the class setters receive
    // the values after the browser upgrades the element.
    this.upgradeProperty("hass");
    this.upgradeProperty("narrow");
    this.upgradeProperty("route");
    this.upgradeProperty("panel");
    this.renderPanel();
  }

  disconnectedCallback() {
    this.root.unmount();
  }

  private upgradeProperty(name: "hass" | "narrow" | "route" | "panel") {
    if (!Object.prototype.hasOwnProperty.call(this, name)) return;
    const element = this as unknown as Record<string, unknown>;
    const value = element[name];
    delete element[name];
    element[name] = value;
  }

  private renderPanel() {
    this.root.render(
      <React.StrictMode>
        <HomeOSApp hass={this._hass} narrow={this._narrow} route={this._route} panel={this._panel} />
      </React.StrictMode>
    );
  }
}

if (!customElements.get("homeiios-panel")) {
  customElements.define("homeiios-panel", HOMEiiOSPanel);
}
