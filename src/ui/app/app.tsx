import { useMemo, useState } from "react";
import {
  Box,
  DialogsProvider,
  ElbeRoute,
  ElbeThemeContext,
  isMenuRoute,
  MenuItem,
  omit,
  ToastProvider,
  Wouter,
} from "../..";
import { Menu } from "../components/layout/menu";
import { AppConfig, AppContext } from "./app_ctxt";

type _AppThemeConfig = {
  themeContext: ElbeThemeContext;
  themeSeed?: Partial<
    Parameters<_AppThemeConfig["themeContext"]["WithTheme"]>[0]["seed"]
  >;
};

type _AppProps = AppConfig & _AppThemeConfig;
type AppProps = _AppProps & { children: ElbeRoute | ElbeRoute[] };

export function ElbeApp(p: AppProps) {
  useMemo(() => {
    if (p.title) document.title = p.title;
  }, [p.title]);

  return (
    <p.themeContext.WithTheme seed={p.themeSeed}>
      <Wouter.Router base={p.routerConfig?.basePath}>
        {
          <_App
            config={omit(p, "children", "themeContext", "themeSeed")}
            themeContext={p.themeContext}
            children={p.children}
          />
        }
      </Wouter.Router>
    </p.themeContext.WithTheme>
  );
}

function _initialLocation() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

function _App(p: {
  config: AppConfig;
  themeContext: ElbeThemeContext;
  children: ElbeRoute | ElbeRoute[];
}) {
  const menuItems = useMemo(() => {
    return _extractMenuItems(p.children);
  }, [p.children]);
  const [location, navigate] = Wouter.useLocation();
  const [history, setHistory] = useState<string[]>([_initialLocation()]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        appConfig: p.config,
        _appThemeContext: p.themeContext,
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
        menu: {
          isOpen: menuOpen,
          setOpen: (s: boolean) => setMenuOpen(s),
        },
      }}
    >
      <ToastProvider>
        <DialogsProvider>
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
        </DialogsProvider>
      </ToastProvider>
    </AppContext.Provider>
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
