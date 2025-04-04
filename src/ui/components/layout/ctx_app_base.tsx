import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { ElbeChild } from "../../util/util";
import { HeaderLogos } from "./header";

export interface _AppBaseState {
  menuSelected: string | null;
  menuOpen: boolean;
  icons: HeaderLogos;
  globalActions: ElbeChild[];
}

interface _AppBaseControl extends _AppBaseState {
  setMenuOpen: (open: boolean) => void;
  setMenuSelected: (selected: string) => void;
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
