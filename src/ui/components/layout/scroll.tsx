import { Component } from "react";
import { applyProps, type ElbeProps } from "../base/box";

export type ScrollProps = ElbeProps & {
  innerClass?: string;
  height?: number;
  width?: number;
  children?: any;
};
type _ScrollProps = ScrollProps & {
  axis: "vertical" | "horizontal";
};

export class Scroll extends Component<_ScrollProps> {
  constructor(props: _ScrollProps) {
    super(props);
  }

  public static vertical = (p: ScrollProps) =>
    new Scroll({ ...p, axis: "vertical" }).render();
  public static horizontal = (p: ScrollProps) =>
    new Scroll({ ...p, axis: "horizontal" }).render();

  render() {
    return (
      <div
        {...applyProps("scroll", this.props, null, {
          overflowY: this.props.axis === "vertical" ? "scroll" : "hidden",
          overflowX: this.props.axis === "horizontal" ? "scroll" : "hidden",
        })}
      >
        <div
          className={this.props.innerClass}
          style={
            this.props.axis === "horizontal" ? { minWidth: "min-content" } : {}
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
