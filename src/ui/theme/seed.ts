import {
  LayerColor,
  SeedFlatSelector,
  SeedModifier,
  SeedSelector,
  SeedStyleSelector,
} from "../..";

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

export type ColorThemeSeed = ColorSeedColors & {
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

export function lColor(color: LayerColor | HexColor): LayerColor {
  return typeof color === "string" ? LayerColor.fromHex(color) : color;
}
