import React from "react";
import { createRoot, type Root } from "react-dom/client";
import type { HomeAssistant } from "./types";
import { RuntimeApp } from "./runtime/RuntimeApp";
import styles from "./runtime/runtime.css?inline";
import widgetStyles from "./runtime/widgets.css?inline";
import signatureStyles from "./runtime/signature.css?inline";
import premiumWidgetStyles from "./runtime/widgets-premium.css?inline";
import { StudioApp } from "./studio/StudioApp";
import studioStyles from "./studio/studio.css?inline";
import designSystem from "./studio/design-system.css?inline";
import editorStyles from "./studio/editor.css?inline";
import quickAddStyles from "./studio/quick-add.css?inline";

class HomeiiPanel extends HTMLElement {
  private root: Root;
  private _hass?: HomeAssistant;
  private _narrow = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const mount = document.createElement("div");
    style.textContent = `${styles}\n${widgetStyles}\n${premiumWidgetStyles}\n${signatureStyles}`;
    shadow.append(style, mount);
    this.root = createRoot(mount);
  }

  set hass(value: HomeAssistant) { this._hass = value; this.renderPanel(); }
  set narrow(value: boolean) { this._narrow = value; this.renderPanel(); }
  connectedCallback() { this.upgradeProperty("hass"); this.upgradeProperty("narrow"); this.renderPanel(); }
  disconnectedCallback() { this.root.unmount(); }

  private upgradeProperty(name: "hass" | "narrow") {
    if (!Object.prototype.hasOwnProperty.call(this, name)) return;
    const element = this as unknown as Record<string, unknown>;
    const value = element[name];
    delete element[name];
    element[name] = value;
  }

  private renderPanel() { this.root.render(<RuntimeApp hass={this._hass} narrow={this._narrow} />); }
}

if (!customElements.get("homeii-panel")) customElements.define("homeii-panel", HomeiiPanel);

class HomeiiStudioPanel extends HTMLElement {
  private root: Root;
  private _hass?: HomeAssistant;
  constructor() { super(); const shadow=this.attachShadow({mode:"open"}); const style=document.createElement("style"); const mount=document.createElement("div"); style.textContent=`${studioStyles}\n${designSystem}\n${editorStyles}\n${quickAddStyles}`; shadow.append(style,mount); this.root=createRoot(mount); }
  set hass(value: HomeAssistant) { this._hass=value; this.renderPanel(); }
  connectedCallback() { this.renderPanel(); }
  disconnectedCallback() { this.root.unmount(); }
  private renderPanel() { this.root.render(<StudioApp hass={this._hass}/>); }
}
if (!customElements.get("homeii-studio-panel")) customElements.define("homeii-studio-panel", HomeiiStudioPanel);
