import { createContext, useContext } from "react";
import { HeaderLogos } from "../components/layout/header";
import { ElbeThemeContext } from "../theme/theme_context";
import { ElbeChild, ElbeChildren, int } from "../util/types";
import { throwError, tryOrNull } from "../util/util";

export type AppConfig = {
  title?: string;
  icons?: HeaderLogos;
  globalActions?: ElbeChild[];
  footer?: ElbeChildren | null;
  routerConfig?: {
    basePath?: string;
  };
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
  menu: _MenuState;
  /**
   * @private this field is only to be used within elbe components.
   */
  _appThemeContext: ElbeThemeContext;
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
