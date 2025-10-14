import { Component, createElement } from "react";
import { ElbeChildren, ElbeColorModes, ElbeColorSchemes } from "../../..";
import { AriaRoles } from "./roles";

export type ElbeProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  tooltip?: string;
  flex?: boolean | number;
  typeLabel?: string;
  ariaLabel?: string | null;
  role?: AriaRoles | null;
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

export type ActionElbeProps = ElbeProps & {
  ariaLabel: string | null;
};

export function applyProps(
  typeLabel: string,
  p: ElbeProps,
  classes?: string | null | (string | false | null | undefined)[],
  style?: React.CSSProperties
): { [key: string]: any } {
  if (Array.isArray(classes)) {
    classes = classes.filter((c) => c).join(" ");
  }

  const args: React.HTMLAttributes<HTMLDivElement> = {
    id: p.id,
    onKeyDown: p.onKeyDown,
    onKeyUp: p.onKeyUp,
    onClick: p.onClick,
    onContextMenu: p.onContextMenu,
    onDoubleClick: p.onDoubleClick,
    onMouseDown: p.onMouseDown,
    onMouseUp: p.onMouseUp,
    onMouseEnter: p.onMouseEnter,
    onMouseLeave: p.onMouseLeave,
    onFocus: p.onFocus,
    onBlur: p.onBlur,
    tabIndex: p.tabIndex,
    autoFocus: p.autoFocus,
    role: p.role ?? undefined,
    className: `${classes || ""} ${p.className || ""}`,
    style: {
      ...(style ?? {}),
      ...(p.style ?? {}),
      ...(p.flex ? { flex: p.flex === true ? 1 : p.flex } : {}),
    },
    ...(p.tooltip ? { ["data-tooltip"]: p.tooltip } : {}),
    ["aria-label"]: p.ariaLabel ?? undefined,
    //@ts-ignore
    ["data-type"]:
      p.typeLabel ?? (!!typeLabel ? `elbe_${typeLabel}` : undefined),
  };
  return args;
}

export type ElbeBoxProps = {
  mode?: ElbeColorModes;
  padding?: number;
  margin?: number;
  children: ElbeChildren;
} & ElbeProps;

export class Box extends Component<
  ElbeBoxProps & {
    scheme: ElbeColorSchemes;
  }
> {
  static primary = (p: ElbeBoxProps) =>
    new Box({ ...p, scheme: "primary" }).render();
  static secondary = (p: ElbeBoxProps) =>
    new Box({ ...p, scheme: "secondary" }).render();
  static inverse = (p: ElbeBoxProps) =>
    new Box({ ...p, scheme: "inverse" }).render();

  render() {
    const { scheme, mode, padding, margin, children, ...elbe } = this.props;
    return createElement(
      "div",
      applyProps("box", elbe, [scheme, mode], {
        padding: `${padding}rem`,
        margin: `${margin}rem`,
        ...elbe.style,
      }),
      children
    );
  }
}
