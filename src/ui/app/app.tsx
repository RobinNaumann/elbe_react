import { useMemo, useState } from "react";
import {
  Box,
  ElbeRoute,
  isMenuRoute,
  MenuItem,
  omit,
  ToastProvider,
  ToastThemeOptions,
  Wouter,
} from "../..";
import { Menu } from "../components/layout/menu";
import { AppConfig, AppContext } from "./app_ctxt";

type AppProps = AppConfig & {
  children: ElbeRoute | ElbeRoute[];
  toast?: ToastThemeOptions;
};

export function ElbeApp(p: AppProps) {
  return <Wouter.Router>{<_App {...p} />}</Wouter.Router>;
}

function _initialLocation() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

function _App(p: AppProps) {
  const [config, setConfig] = useState<AppConfig>(omit(p, "children"));
  const menuItems = useMemo(() => {
    return _extractMenuItems(p.children);
  }, [p.children]);
  const [location, navigate] = Wouter.useLocation();
  const [history, setHistory] = useState<string[]>([_initialLocation()]);

  return (
    <config.themeContext.WithTheme seed={p.themeSeed}>
      <AppContext.Provider
        value={{
          appConfig: config,
          setAppView: (updater) =>
            setConfig({ ...config, view: updater(config.view) }),
          setAppConfig: (updater) => setConfig(updater(config)),
          router: {
            goBack: (steps = 1) => {
              if (history.length === 0) return;
              const targetIndex = Math.max(0, history.length - 1 - steps);
              const target = history[targetIndex];
              setHistory((h) => h.slice(0, targetIndex + 1));
              navigate(target, { replace: true });
            },
            go: (p, replace) => {
              setHistory((h) => {
                if (replace === "all") return [p];
                const repl = Math.max(0, replace ?? 0);
                if (repl === 0) return [...h, p];
                return [...h.slice(0, -repl), p];
              });
              navigate(p, { replace: (replace ?? 0) !== 0 });
            },
            history: history,
            location: location,
          },
        }}
      >
        <ToastProvider options={p.toast}>
          <Box
            typeLabel="app_base"
            scheme="primary"
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {menuItems.length > 0 && <Menu items={menuItems} />}
            <div style={{ flex: 1, width: "0px" }}>
              <Wouter.Switch>{p.children}</Wouter.Switch>
            </div>
          </Box>
        </ToastProvider>
      </AppContext.Provider>
    </config.themeContext.WithTheme>
  );
}

function _extractMenuItems(children: ElbeRoute | ElbeRoute[]): MenuItem[] {
  const childs = Array.isArray(children) ? children : [children];
  const items: MenuItem[] = [];
  for (const child of childs) {
    if (!isMenuRoute(child)) continue;
    items.push(child.props);
  }
  return items;
}
