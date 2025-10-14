import { createContext, useContext } from "react";

type _ToolbarState = "toolbar" | "overflow" | null;

export const ToolbarContext = createContext<_ToolbarState>(null);
export function useToolbar() {
  const ctx = useContext(ToolbarContext);
  return {
    isInToolbar: ctx === "toolbar",
    isInOverflow: ctx === "overflow",
  };
}
