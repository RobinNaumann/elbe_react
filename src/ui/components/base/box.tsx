import { Component, h } from "preact";
import { ElbeChildren, ElbeColorModes, ElbeColorSchemes } from "../../..";
import { AriaRoles } from "./roles";

export type ElbeProps = {
  id?: string;
  class?: string;
  style?: React.CSSProperties;
  tooltip?: string;
  flex?: boolean | number;
  typeLabel?: string;
  ariaLabel?: string | null;
  role?: AriaRoles | null;
};

export type ActionElbeProps = ElbeProps & {
  ariaLabel: string | null;
};

export function applyProps(
  typeLabel: string,
  p: ElbeProps,
  classes?: string | null | (string | false | null | undefined)[],
  style?: React.CSSProperties
) {
  if (Array.isArray(classes)) {
    classes = classes.filter((c) => c).join(" ");
  }
  return {
    id: p.id,
    class: `${classes || ""} ${p.class || ""}`,
    style: {
      ...(style ?? {}),
      ...(p.style ?? {}),
      ...(p.flex ? { flex: p.flex === true ? 1 : p.flex } : {}),
    },
    ...(p.tooltip ? { ["data-tooltip"]: p.tooltip } : {}),
    ["aria-label"]: p.ariaLabel ?? undefined,
    ariaLabel: p.ariaLabel ?? null,
    ["data-type"]:
      p.typeLabel ?? (!!typeLabel ? `elbe_${typeLabel}` : undefined),
  };
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
    return h(
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
