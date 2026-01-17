// ToastContext.js
import { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useApp } from "../../app/app_ctxt";
import { IconChild } from "../../components/button/icon_button";
import { ColorSelection } from "../../theme/subthemes/color/colors/colors";
import { ToolbarContext } from "../ctx_toolbar";
import { getRootElement } from "../root";
import { ElbeChildren } from "../types";
import { _Toast } from "./_toast";

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

/**
 * must be inside of a theme provider (such as `WithTheme`)
 * @returns a context provider for toast messages
 */
export function ToastProvider(p: { children: ElbeChildren }) {
  const { _appThemeContext } = useApp({ useFallback: true });
  const { theme } = _appThemeContext.useTheme();

  const rootDOM = useMemo(() => getRootElement("elbe_toast"), []);
  const [toasts, setToasts] = useState<_IdToast[]>([]);

  const [vert, hori] = useMemo(() => {
    const alignment = theme.toast.alignment ?? "bottom_center";
    return alignment.split("_");
  }, [theme.toast.alignment]);

  function addToast(toast: ToastModel) {
    const id = Date.now() + "";
    setToasts([...toasts, { ...toast, id }]);
    if (toast.duration === null && toast.dismissible === true) return;
    setTimeout(
      () => removeToast(id),
      toast.duration ?? theme.toast.duration ?? 3000
    );
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
        <ToolbarContext.Provider value={null}>
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
          </div>
        </ToolbarContext.Provider>,
        rootDOM
      )}
    </ToastContext.Provider>
  );
}
