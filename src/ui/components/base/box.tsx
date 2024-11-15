import { Component, h } from "preact";
import type { ElbeColorModes, ElbeColorSchemes } from "../../theme/colors";
import type { ElbeChildren } from "../../util/util";

export type ElbeProps = {
  id?: string;
  class?: string;
  style?: React.CSSProperties;
  tooltip?: string;
};

export function applyProps(
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
    style: { ...(style ?? {}), ...(p.style ?? {}) },
    ...(p.tooltip ? { ["data-tooltip"]: p.tooltip } : {}),
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
      applyProps(elbe, [scheme, mode], {
        padding: `${padding}rem`,
        margin: `${margin}rem`,
        ...elbe.style,
      }),
      children
    );
  }
}
