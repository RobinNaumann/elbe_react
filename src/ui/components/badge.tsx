import React from "preact/compat";
import type { ElbeColorStyles } from "../color_theme";
import type { ElbeChild, ElbeChildren } from "../util/util";
import type { ElbeProps } from "./box";

export type BadgeProps = {
  count?: number;
  message?: string;
  child?: ElbeChild;
  hidden?: boolean;
  children?: ElbeChildren;
} & ElbeProps;

export function TestBadge(p: BadgeProps) {
  return new Badge({ ...p, colorStyle: "accent" });
}

export class Badge extends React.Component<
  BadgeProps & { colorStyle: ElbeColorStyles }
> {
  constructor(props: BadgeProps & { colorStyle: ElbeColorStyles }) {
    super(props);
  }

  static accent(p: BadgeProps) {
    return <Badge {...p} colorStyle="accent" />;
  }

  static error(p: BadgeProps) {
    return <Badge {...p} colorStyle="error" />;
  }

  static warning(p: BadgeProps) {
    return <Badge {...p} colorStyle="warning" />;
  }

  static success(p: BadgeProps) {
    return <Badge {...p} colorStyle="success" />;
  }

  static info(p: BadgeProps) {
    return <Badge {...p} colorStyle="info" />;
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        {this.props.child}
        {this.props.children}
        <div
          class={`b ${this.props.colorStyle} ${this.props.class ?? ""}`}
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
            visibility: this.props.hidden ? "hidden" : "visible",
            ...this.props.style,
          }}
        >
          {this.props.message ?? this.props.count}
        </div>
      </div>
    );
  }
}
