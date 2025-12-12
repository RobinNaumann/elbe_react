import { createRoot } from "react-dom/client";
import { ElbeChild } from "./types";

export const elbeDomElements = {
  elbe_app: { zindex: 0 },
  elbe_dialog: { zindex: 1000 },
  elbe_tooltip: { zindex: 2000 },
  elbe_toast: { zindex: 3000 },
} as const;

export function getRootElement(id: keyof typeof elbeDomElements): HTMLElement {
  const existing = document.getElementById(id);
  if (existing) return existing;
  console.info(`ELBE: root element '${id}' not found. Creating...`);
  const el = document.createElement("div");
  el.id = id;
  el.style.zIndex = `${elbeDomElements[id].zindex}`;
  el.setAttribute("note", "auto-created by elbe-ui");
  document.body.appendChild(el);
  return el;
}

export function renderElbe(children: ElbeChild) {
  const rootEl = getRootElement("elbe_app");
  createRoot(rootEl).render(children);
}
