import { h } from "preact";
import type { ElbeColorModes, ElbeColorThemes } from "../color_theme";
import type { ElbeChildren } from "../util/util";

export type ElbeProps = {
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
    class: `${classes || ""} ${p.class || ""}`,
    style: { ...(style ?? {}), ...(p.style ?? {}) },
    ...(p.tooltip ? { ["data-tooltip"]: p.tooltip } : {}),
  };
}

export function Box({
  mode,
  scheme = "primary",
  padding = 0,
  margin = 0,
  children,
  ...elbe
}: {
  mode?: ElbeColorModes;
  scheme?: ElbeColorThemes;
  padding?: number;
  margin?: number;
  children: ElbeChildren;
} & ElbeProps) {
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
