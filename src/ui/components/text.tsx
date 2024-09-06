import React from "preact/compat";
import type { ElbeTypeStyles } from "../color_theme";
import type { ElbeChildren } from "../util/util";
import { applyProps, type ElbeProps } from "./box";

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
  TextProps & { typeStyle?: ElbeTypeStyles }
> {
  static h1 = (p: TextProps) => <Text {...p} typeStyle="header-1" />;
  static h2 = (p: TextProps) => <Text {...p} typeStyle="header-2" />;
  static h3 = (p: TextProps) => <Text {...p} typeStyle="header-3" />;
  static h4 = (p: TextProps) => <Text {...p} typeStyle="header-4" />;
  static h5 = (p: TextProps) => <Text {...p} typeStyle="header-5" />;
  static h6 = (p: TextProps) => <Text {...p} typeStyle="header-6" />;
  static s = (p: TextProps) => <Text {...p} typeStyle="text-s" />;
  static m = (p: TextProps) => <Text {...p} typeStyle="text-m" />;
  static l = (p: TextProps) => <Text {...p} typeStyle="text-l" />;
  static code = (p: TextProps) => <Text {...p} typeStyle="code" />;

  constructor({
    typeStyle = "text-m",
    ...props
  }: TextProps & { typeStyle?: ElbeTypeStyles }) {
    super({ ...props, typeStyle });
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
      typeStyle,
      v,
      ...elbe
    } = this.props;
    return (
      <span
        {...applyProps(
          elbe,
          [
            "text",
            align,
            bold && "b",
            italic && "i",
            underline && "underline",
            striked && "striked",
            color,
            typeStyle,
          ],
          {
            fontSize: size ? `${size}rem` : "",
            color: color || "",
          }
        )}
      >
        {v}
        {children}
      </span>
    );
  }
}
