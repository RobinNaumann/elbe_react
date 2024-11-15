interface TypeStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  family: string[];
  size: number;
}

export type ElbeTypeVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-l"
  | "body-m"
  | "body-s"
  | "code";

export const tVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body-l",
  "body-m",
  "body-s",
  "code",
] as const;

function _typeStyleAsCss(t: TypeStyle): string {
  return (
    `font-family: ${t.family};\n` +
    `font-size: ${t.size}rem;\n` +
    `font-weight: ${t.bold ? "bold" : "normal"};\n` +
    `font-style: ${t.italic ? "italic" : "normal"};\n` +
    `text-decoration: ${t.underline ? "underline" : "none"};\n`
  );
}

export type VariantSelector<T> = (style: TypeStyle, variant: T) => TypeStyle;

export interface TypeThemeSeed {
  /**
   * the base style for headings. Refers to h1
   */
  heading: TypeStyle;
  body: TypeStyle;
  code: TypeStyle;

  headingVariants: VariantSelector<2 | 3 | 4 | 5 | 6>;
  bodyVariants: VariantSelector<"s" | "l">;
}

export class TypeTheme {
  constructor(
    public h1: TypeStyle,
    public h2: TypeStyle,
    public h3: TypeStyle,
    public h4: TypeStyle,
    public h5: TypeStyle,
    public h6: TypeStyle,
    public bodyL: TypeStyle,
    public body: TypeStyle,
    public bodyS: TypeStyle,
    public code: TypeStyle
  ) {}

  private get headers() {
    return [this.h1, this.h2, this.h3, this.h4, this.h5, this.h6];
  }

  public asCss(): string {
    return (
      this.headers
        .map((v, i) => `h${i + 1}, .h${i + 1} {${_typeStyleAsCss(v)}}`)
        .join("\n") +
      `body, .body, .body-m {${_typeStyleAsCss(this.body)}}\n` +
      `large, .body-l {${_typeStyleAsCss(this.bodyL)}}\n` +
      `small, .body-s {${_typeStyleAsCss(this.bodyS)}}\n` +
      `.code {${_typeStyleAsCss(this.code)}}\n`
    );
  }

  public static generate(seed?: Partial<TypeThemeSeed>): TypeTheme {
    const s: TypeThemeSeed = typeThemePreset(seed);
    return new TypeTheme(
      s.heading,
      s.headingVariants(s.heading, 2),
      s.headingVariants(s.heading, 3),
      s.headingVariants(s.heading, 4),
      s.headingVariants(s.heading, 5),
      s.headingVariants(s.heading, 6),
      s.bodyVariants(s.body, "l"),
      s.body,
      s.bodyVariants(s.body, "s"),
      s.code
    );
  }
}

export function typeThemePreset(merge?: Partial<TypeThemeSeed>): TypeThemeSeed {
  return {
    heading: {
      bold: true,
      family: ["Calistoga", "Arial", "sans-serif"],
      size: 2.2,
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
    headingVariants: (style, variant) => {
      const size = style.size * (1 - (variant - 1) * 0.1);
      return {
        ...style,
        size,
      };
    },
    bodyVariants: (style, variant) => {
      const size = style.size * (variant === "s" ? 0.8 : 1.2);
      return {
        ...style,
        size,
      };
    },
    ...merge,
  };
}
