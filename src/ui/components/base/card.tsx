import { useMemo } from "react";
import {
  ColorSelection,
  ElbeChildren,
  ElbeChildrenProps,
  ElbeProps,
  ElbeStyleProps,
  _Box,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { WithTooltip } from "../tooltip";

export function elevatedShadow(dark: boolean) {
  return `0px 0px .625rem -.125rem ${dark ? "#ffffff60" : "#00000060"}`;
}

export function Card({
  mode,
  scheme,
  kind,
  manner,
  state,
  padding = 1,
  margin = 0,
  onTap,
  onLongTap,
  frosted,
  bordered,
  elevated,
  sharp,
  overflow,
  children,
  ...elbe
}: {
  mode?: ColorSelection.Modes;
  scheme?: ColorSelection.Schemes;
  kind?: ColorSelection.Kinds;
  manner?: ColorSelection.Manners;
  state?: ColorSelection.States;
  padding?: number;
  margin?: number;
  onTap?: (() => void) | null;
  onLongTap?: (() => void) | null;
  frosted?: boolean;
  elevated?: boolean;
  bordered?: boolean;
  sharp?: boolean;
  overflow?: "auto" | "hidden" | "scroll";
  children?: ElbeChildren;
} & ElbeProps &
  ElbeStyleProps &
  ElbeChildrenProps) {
  const { _appThemeContext } = useApp();
  const { theme } = _appThemeContext.useTheme();

  const isBordered = useMemo(() => {
    return (bordered ?? false) || theme.color.isContrast;
  }, [bordered, theme.color.isContrast]);

  return (
    <WithTooltip tooltip={elbe.tooltip}>
      <_Box
        mode={mode}
        scheme={scheme}
        kind={kind}
        manner={manner}
        padding={padding}
        margin={margin}
        state={state}
        className={elbe.className}
        flex={elbe.flex}
        elevated={elevated}
        frosted={frosted}
        style={{
          overflow: overflow,
          borderRadius: sharp ? 0 : `${theme.geometry.radius}rem`,
          borderStyle: isBordered ? "solid" : undefined,
          borderWidth: isBordered
            ? `${theme.geometry.borderWidth}rem`
            : undefined,
          borderColor: isBordered
            ? "var(--elbe-context-color-border, transparent)"
            : undefined,

          opacity: onTap === null ? 0.5 : 1,
          ...(elbe.style ?? {}),
        }}
        native={{
          ...(onTap !== undefined
            ? {
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onTap === null) return;
                  onTap?.();
                },
              }
            : {}),
          ...(onLongTap !== undefined
            ? {
                onContextMenu: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onLongTap === null) return;
                  onLongTap?.();
                },
              }
            : {}),
          ...(elbe.native ?? {}),
        }}
      >
        {children}
      </_Box>
    </WithTooltip>
  );
}
