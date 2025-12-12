import React, { useMemo } from "react";
import { useApp } from "../app/app_ctxt";
import { ElbeTypeVariants } from "../theme/subthemes/_theme_type";
import { applyProps, ElbeChildrenProps, type ElbeProps } from "./base/box";

export const elbeThemeVariants: ElbeTypeVariants[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "bodyL",
  "bodyM",
  "bodyS",
  "code",
];

export type TextProps = ElbeProps &
  ElbeChildrenProps & {
    align?: "start" | "center" | "end";
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    striked?: boolean;
    color?: string;
    size?: number;
    v?: string;
  };

export class Text extends React.Component<
  TextProps & { variant?: ElbeTypeVariants }
> {
  static h1 = (p: TextProps) => <Text {...p} variant="h1" />;
  static h2 = (p: TextProps) => <Text {...p} variant="h2" />;
  static h3 = (p: TextProps) => <Text {...p} variant="h3" />;
  static h4 = (p: TextProps) => <Text {...p} variant="h4" />;
  static h5 = (p: TextProps) => <Text {...p} variant="h5" />;
  static h6 = (p: TextProps) => <Text {...p} variant="h6" />;
  static s = (p: TextProps) => <Text {...p} variant="bodyS" />;
  static m = (p: TextProps) => <Text {...p} variant="bodyM" />;
  static l = (p: TextProps) => <Text {...p} variant="bodyL" />;
  static code = (p: TextProps) => <Text {...p} variant="code" />;

  // replace the constructor with defaultProps so React receives the same props object
  static defaultProps = {
    variant: "bodyM",
  };

  render() {
    return <_Text {...this.props} />;
  }
}

function _Text(p: TextProps & { variant?: ElbeTypeVariants }) {
  const { appConfig } = useApp();
  const usedTheme = appConfig.themeContext.useTheme();

  const tVariant = useMemo(() => {
    const v = usedTheme.theme.type[p.variant ?? "bodyM"];
    if (!v) throw new Error(`Unknown text variant: ${p.variant}`);
    return v;
  }, [usedTheme, p.variant]);

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
  } = p;
  return (
    <span
      {...applyProps("text", elbe, [], {
        color: color ?? "",
        scrollMarginTop: "2rem",
        textAlign: align,
        textDecorationLine: striked ? "line-through" : "",
        // disable auto wrap for code blocks
        whiteSpace: "pre-wrap",
        fontSize: size ? size + "rem" : undefined,
        ...tVariant.asCss({ bold, italic, underline, size }),
      })}
    >
      {v}
      {children}
    </span>
  );
}
