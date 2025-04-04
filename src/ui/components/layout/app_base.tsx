import { useState } from "preact/compat";
import { Box, ElbeChild, HeaderLogos } from "../../..";
import { _AppBaseState, AppBaseContext } from "./ctx_app_base";
import { Menu, MenuItem } from "./menu";

export type AppBaseProps = HeaderLogos & {
  initial?: string;
  menu: MenuItem[];
  globalActions?: ElbeChild[];
};

/**
 * app base is a layout component that provides a side menu and a content area.
 * it is designed to be used as a base for other components and is
 * used to create a consistent layout for pages. You can also pass global actions
 * that will be displayed in the header of all pages.
 */
export function AppBase(p: AppBaseProps) {
  const [state, setState] = useState<_AppBaseState>({
    menuSelected: p.initial ?? p.menu[0]?.id ?? null,
    menuOpen: false,
    icons: {
      logo: p.logo,
      logoDark: p.logoDark,
      endLogo: p.endLogo,
      endLogoDark: p.endLogoDark,
    },
    globalActions: p.globalActions ?? [],
  });

  return (
    <AppBaseContext.Provider
      value={{
        ...state,
        setMenuOpen: (b) => setState({ ...state, menuOpen: b }),
        setMenuSelected: (s) => setState({ ...state, menuSelected: s }),
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
          {p.menu.find((i) => i.id == state.menuSelected)?.component ?? <div />}
        </div>
      </Box>
    </AppBaseContext.Provider>
  );
}
