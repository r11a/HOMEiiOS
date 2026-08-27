import { mdiIcons } from "./generated/mdi-icons";

class HOMEiiMdiIcon extends HTMLElement {
  static get observedAttributes() { return ["icon"]; }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const icon = this.getAttribute("icon") || "mdi:circle-outline";
    const path = mdiIcons[icon] || mdiIcons["mdi:circle-outline"];
    this.setAttribute("role", this.hasAttribute("aria-label") ? "img" : "presentation");
    this.style.display = "inline-grid";
    this.style.placeItems = "center";
    this.style.width = "var(--mdc-icon-size, 1.5em)";
    this.style.height = "var(--mdc-icon-size, 1.5em)";
    this.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path fill="currentColor" d="${path}"></path></svg>`;
  }
}

export function registerMdiIconElement() {
  if (!customElements.get("ha-icon")) customElements.define("ha-icon", HOMEiiMdiIcon);
}

