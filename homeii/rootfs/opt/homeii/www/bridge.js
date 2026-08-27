const panel = document.querySelector("homeiios-panel");
const boot = document.querySelector("#boot");
let currentStates = {};

if (!customElements.get("ha-icon")) {
  customElements.define("ha-icon", class extends HTMLElement {
    connectedCallback() {
      this.setAttribute("aria-hidden", "true");
      this.style.cssText = "display:inline-grid;place-items:center;width:1em;height:1em;font-size:1em";
      this.textContent = "◆";
    }
  });
}

const api = async (path, options = {}) => {
  const response = await fetch(path, { cache: "no-store", ...options });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response.json();
};

const toStateMap = (states) => Object.fromEntries(states.map((state) => [state.entity_id, state]));

const installState = (payload) => {
  currentStates = toStateMap(payload.states || []);
  panel.hass = {
    user: payload.user,
    states: currentStates,
    callService: async (domain, service, data = {}, target = {}) => {
      await api(`./api/services/${domain}/${service}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...target })
      });
      await refresh();
    },
    callWS: async () => { throw new Error("Area registry bridge is not enabled in this Alpha"); },
    navigate: (path) => { window.location.href = path; }
  };
  panel.narrow = matchMedia("(max-width: 760px)").matches;
};

const refresh = async () => {
  const payload = await api("./api/bootstrap");
  installState(payload);
  boot.hidden = true;
  return payload.refresh_seconds || 2;
};

try {
  await import("./assets/homeiios-panel.js");
  const seconds = await refresh();
  setInterval(() => refresh().catch(console.error), seconds * 1000);
  addEventListener("resize", () => { panel.narrow = matchMedia("(max-width: 760px)").matches; });
} catch (error) {
  boot.textContent = `HOMEiiOS לא הצליח להתחבר: ${error.message}`;
  console.error(error);
}

