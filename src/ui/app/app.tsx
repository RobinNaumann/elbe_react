import { useMemo, useState } from "react";
import {
  Box,
  DialogsProvider,
  ElbeChild,
  ElbeRoute,
  ElbeThemeConfig,
  ElbeThemeContext,
  ElbeThemeData,
  isMenuRoute,
  MenuItem,
  omit,
  ToastProvider,
  Wouter,
} from "../..";
import { Menu } from "../components/layout/menu";
import { unwrapFragments } from "../util/_util";
import { AppConfig, AppContext } from "./app_ctxt";

type _AppThemeConfig = {
  themeContext: ElbeThemeContext;
  themeSeed?: Partial<
    Parameters<_AppThemeConfig["themeContext"]["WithTheme"]>[0]["seed"]
  >;
  themeSelector?: (
    config: ElbeThemeConfig<ElbeThemeData>
  ) => Partial<ElbeThemeConfig<ElbeThemeData>>;
};

type _AppProps = AppConfig & _AppThemeConfig;
type AppProps = _AppProps & { children?: ElbeRoute | ElbeRoute[] };

/** The main application component that sets up the application context, theme, and routing.
 * Render this component at the root of your application to initialize Elbe UI features:
 *
 * ```tsx
 * renderElbe(<MyApp/>);
 * ```
 *
 * ### Properties:
 * - `title` (string | undefined): The title of the application, which will be set as the document title.
 * - `themeSeed` (Partial<ElbeThemeData["seed"]> | undefined): An optional seed to customize the theme.
 * - `themeContext` (ElbeThemeContext): The theme context to be used for theming the application.
 * - `themeSelector` (function | undefined): An optional function to further customize the theme based on the current theme configuration.
 * - `routerConfig` (object | undefined): Configuration options for the router, such as basePath.
 * - `noGlobalStyles` (boolean | undefined): If true, global styles will not be applied to the document. Useful if you have multiple Elbe apps on the same page.
 * - `children` (ElbeRoute | ElbeRoute[] | undefined): The route components to be rendered within the application. Pass
 *   `MenuRoute` components here to define the application's routes and menu items. You may also wrap the menu routes Fragments (<></>).
 * - `globalActions` (ElbeChild[] | undefined): An array of global action components to be displayed in the application header.
 * - `footer` (ElbeChild | undefined): A footer component to be displayed at the bottom of the application.
 *
 * ### Context:
 * This component provides the application context to its children, including routing and theming information.
 * Access the context using the `useApp` hook from `elbe-ui`:
 * ```tsx
 * import { useApp } from "elbe-ui";
 * const app = useApp();
 * ```
 *
 * ### Usage:
 * ```tsx
 * <ElbeApp
 *  title="My App"
 *  themeSeed={{ color: { primary: { scheme: "dark" } } }}
 *  themeContext={myThemeContext}
 *  routerConfig={{ basePath: "/app" }}>
 *   <Route path="/home">
 *     <HomePage />
 *   </Route>
 *   <Route path="/about">
 *     <AboutPage />
 *   </Route>
 * </ElbeApp>
 * ```
 */
export function ElbeApp(p: AppProps) {
  useMemo(() => {
    if (p.title) document.title = p.title;
  }, [p.title]);

  const trueBase = useMemo(() => {
    const path = p.routerConfig?.basePath ?? "/";
    return path === "/" ? undefined : path;
  }, [p.routerConfig?.basePath]);

  return (
    <p.themeContext.WithTheme seed={p.themeSeed}>
      <Wouter.Router base={trueBase}>
        {
          <_App
            config={omit(
              p,
              "children",
              "themeContext",
              "themeSeed",
              "themeSelector"
            )}
            themeContext={p.themeContext}
            themeSelector={p.themeSelector}
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
  themeSelector?: _AppThemeConfig["themeSelector"];
  themeContext: ElbeThemeContext;
  children?: ElbeRoute | ElbeRoute[];
}) {
  const theme = p.themeContext.useTheme();

  const themeSelected = theme.useWith(p.themeSelector ?? (() => ({})), [
    p.config,
    p.themeSelector,
  ]);

  useMemo(() => {
    if (p.config.noGlobalStyles) return;
    // apply global background of html and body elements
    const bg = themeSelected.theme.color.currentColor.back.asCss();
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }, [themeSelected, p.config.noGlobalStyles]);

  const [location, navigate] = Wouter.useLocation();
  const [history, setHistory] = useState<string[]>([_initialLocation()]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { children, menuItems } = useMemo(() => {
    const childsOrFrags = Array.isArray(p.children)
      ? p.children
      : p.children
      ? [p.children]
      : [];
    const children = unwrapFragments(childsOrFrags);
    const menuItems = _extractMenuItems(children);
    return { children, menuItems };
  }, [p.children]);

  return (
    <p.themeContext.WithTheme theme={themeSelected}>
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
          menu:
            menuItems.length === 0
              ? undefined
              : {
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
                <Wouter.Switch>{children}</Wouter.Switch>
              </div>
            </Box>
          </DialogsProvider>
        </ToastProvider>
      </AppContext.Provider>
    </p.themeContext.WithTheme>
  );
}

function _extractMenuItems(children: (ElbeRoute | ElbeChild)[]): MenuItem[] {
  if (!children) return [];

  const items: MenuItem[] = [];
  for (const child of children) {
    if (!isMenuRoute(child)) continue;
    items.push(child.props);
  }
  return items;
}
