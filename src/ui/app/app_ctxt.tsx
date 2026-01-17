import { createContext, useContext } from "react";
import { HeaderLogos } from "../components/layout/header";
import { ElbeThemeContext, makeThemeContext } from "../theme/theme_context";
import { ElbeChild, ElbeChildren, int } from "../util/types";
import { throwError, tryOrNull } from "../util/util";

export type AppConfig = {
  title?: string;
  branding?: HeaderLogos;
  globalActions?: ElbeChild[];
  footer?: ElbeChildren | null;
  routerConfig?: {
    basePath?: string;
  };
  /** If true, global styles will not be applied. This can be useful for embedding Elbe in an existing app with its own styles. */
  noGlobalStyles?: boolean;
};

type _MenuState = {
  isOpen: boolean;
  setOpen: (s: boolean) => void;
};

type _RouterState = {
  go: (path: string, replace?: int | "all") => void;
  goBack: (steps?: number) => void;
  history: string[];
  location: string;
};

export interface AppState {
  appConfig: AppConfig;
  router: _RouterState;
  menu?: _MenuState;
  /**
   * @private this field is only to be used within elbe components.
   */
  _appThemeContext: ElbeThemeContext;
}

export const AppContext = createContext<AppState | null>(null);

const _fallbackAppContext: AppState = {
  appConfig: {},
  router: {
    go: () => {},
    goBack: () => {},
    history: [],
    location: "/",
  },
  _appThemeContext: makeThemeContext({}),
};

export function useApp({ useFallback = false } = {}): AppState {
  return (
    tryOrNull(() => useContext(AppContext)) ??
    (useFallback
      ? _fallbackAppContext
      : throwError(
          "useApp must be used within an ElbeApp context. try using useMaybeApp() or useApp({ useFallback: true }) instead."
        ))
  );
}

export function useMaybeApp(): AppState | null {
  return tryOrNull(() => useContext(AppContext));
}
