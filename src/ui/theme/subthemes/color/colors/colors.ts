import { ContrastColor } from "./_color_contrast";
import { KindColor } from "./_color_kind";
import { LayerColor } from "./_color_layer";
import { MannerColor } from "./_color_manner";
import { ModeColor } from "./_color_mode";
import { RGBAColor } from "./_color_rgba";
import { SchemeColor } from "./_color_scheme";
import { StateColor } from "./_color_state";
import { ColorDataKeys } from "./_colordef";

export * from "./_color_contrast";
export * from "./_color_kind";
export * from "./_color_layer";
export * from "./_color_manner";
export * from "./_color_mode";
export * from "./_color_scheme";
export * from "./_color_state";
export * from "./_colordef";

export namespace ColorSelection {
  export type Contrasts = ColorDataKeys<typeof ContrastColor>;
  export type Modes = ColorDataKeys<typeof ModeColor>;
  export type Schemes = ColorDataKeys<typeof SchemeColor>;
  export type Kinds = ColorDataKeys<typeof KindColor>;
  export type MannersTrue = ColorDataKeys<typeof MannerColor>;
  export type Manners = MannersTrue | "plain";
  export type States = ColorDataKeys<typeof StateColor>;
  export type Layers = ColorDataKeys<typeof LayerColor>;

  export type KindsAlert = Exclude<Kinds, "plain" | "accent">;
}

type _SeedSelInput = {
  path: string[];
  seed: ColorThemeSeed;
  base: LayerColor;
};

export type SeedSelector = (p: _SeedSelInput) => LayerColor;
export type SeedModifier = (p: _SeedSelInput) => ColorThemeSeed;

export type SeedFlatSelector = (
  p: _SeedSelInput & {
    style?: LayerColor;
  }
) => LayerColor;

export type SeedStyleSelector = (
  p: _SeedSelInput & {
    style: LayerColor;
  }
) => LayerColor;

export type HexColor = `#${string}`;

export type ColorSeedColors = _Colors<LayerColor | HexColor>;
export type ThemeColors = _Colors<LayerColor>;

type _Colors<T> = {
  base: T;
  accent: T;
  info: T;
  success: T;
  warning: T;
  error: T;
};

type _ContrastSeed = {
  highvis: SeedModifier;
  normal: SeedModifier;
};

type _ModeSeed = {
  light: SeedSelector;
  dark: SeedSelector;
};

type _SchemeSeed = {
  primary: SeedSelector;
  secondary: SeedSelector;
  inverse: SeedSelector;
};

type _StyleSeed = {
  accent: SeedStyleSelector;
  info: SeedStyleSelector;
  success: SeedStyleSelector;
  warning: SeedStyleSelector;
  error: SeedStyleSelector;
};

type _VariantSeed = {
  major: SeedStyleSelector;
  minor: SeedStyleSelector;
  flat: SeedFlatSelector;
};

export type ColorThemeSelection = {
  contrast: ColorSelection.Contrasts;
  mode: ColorSelection.Modes;
  scheme: ColorSelection.Schemes;
  kind: ColorSelection.Kinds;
  manner: ColorSelection.Manners;
};

export type ColorThemeSeed = ColorSeedColors & {
  selection: ColorThemeSelection;
} & {
  contrast: _ContrastSeed;
  mode: _ModeSeed;
  scheme: _SchemeSeed;
  style: _StyleSeed;
  variant: _VariantSeed;
};

export type PartialColorThemeSeed = Partial<ColorSeedColors> & {
  contrast?: Partial<_ContrastSeed>;
  mode?: Partial<_ModeSeed>;
  scheme?: Partial<_SchemeSeed>;
  style?: Partial<_StyleSeed>;
  variant?: Partial<_VariantSeed>;
};

export const colors = {
  transparent: RGBAColor.fromHex("#00000000"),
  black: RGBAColor.fromHex("#000000FF"),
  white: RGBAColor.fromHex("#FFFFFFFF"),
  red: RGBAColor.fromHex("#FF0000FF"),
  green: RGBAColor.fromHex("#00FF00FF"),
  blue: RGBAColor.fromHex("#0000FFFF"),
  yellow: RGBAColor.fromHex("#FFFF00FF"),
  cyan: RGBAColor.fromHex("#00FFFFFF"),
  magenta: RGBAColor.fromHex("#FF00FFFF"),
  accent: {
    blue: RGBAColor.fromHex("#1E90FFFF"),
  },
};
