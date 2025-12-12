// ToastContext.js
import { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { IconChild } from "../../components/button/icon_button";
import { ColorSelection } from "../../theme/subthemes/color/colors/colors";
import { getRootElement } from "../root";
import { ElbeChildren } from "../types";
import { _Toast } from "./_toast";

export type ToastThemeOptions = {
  alignment?:
    | "top_start"
    | "top_center"
    | "top_end"
    | "bottom_start"
    | "bottom_center"
    | "bottom_end";
  duration?: number;
};

/**
 * Options for showing a toast notification.
 * If you set `duration` to null, the toast will not auto-dismiss.
 * You have to set `dismissible` to true to allow manual dismissal in that case.
 */
export type ToastOptions = {
  icon?: IconChild;
  kind?: ColorSelection.KindsAlert;
  duration?: number | null;
  dismissible?: boolean;
};

export type ToastModel = ToastOptions & {
  message: string;
};

export type ToastCtrl = {
  showToast: (message: string, options?: ToastOptions) => void;
};

type _IdToast = ToastModel & {
  id: string;
};

const ToastContext = createContext<ToastCtrl>({
  showToast: () => console.error("toast context was not initialized"),
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider(p: {
  children: ElbeChildren;
  options?: ToastThemeOptions;
}) {
  const rootDOM = useMemo(() => getRootElement("elbe_toast"), []);
  const [toasts, setToasts] = useState<_IdToast[]>([]);

  const _align = (p.options?.alignment ?? "bottom_center").split("_");
  const vert = _align.at(0);
  const hori = _align.at(1);

  function addToast(toast: ToastModel) {
    const id = Date.now() + "";
    setToasts([...toasts, { ...toast, id }]);
    if (toast.duration === null && toast.dismissible === true) return;
    setTimeout(() => removeToast(id), toast.duration ?? 3000);
  }

  function removeToast(id: string) {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider
      value={{
        showToast: (message, options) =>
          addToast({ ...(options ?? {}), message }),
      }}
    >
      {p.children}
      {ReactDOM.createPortal(
        <div
          className="elbe"
          style={{
            background: "transparent",
            position: "fixed",
            zIndex: 2001,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: vert === "top" ? "start" : "end",
            alignItems: hori,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: ".5rem",

              flexDirection: vert === "top" ? "column-reverse" : "column",
              alignItems: "stretch",
              width: "40rem",
              margin: "1rem 2rem",
            }}
          >
            {toasts.map((toast) => (
              <_Toast
                key={toast.id}
                model={toast}
                onClose={
                  toast.dismissible ? () => removeToast(toast.id) : undefined
                }
              />
            ))}
          </div>
        </div>,
        rootDOM
      )}
    </ToastContext.Provider>
  );
}
