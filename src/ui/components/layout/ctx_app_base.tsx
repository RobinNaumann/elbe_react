import { createContext, useContext } from "react";
import { ElbeChild, int } from "../../util/types";
import { HeaderLogos } from "./header";

export interface _AppBaseState {
  menuOpen: boolean;
  icons: HeaderLogos;
  globalActions: ElbeChild[];
  router: {
    go: (path: string, replace?: int | "all") => void;
    goBack: (steps?: number) => void;
    history: string[];
    location: string;
  };
}

export interface _AppBaseControl extends _AppBaseState {
  setMenuOpen: (open: boolean) => void;
}
export const AppBaseContext = createContext<_AppBaseControl | null>(null);

export function useAppBase() {
  const ctx = useContext(AppBaseContext);
  if (ctx) return ctx;
  throw new Error(
    "useAppBase must be used within an AppBase. try using maybeAppBase()"
  );
}

export function maybeAppBase(): _AppBaseControl | null {
  return useContext(AppBaseContext) ?? null;
}
