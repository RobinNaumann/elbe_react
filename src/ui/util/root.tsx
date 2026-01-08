import { createRoot } from "react-dom/client";
import { ElbeChild } from "./types";

export const elbeDomElements = {
  elbe_app: { zIndex: 0 },
  elbe_dialog: { zIndex: 1000, position: "absolute" },
  elbe_tooltip: { zIndex: 2000, position: "absolute" },
  elbe_toast: { zIndex: 3000, position: "fixed" },
} as const;

export function getRootElement(id: keyof typeof elbeDomElements): HTMLElement {
  const existing = document.getElementById(id);
  if (existing) return existing;
  console.info(`ELBE: root element '${id}' not found. Creating...`);
  const el = document.createElement("div");
  el.id = id;

  for (const [key, value] of Object.entries(elbeDomElements[id])) {
    el.style[key as any] = value as any;
  }

  el.setAttribute("note", "auto-created by elbe-ui");
  document.body.appendChild(el);
  return el;
}

export function renderElbe(children: ElbeChild) {
  const rootEl = getRootElement("elbe_app");
  createRoot(rootEl).render(children);
}
