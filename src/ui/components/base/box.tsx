import { Component, createElement } from "react";
import { ColorSelection, ElbeChildren } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { elevatedShadow } from "../../util/_util";
import { AriaRoles } from "./roles";

export const styleColorFromContext: React.CSSProperties = {
  backgroundColor: "var(--elbe-context-color-back)",
  color: "var(--elbe-context-color-front)",
  borderColor: "var(--elbe-context-color-border)",
};

export const styleBorderFromContext: React.CSSProperties = {
  borderTopColor: "var(--elbe-context-color-border)",
  borderRightColor: "var(--elbe-context-color-border)",
  borderBottomColor: "var(--elbe-context-color-border)",
  borderLeftColor: "var(--elbe-context-color-border)",

  borderTopStyle: "solid",
  borderRightStyle: "solid",
  borderBottomStyle: "solid",
  borderLeftStyle: "solid",

  borderTopWidth: "var(--elbe-context-geometry-border-width)",
  borderRightWidth: "var(--elbe-context-geometry-border-width)",
  borderBottomWidth: "var(--elbe-context-geometry-border-width)",
  borderLeftWidth: "var(--elbe-context-geometry-border-width)",

  borderRadius: "var(--elbe-context-geometry-border-radius)",
};

export type ElbeProps = {
  id?: string;
  tooltip?: string;
  flex?: boolean | number;
  typeLabel?: string;
  ariaLabel?: string | null;
  role?: AriaRoles | null;
  style?: React.CSSProperties;
  className?: string | string[];
  native?: {
    //className?: string;

    // keyboard handlers
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onKeyUp?: (e: React.KeyboardEvent) => void;
    // mouse handlers
    onClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onDoubleClick?: (e: React.MouseEvent) => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onMouseUp?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    // other handlers
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    // other props
    tabIndex?: number;
    autoFocus?: boolean;
  };
};

export type ElbeActionProps = ElbeProps & {
  ariaLabel: string | null;
};

export type ElbeStyleProps = {
  style?: React.CSSProperties;
};

export type ElbeChildrenProps = {
  children?: ElbeChildren;
};

export function applyProps(
  typeLabel: string,
  p: ElbeProps,
  classes?: string | null | (string | false | null | undefined)[],
  style?: React.CSSProperties
): { [key: string]: any } {
  const eNonNative = { ...p, native: undefined };
  const eNative = p.native ?? {};

  if (Array.isArray(classes)) {
    classes = classes.filter((c) => c).join(" ");
  }

  const args: React.HTMLAttributes<HTMLDivElement> = {
    id: eNonNative.id,
    ...eNative,
    role: eNonNative.role ?? undefined,
    className: `${classes || ""} ${eNonNative?.className ?? ""}`,
    style: {
      ...(style ?? {}),
      ...(eNonNative?.style ?? {}),
      ...(eNonNative.flex
        ? { flex: eNonNative.flex === true ? 1 : eNonNative.flex }
        : {}),
    },
    ...(eNonNative.tooltip ? { ["data-tooltip"]: eNonNative.tooltip } : {}),
    ["aria-label"]: eNonNative.ariaLabel ?? undefined,
    //@ts-ignore
    ["data-type"]:
      eNonNative.typeLabel ?? (!!typeLabel ? `elbe_${typeLabel}` : undefined),
  };
  return args;
}

export type ElbeBoxProps = ElbeProps &
  ElbeStyleProps &
  ElbeChildrenProps & {
    mode?: ColorSelection.Modes;
    kind?: ColorSelection.Kinds;
    manner?: ColorSelection.Manners;
    state?: ColorSelection.States;

    padding?: number;
    margin?: number;

    frosted?: boolean;
    elevated?: boolean;
  };

export class Box extends Component<
  ElbeBoxProps &
    ElbeStyleProps & {
      scheme?: ColorSelection.Schemes;
    }
> {
  static primary = (p: ElbeBoxProps) =>
    createElement(Box, { ...p, scheme: "primary" });
  static secondary = (p: ElbeBoxProps) =>
    createElement(Box, { ...p, scheme: "secondary" });
  static inverse = (p: ElbeBoxProps) =>
    createElement(Box, { ...p, scheme: "inverse" });

  render() {
    return <_Box {...this.props} />;
  }
}

/**
 * @private
 * @param p
 * @returns
 */
export function _Box(
  p: ElbeBoxProps & {
    scheme?: ColorSelection.Schemes;
  }
) {
  const { _appThemeContext } = useApp({ useFallback: true });
  const usedTheme = _appThemeContext.useTheme().useWith(
    ({ color }) => {
      return {
        color: {
          ...color,
          selection: {
            ...color.selection,
            scheme: p.scheme ?? color.selection.scheme ?? "primary",
            mode: p.mode ?? color.selection.mode ?? "light",
            kind: p.kind ?? color.selection.kind ?? "plain",
            manner: p.manner ?? color.selection.manner ?? "plain",
            state: p.state ?? color.selection.state ?? "neutral",
          },
        },
      };
    },
    [p.scheme, p.mode, p.kind, p.manner, p.state]
  );

  const {
    scheme,
    mode,
    padding,
    margin,
    frosted,
    elevated,
    children,
    ...elbe
  } = p;

  return (
    <_appThemeContext.WithTheme theme={usedTheme}>
      <div
        {...applyProps("box", elbe, [], {
          padding: `${padding}rem`,
          margin: `${margin}rem`,
          backgroundColor: frosted
            ? usedTheme.theme.color.currentColor.back.withAlpha(0.4).asCss()
            : usedTheme.theme.color.currentColor.back.asCss(),
          boxShadow: elevated
            ? elevatedShadow(usedTheme.theme.color.isDark)
            : undefined,
          backdropFilter: frosted ? "blur(.5rem)" : undefined,

          transition: usedTheme.theme.motion.reduced
            ? undefined
            : "background 0.3s ease",
          ...elbe.style,
        })}
      >
        {children}
      </div>
    </_appThemeContext.WithTheme>
  );
}
