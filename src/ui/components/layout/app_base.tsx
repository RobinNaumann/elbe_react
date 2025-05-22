import { VNode } from "preact";
import { NestedArray, Router, useLocation } from "preact-iso";
import { useEffect, useState } from "preact/compat";
import { Box, ElbeChild, HeaderLogos } from "../../..";
import { AppBaseContext } from "./ctx_app_base";
import { Menu, MenuItem } from "./menu";

export type AppBaseProps = HeaderLogos & {
  initial?: string;
  menu: MenuItem[];
  globalActions?: ElbeChild[];
  children: NestedArray<VNode>;
};

/**
 * app base is a layout component that provides a side menu and a content area.
 * it is designed to be used as a base for other components and is
 * used to create a consistent layout for pages. You can also pass global actions
 * that will be displayed in the header of all pages.
 */
export function AppBase(p: AppBaseProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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
      }}
    >
      <Box
        scheme="primary"
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Menu items={p.menu} />
        <div style={{ flex: 1 }}>
          <Router>
            <Redirect path="/" to={`/${p.initial ?? p.menu[0].id}`} />
            {p.children}
          </Router>
        </div>
      </Box>
    </AppBaseContext.Provider>
  );
}

export const Redirect = (p: { path: string; to: string }) => {
  const location = useLocation();

  useEffect(() => {
    location.route(p.to, true);
  }, [p.to]);

  return null; // This component doesn't render anything
};
