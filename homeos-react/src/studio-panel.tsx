import React from "react";
import { createRoot } from "react-dom/client";
import { StudioApp } from "./studio/StudioApp";
import styles from "./studio/studio.css?inline";
import designSystem from "./studio/design-system.css?inline";
import editorStyles from "./studio/editor.css?inline";
import quickAddStyles from "./studio/quick-add.css?inline";

class HomeiiStudio extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const mount = document.createElement("div");
    style.textContent = `${styles}\n${designSystem}\n${editorStyles}\n${quickAddStyles}`;
    shadow.append(style, mount);
    createRoot(mount).render(<StudioApp />);
  }
}
if (!customElements.get("homeii-studio")) customElements.define("homeii-studio", HomeiiStudio);
