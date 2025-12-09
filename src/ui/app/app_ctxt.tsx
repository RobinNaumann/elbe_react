import { createContext, useContext } from "react";
import { HeaderLogos } from "../components/layout/header";
import { ElbeThemeContext } from "../theme/theme_context";
import { ElbeChild, ElbeChildren, int } from "../util/types";
import { throwError, tryOrNull } from "../util/util";

export interface AppConfig {
  /**
   * @private this field is only to be used within elbe components.
   */
  themeContext: ElbeThemeContext;
  themeSeed?: Partial<
    Parameters<AppConfig["themeContext"]["WithTheme"]>[0]["seed"]
  >;
  view: {
    menuOpen: boolean;
    icons: HeaderLogos;
    globalActions: ElbeChild[];
    footer: ElbeChildren | null;
  };
}

export interface AppState {
  appConfig: AppConfig;
  setAppConfig: (updater: (config: AppConfig) => AppConfig) => void;
  setAppView: (updater: (view: AppConfig["view"]) => AppConfig["view"]) => void;
  router: {
    go: (path: string, replace?: int | "all") => void;
    goBack: (steps?: number) => void;
    history: string[];
    location: string;
  };
}

export const AppContext = createContext<AppState | null>(null);

export function useApp() {
  return (
    tryOrNull(() => useContext(AppContext)) ??
    throwError(
      "useApp must be used within an ElbeApp context. try using useMaybeApp()"
    )
  );
}

export function useMaybeApp(): AppState | null {
  return tryOrNull(() => useContext(AppContext));
}
