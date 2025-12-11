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
  noScrollbars?: boolean;
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
        {...applyProps(
          "scroll",
          this.props,
          [this.props.noScrollbars ? "elbe_scrollbars-hidden" : undefined],
          {
            height: this.props.height ? this.props.height + "rem" : undefined,
            width: this.props.width ? this.props.width + "rem" : undefined,
            overflowY: this.props.axis === "vertical" ? "scroll" : "hidden",
            overflowX: this.props.axis === "horizontal" ? "scroll" : "hidden",
          }
        )}
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
