import React from "react";
import type { ElbeColorKinds } from "../theme/colors";
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
  BadgeProps & { kind: ElbeColorKinds }
> {
  constructor(props: BadgeProps & { kind: ElbeColorKinds }) {
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
          className={`b ${this.props.kind} major ${this.props.className ?? ""}`}
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
          {this.props.label ?? this.props.count}
        </div>
      </div>
    );
  }
}
