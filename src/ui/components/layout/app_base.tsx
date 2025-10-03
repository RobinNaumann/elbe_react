import { useMemo, useState } from "preact/compat";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import {
  Box,
  ElbeChild,
  ElbeRoute,
  HeaderLogos,
  isMenuRoute,
  MenuItem,
  wouter,
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
  return (
    <Router hook={p.hashBasedRouting ? useHashLocation : undefined}>
      <_AppBase {...p} />
    </Router>
  );
}
function _AppBase(p: AppBaseProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = useMemo(() => {
    return _extractMenuItems(p.children);
  }, [p.children]);
  const [location, navigate] = wouter.useLocation();

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
        go: (p, replace) => navigate(p, { replace: replace ?? false }),
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
          <wouter.Switch>{p.children}</wouter.Switch>
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
