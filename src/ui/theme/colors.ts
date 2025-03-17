import { hslToRgb, rgbToHsl } from "colors-convert";
import { clamp } from "../util/util";
import { colorThemePreset } from "./color_theme";

export type ElbeColorModes = "light" | "dark";
export type ElbeColorSchemes = "primary" | "secondary" | "inverse";
export type ElbeColorKinds =
  | "plain"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";
export type ElbeColorManners = "major" | "minor" | "flat" | "plain";

export const cModes: ElbeColorModes[] = ["light", "dark"];
export const cSchemes: ElbeColorSchemes[] = ["primary", "secondary", "inverse"];
export const cKinds: ElbeColorKinds[] = [
  "plain",
  "accent",
  "info",
  "success",
  "warning",
  "error",
];
export const cManners: ElbeColorManners[] = ["major", "minor", "flat", "plain"];
export const cStates = ["neutral", "hover", "active", "disabled"];
export const cLayers = ["back", "front", "border"];

export type SeedSelector = (
  seed: ColorThemeSeed,
  base: LayerColor
) => LayerColor;

export type SeedFlatSelector = (
  seed: ColorThemeSeed,
  base: LayerColor,
  style?: LayerColor
) => LayerColor;

export type SeedStyleSelector = (
  seed: ColorThemeSeed,
  base: LayerColor,
  style: LayerColor
) => LayerColor;

export type ColorSeedColors = {
  base: LayerColor;
  accent: LayerColor;
  info: LayerColor;
  success: LayerColor;
  warning: LayerColor;
  error: LayerColor;
};

export type ColorThemeSeed = ColorSeedColors & {
  mode: {
    light: SeedSelector;
    dark: SeedSelector;
  };

  scheme: {
    primary: SeedSelector;
    secondary: SeedSelector;
    inverse: SeedSelector;
  };

  style: {
    accent: SeedStyleSelector;
    info: SeedStyleSelector;
    success: SeedStyleSelector;
    warning: SeedStyleSelector;
    error: SeedStyleSelector;
  };

  variant: {
    major: SeedStyleSelector;
    minor: SeedStyleSelector;
    flat: SeedFlatSelector;
  };
};

export class RGBAColor {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number
  ) {}

  public asCss(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  public get isDark(): boolean {
    return this.luminance < 0.5;
  }

  public get luminance() {
    const [r, g, b] = [this.r, this.g, this.b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return r * 0.2126 + g * 0.7152 + b * 0.0722;
  }

  public get hex(): string {
    const c = [this.r, this.g, this.b].map((v) =>
      Math.round(v).toString(16).padStart(2, "0")
    );

    const a = Math.round(this.a * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${c.join("")}${a}`;
  }

  public static fromHex(hex: string | null): RGBAColor {
    if (!hex) return new RGBAColor(0, 0, 0, 0);

    const c = hex.replace("#", "").padEnd(6, "0").padEnd(8, "f").toLowerCase();
    console.log(c);
    return new RGBAColor(
      parseInt(c.substring(0, 2), 16),
      parseInt(c.substring(2, 4), 16),
      parseInt(c.substring(4, 6), 16),
      parseInt(c.substring(6, 8), 16) / 255
    );
  }

  public desaturated(f: number = 1): RGBAColor {
    const avg = (this.r + this.g + this.b) / 3;
    return new RGBAColor(
      this.r + (avg - this.r) * f,
      this.g + (avg - this.g) * f,
      this.b + (avg - this.b) * f,
      this.a
    );
  }

  public withAlpha(a: number): RGBAColor {
    return new RGBAColor(this.r, this.g, this.b, a);
  }

  public inter(other: RGBAColor, factor: number): RGBAColor {
    return new RGBAColor(
      this.r + (other.r - this.r) * factor,
      this.g + (other.g - this.g) * factor,
      this.b + (other.b - this.b) * factor,
      this.a + (other.a - this.a) * factor
    );
  }

  public mirrorBrightness(factor: number = 1): RGBAColor {
    const hsl = rgbToHsl({ r: this.r, g: this.g, b: this.b });
    const newL = (50 - hsl.l) * (factor * 2 - 1) + 50;
    const rgb = hslToRgb({
      ...hsl,
      l: clamp(newL, 0, 100),
      s: clamp(hsl.s, 0, 100),
      //s: -Math.abs(2 * newL - 100) + 100,
    });
    return new RGBAColor(rgb.r, rgb.g, rgb.b, this.a);
  }

  public get values(): [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  hasWCAGContrast(color: RGBAColor) {
    return this.contrastRatio(color) >= 3;
  }

  contrastRatio(color: RGBAColor): number {
    const l1 = this.luminance;
    const l2 = color.luminance;
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
}

export const colors = {
  transparent: new RGBAColor(0, 0, 0, 0),
  white: new RGBAColor(255, 255, 255, 1),
  black: new RGBAColor(0, 0, 0, 1),
  blueAccent: new RGBAColor(60, 119, 246, 1),
  blue: new RGBAColor(32, 89, 153, 1),
  green: new RGBAColor(35, 144, 78, 1),
  yellow: new RGBAColor(240, 221, 21, 1),
  red: new RGBAColor(243, 67, 67, 1),
};

export class LayerColor extends RGBAColor {
  public front: RGBAColor;

  constructor(
    public back: RGBAColor,
    front: RGBAColor | null,
    public border?: RGBAColor | null,
    public borderContext?: RGBAColor | null
  ) {
    super(back.r, back.g, back.b, back.a);
    this.front = front ?? (back.isDark ? colors.white : colors.black);
  }

  public asCss(): string {
    return (
      `background-color: ${this.back.asCss()};\n` +
      `color: ${this.front.asCss()};\n` +
      `border-color: ${this.border?.asCss() ?? "transparent"};\n` +
      //`border-color: ${this.border?.asCss() ?? "transparent"};\n` +
      this.contextCss()
    );
  }

  public inter(other: LayerColor, factor: number): LayerColor {
    return new LayerColor(
      this.back.inter(other.back, factor),
      this.front.inter(other.front, factor),
      this.border?.inter(other.border ?? colors.transparent, factor),
      this.borderContext?.inter(
        other.borderContext ?? colors.transparent,
        factor
      )
    );
  }

  public mirrorBrightness(factor?: number): LayerColor {
    return new LayerColor(
      this.back.mirrorBrightness(factor),
      this.front.mirrorBrightness(factor),
      this.border?.mirrorBrightness(factor),
      this.borderContext?.mirrorBrightness(factor)
    );
  }

  public desaturated(): LayerColor {
    return new LayerColor(
      this.back.desaturated(),
      this.front.desaturated(),
      this.border?.desaturated(),
      this.borderContext?.desaturated()
    );
  }

  public static fromHex(
    back: string,
    front?: string | null,
    border?: string | null
  ): LayerColor {
    if (front === undefined && border === undefined) {
      return LayerColor.fromBack(RGBAColor.fromHex(back));
    }
    return new LayerColor(
      RGBAColor.fromHex(back),
      RGBAColor.fromHex(front ?? null),
      RGBAColor.fromHex(border ?? null)
    );
  }

  public static fromBack(
    back: RGBAColor,
    c?: { front?: RGBAColor; border?: RGBAColor }
  ): LayerColor {
    const front = back.isDark ? colors.white : colors.black;
    return new LayerColor(back, c?.front ?? front, c?.border ?? front);
  }

  public contextCss(): string {
    return (
      `--c-context-back: ${this.back.asCss()};\n` +
      `--c-context-front: ${this.front.asCss()};` +
      `--c-context-border: ${
        (this.borderContext ?? this.border)?.asCss() ?? "transparent"
      };`
    );
  }
}

export class StateColor extends LayerColor {
  constructor(
    public neutral: LayerColor,
    public hover: LayerColor,
    public active: LayerColor,
    public disabled: LayerColor
  ) {
    super(neutral.back, neutral.front, neutral.border);
  }

  public asCss(): string {
    const els = [
      ".action",
      ":is(button)",
      ":is(a)",
      ":is(input)",
      ":is(select)",
    ];

    const disS = "&.disabled, & :disabled, &:disabled";

    const hoverS = els.map((e) => `&${e}:hover:not(${disS})`).join(", ");
    const activeS = els.map((e) => `&${e}:active:not(${disS})`).join(", ");

    return (
      `${this.neutral.asCss()} \n` +
      `${hoverS} { ${this.hover.asCss()} }\n` +
      `${activeS} { ${this.active.asCss()} }\n` +
      `${disS} { ${this.disabled.asCss()} }`
    );
  }

  public static generate(
    _: ColorThemeSeed,
    context: LayerColor,
    style: LayerColor,
    fromFront?: boolean
  ): StateColor {
    function _make(factor: number) {
      const front = style.front;
      return new LayerColor(
        (fromFront
          ? context.back.inter(front, factor)
          : style.back.inter(context.back.mirrorBrightness(), factor)
        ).withAlpha(Math.max(style.back.a, 0.2)),

        front,
        style.border,
        style.borderContext
      );
    }

    return new StateColor(
      style,
      _make(0.075),
      _make(0.25),
      style.desaturated()
    );
  }
}

export class MannerColor extends StateColor {
  constructor(
    public major: StateColor | null,
    public minor: StateColor | null,
    public flat: StateColor
  ) {
    const m = major ?? flat;
    super(m.neutral, m.hover, m.active, m.disabled);
  }

  public asCss(fallback?: MannerColor): string {
    const maj = this.major ?? fallback?.major;
    const min = this.minor ?? fallback?.minor;

    return (
      `${this.flat.asCss()}\n` +
      (maj ? `&.major { ${maj.asCss()} } \n` : "") +
      (min ? `&.minor { ${min.asCss()} } \n` : "") +
      `&.flat { ${this.flat.asCss()} }\n`
    );
  }

  public raisedCss(): string {
    const maj = this.major;
    const min = this.minor;
    return (
      (maj ? ` .major { ${maj.asCss()} } \n` : "") +
      (min ? ` .minor { ${min.asCss()} } \n` : "")
    );
  }

  public static generate(
    s: ColorThemeSeed,
    c: LayerColor,
    style?: LayerColor
  ): MannerColor {
    return new MannerColor(
      style ? StateColor.generate(s, c, s.variant.major(s, c, style)) : null,
      style ? StateColor.generate(s, c, s.variant.minor(s, c, style)) : null,
      StateColor.generate(s, c, s.variant.flat(s, c, style), true)
    );

    /*
    if (!style) {
      return new MannerColor(null, null, StateColor.generate(s, c, c, true));
    }
    return new MannerColor(
      StateColor.generate(s, c, s.variant.major(s, c, style)),
      StateColor.generate(s, c, s.variant.minor(s, c, style)),
      StateColor.generate(s, c, s.variant.flat(s, c, style), true)
    );
    */
  }
}

export class KindColor extends MannerColor {
  constructor(
    public plain: MannerColor,
    public accent: MannerColor,
    public info: MannerColor,
    public success: MannerColor,
    public warning: MannerColor,
    public error: MannerColor
  ) {
    super(plain.major, plain.minor, plain.flat);
  }

  public asCss(): string {
    return (
      `${this.plain.asCss()}\n` +
      `${this.accent.raisedCss()}\n` +
      `.plain {${this.plain.asCss()}}\n` +
      `.accent { ${this.accent.asCss()} }\n` +
      `.info { ${this.info.asCss()} }\n` +
      `.success { ${this.success.asCss()} }\n` +
      `.warning { ${this.warning.asCss()} }\n` +
      `.error { ${this.error.asCss()} }`
    );
  }

  public static generate(s: ColorThemeSeed, c: LayerColor): KindColor {
    return new KindColor(
      MannerColor.generate(s, c),
      MannerColor.generate(s, c, s.style.accent(s, c, s.accent)),
      MannerColor.generate(s, c, s.style.info(s, c, s.info)),
      MannerColor.generate(s, c, s.style.success(s, c, s.success)),
      MannerColor.generate(s, c, s.style.warning(s, c, s.warning)),
      MannerColor.generate(s, c, s.style.error(s, c, s.error))
    );
  }
}

export class SchemeColor extends KindColor {
  constructor(
    public primary: KindColor,
    public secondary: KindColor,
    public inverse: KindColor
  ) {
    super(
      primary.plain,
      primary.accent,
      primary.info,
      primary.success,
      primary.warning,
      primary.error
    );
  }

  public asCss(): string {
    return (
      `${this.primary.asCss()}\n` +
      `.primary { ${this.primary.asCss()}} \n` +
      `.secondary { ${this.secondary.asCss()} }\n` +
      `.inverse { ${this.inverse.asCss()} }`
    );
  }

  public static generate(seed: ColorThemeSeed, c: LayerColor): SchemeColor {
    const m = seed.scheme;
    return new SchemeColor(
      KindColor.generate(seed, m.primary(seed, c)),
      KindColor.generate(seed, m.secondary(seed, c)),
      KindColor.generate(seed, m.inverse(seed, c))
    );
  }
}

export class ModeColor extends SchemeColor {
  constructor(public light: SchemeColor, public dark: SchemeColor) {
    super(light.primary, light.secondary, light.inverse);
  }

  public asCss(): string {
    return (
      `.elbe { ${this.light.asCss()}}` + `.elbe.dark { ${this.dark.asCss()}}`
    );
  }

  public static generate(seed: ColorThemeSeed): ModeColor {
    return new ModeColor(
      SchemeColor.generate(seed, seed.base),
      SchemeColor.generate(seed, seed.mode.dark(seed, seed.base))
    );
  }
}

export class ColorTheme {
  constructor(public colors: ColorSeedColors, public color: ModeColor) {}

  public asCss(): string {
    return (
      ":root {" +
      `--c-accent: ${this.colors.accent.back.asCss()};` +
      `--c-info: ${this.colors.info.back.asCss()};` +
      `--c-success: ${this.colors.success.back.asCss()};` +
      `--c-warning: ${this.colors.warning.back.asCss()};` +
      `--c-error: ${this.colors.error.back.asCss()};` +
      "}\n" +
      this.color.asCss()
    );
  }

  public static generate(seed?: Partial<ColorThemeSeed>): ColorTheme {
    const s: ColorThemeSeed = colorThemePreset(seed);
    return new ColorTheme(s, ModeColor.generate(s));
  }
}

//Bun.write("./example.css", ColorTheme.generate().asCss());
