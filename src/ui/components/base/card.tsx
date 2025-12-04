import {
  ColorSelection,
  ElbeChildren,
  ElbeChildrenProps,
  ElbeProps,
  ElbeStyleProps,
  _Box,
} from "../../..";
import { useApp } from "../../app/app_ctxt";

export const elevatedShadow = "0 0 15px rgba(0,0,0,.2)";

export function Card({
  mode,
  scheme,
  kind,
  manner,
  padding = 1,
  margin = 0,
  onTap,
  onLongTap,
  frosted,
  bordered,
  elevated,
  sharp,
  disabled,
  overflow,
  children,
  ...elbe
}: {
  mode?: ColorSelection.Modes;
  scheme?: ColorSelection.Schemes;
  kind?: ColorSelection.Kinds;
  manner?: ColorSelection.Manners;
  padding?: number;
  margin?: number;
  onTap?: () => void;
  onLongTap?: () => void;
  frosted?: boolean;
  elevated?: boolean;
  bordered?: boolean;
  sharp?: boolean;
  disabled?: boolean;
  overflow?: "auto" | "hidden" | "scroll";
  children?: ElbeChildren;
} & ElbeProps &
  ElbeStyleProps &
  ElbeChildrenProps) {
  const { appConfig } = useApp();
  const { theme } = appConfig.themeContext.useTheme();

  return (
    <_Box
      mode={mode}
      scheme={scheme}
      kind={kind}
      manner={manner}
      padding={padding}
      style={{
        padding: `${padding}rem`,
        margin: `${margin}rem`,
        overflow: overflow,
        boxShadow: elevated ? elevatedShadow : undefined,
        borderRadius: sharp ? 0 : `${theme.geometry.radius}rem`,
        border: bordered
          ? `${theme.geometry.borderWidth}rem solid ${
              theme.color.currentColor.border?.asCss() ?? "transparent"
            }`
          : undefined,
        backdropFilter: frosted ? "blur(10px)" : undefined,
        opacity: disabled ? 0.5 : 1,
        ...(elbe.style ?? {}),
      }}
      native={{
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          onTap?.();
        },
        onContextMenu: (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          onLongTap?.();
        },
        ...(elbe.native ?? {}),
      }}
    >
      {children}
    </_Box>
  );
}
