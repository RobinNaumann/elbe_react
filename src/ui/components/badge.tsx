import React from "react";
import { useApp } from "../app/app_ctxt";
import { ColorSelection } from "../theme/subthemes/color/colors/colors";
import type { ElbeChild, ElbeChildren } from "../util/types";
import type { ElbeProps } from "./base/box";

export type BadgeProps = {
  count?: number;
  label?: string;
  child?: ElbeChild;
  hidden?: boolean;
  children?: ElbeChildren;
} & ElbeProps;

export function TestBadge(p: BadgeProps) {
  return new Badge({ ...p, kind: "accent" });
}

export class Badge extends React.Component<
  BadgeProps & { kind: ColorSelection.Kinds }
> {
  constructor(props: BadgeProps & { kind: ColorSelection.Kinds }) {
    super(props);
  }

  static accent(p: BadgeProps) {
    return <Badge {...p} kind="accent" />;
  }

  static error(p: BadgeProps) {
    return <Badge {...p} kind="error" />;
  }

  static warning(p: BadgeProps) {
    return <Badge {...p} kind="warning" />;
  }

  static success(p: BadgeProps) {
    return <Badge {...p} kind="success" />;
  }

  static info(p: BadgeProps) {
    return <Badge {...p} kind="info" />;
  }

  render() {
    return <_Badge {...this.props} />;
  }
}

function _Badge(p: BadgeProps & { kind: ColorSelection.Kinds }) {
  const { appConfig } = useApp();
  const theme = appConfig.themeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          kind: p.kind ?? "accent",
          manner: "major",
        },
      },
    }),
    [p.kind]
  );

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {p.child}
      {p.children}
      <div
        style={{
          position: "absolute",
          top: "-0.25rem",
          right: "-0.25rem",
          minWidth: "1.5rem",
          minHeight: "1.5rem",
          padding: "0rem .4rem",
          borderRadius: "3rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          visibility: p.hidden ? "hidden" : "visible",
          backgroundColor: theme.theme.color.currentColor.back.asCss(),
          color: theme.theme.color.currentColor.front.asCss(),
          ...p.style,
        }}
      >
        {p.label ?? p.count}
      </div>
    </div>
  );
}
