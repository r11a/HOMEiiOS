import React from "react";
import { createRoot } from "react-dom/client";
import { StudioApp } from "./studio/StudioApp";
import styles from "./studio/studio.css?inline";

class HomeiiStudio extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const mount = document.createElement("div");
    style.textContent = styles;
    shadow.append(style, mount);
    createRoot(mount).render(<StudioApp />);
  }
}
if (!customElements.get("homeii-studio")) customElements.define("homeii-studio", HomeiiStudio);
