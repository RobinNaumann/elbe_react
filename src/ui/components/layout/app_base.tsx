import { useMemo, useState } from "react";
import {
  Box,
  ElbeChild,
  ElbeRoute,
  HeaderLogos,
  isMenuRoute,
  MenuItem,
  Wouter,
} from "../../..";
import { AppBaseContext } from "./ctx_app_base";
import { Menu } from "./menu";

export type AppBaseProps = HeaderLogos & {
  globalActions?: ElbeChild[];
  children: ElbeRoute | ElbeRoute[];
  hashBasedRouting?: boolean;
};

/**
 * app base is a layout component that provides an optional side menu and a content area.
 * it is designed to be used as a base for other components and is
 * used to create a consistent layout for pages. You can also pass global actions
 * that will be displayed in the header of all pages.
 *
 * Provide `wouter.Route` or `MenuRoute` components as children to define the routes and menu items.
 */

export function AppBase(p: AppBaseProps) {
  return <Wouter.Router>{<_AppBase {...p} />}</Wouter.Router>;
}

function _initialLocation() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

function _AppBase(p: AppBaseProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = useMemo(() => {
    return _extractMenuItems(p.children);
  }, [p.children]);
  const [location, navigate] = Wouter.useLocation();
  const [history, setHistory] = useState<string[]>([_initialLocation()]);

  return (
    <AppBaseContext.Provider
      value={{
        menuOpen: menuOpen,
        icons: {
          logo: p.logo,
          logoDark: p.logoDark,
          endLogo: p.endLogo,
          endLogoDark: p.endLogoDark,
        },
        globalActions: p.globalActions ?? [],
        setMenuOpen: (b) => setMenuOpen(b),
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
    </AppBaseContext.Provider>
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
