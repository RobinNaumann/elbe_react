import React, { useContext } from "preact/compat";

type _ToolbarState = "toolbar" | "overflow" | null;

export const ToolbarContext = React.createContext<_ToolbarState>(null);
export function useToolbar() {
  const ctx = useContext(ToolbarContext);
  return {
    isInToolbar: ctx === "toolbar",
    isInOverflow: ctx === "overflow",
  };
}
