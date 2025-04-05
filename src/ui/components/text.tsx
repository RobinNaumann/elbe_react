import React from "preact/compat";
import type { ElbeTypeVariants } from "../theme/type_theme";
import type { ElbeChildren } from "../util/types";
import { applyProps, type ElbeProps } from "./base/box";

export type TextProps = {
  align?: "start" | "center" | "end";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  striked?: boolean;
  color?: string;
  size?: number;
  children?: ElbeChildren;
  v?: string;
} & ElbeProps;

export class Text extends React.Component<
  TextProps & { variant?: ElbeTypeVariants }
> {
  static h1 = (p: TextProps) => <Text {...p} variant="h1" />;
  static h2 = (p: TextProps) => <Text {...p} variant="h2" />;
  static h3 = (p: TextProps) => <Text {...p} variant="h3" />;
  static h4 = (p: TextProps) => <Text {...p} variant="h4" />;
  static h5 = (p: TextProps) => <Text {...p} variant="h5" />;
  static h6 = (p: TextProps) => <Text {...p} variant="h6" />;
  static s = (p: TextProps) => <Text {...p} variant="body-s" />;
  static m = (p: TextProps) => <Text {...p} variant="body-m" />;
  static l = (p: TextProps) => <Text {...p} variant="body-l" />;
  static code = (p: TextProps) => <Text {...p} variant="code" />;

  constructor({
    variant = "body-m",
    ...props
  }: TextProps & { variant?: ElbeTypeVariants }) {
    super({ ...props, variant });
  }

  render() {
    const {
      align,
      bold,
      italic,
      underline,
      striked,
      color,
      size,
      children,
      variant,
      v,
      ...elbe
    } = this.props;
    return (
      <span
        {...applyProps(
          "text",
          elbe,
          [
            "text",
            //align,
            color,
            variant,
          ],
          {
            fontSize: size ? `${size}rem` : "",
            color: color || "",
            scrollMarginTop: "2rem",
            textAlign: align,
            fontWeight: bold ? "bold" : "",
            fontStyle: italic ? "italic" : "",
            textDecoration: underline ? "underline" : "",
            textDecorationLine: striked ? "line-through" : "",
          }
        )}
      >
        {v}
        {children}
      </span>
    );
  }
}
