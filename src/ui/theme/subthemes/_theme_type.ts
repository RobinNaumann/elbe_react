import { dictMap, dictWithoutUndefined } from "../../util/util";
import { ElbeSubThemeData } from "../theme";

export type TypeStyle<T extends Dict<any> = {}> = T & {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  family: string[];
  size: number;
};

export function typeStyleAsCss(
  style: TypeStyle | undefined
): React.CSSProperties {
  if (!style) return {};
  return {
    fontFamily: style.family.join(", ") ?? "sans-serif",
    fontWeight: style.bold ? "bold" : "normal",
    fontSize: `${style.size ?? 1}rem`,
    fontStyle: style.italic ? "italic" : "normal",
    textDecoration: style.underline ? "underline" : "none",
  };
}

type _VariantSelector<T> = (style: TypeStyle, variant: T) => TypeStyle;

const _headingVariants: _VariantSelector<1 | 2 | 3 | 4 | 5 | 6> = (
  style,
  variant
) => {
  const reg = 1;
  const diff = style.size - reg;
  const varFac = (4 - (variant - 2)) / 6;

  const size = reg + diff * Math.pow(varFac, 1.5);
  return {
    ...style,
    size,
  };
};

const _bodyVariants: _VariantSelector<"s" | "l"> = (style, variant) => {
  const size = style.size * (variant === "s" ? 0.8 : 1.2);
  return {
    ...style,
    size,
  };
};

const _seed = {
  heading: {
    bold: true,
    family: ["Calistoga", "Arial", "sans-serif"],
    size: 2,
  },
  body: {
    bold: false,
    family: ["Helvetica", "Arial", "sans-serif"],
    size: 1,
  },
  code: {
    bold: false,
    family: ["Courier", "monospace"],
    size: 1,
  },
  headingVariants: _headingVariants,
  bodyVariants: _bodyVariants,
};

const _data = {
  h1: {} as TypeStyle,
  h2: {} as TypeStyle,
  h3: {} as TypeStyle,
  h4: {} as TypeStyle,
  h5: {} as TypeStyle,
  h6: {} as TypeStyle,
  bodyL: {} as TypeStyle,
  bodyM: {} as TypeStyle,
  bodyS: {} as TypeStyle,
  code: {} as TypeStyle,
};

type _Computed = {
  [key in keyof typeof _data]: TypeStyle<{
    asCss: (override?: Partial<TypeStyle>) => React.CSSProperties;
  }>;
};

export type ElbeTypeVariants = keyof typeof _data;

export const typeThemeData: ElbeSubThemeData<
  _Computed,
  typeof _seed,
  typeof _data
> = {
  seed: _seed,
  _configType: _data,
  compute: (c) =>
    dictMap(c, (v) => ({
      ...v,
      asCss: (override) =>
        typeStyleAsCss({ ...v, ...dictWithoutUndefined(override) }),
    })),
  asCss: (c) => typeStyleAsCss(c.bodyM),
  fromSeed: (seed) => ({
    h1: seed.heading,
    h2: seed.headingVariants(seed.heading, 2),
    h3: seed.headingVariants(seed.heading, 3),
    h4: seed.headingVariants(seed.heading, 4),
    h5: seed.headingVariants(seed.heading, 5),
    h6: seed.headingVariants(seed.heading, 6),
    bodyL: seed.bodyVariants(seed.body, "l"),
    bodyM: seed.body,
    bodyS: seed.bodyVariants(seed.body, "s"),
    code: seed.code,
  }),
};
