import {
  LayerColor,
  SeedFlatSelector,
  SeedSelector,
  SeedStyleSelector,
} from "../..";

export type ColorSeedColors = {
  base: LayerColor;
  accent: LayerColor;
  info: LayerColor;
  success: LayerColor;
  warning: LayerColor;
  error: LayerColor;
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
  mode: _ModeSeed;
  scheme: _SchemeSeed;
  style: _StyleSeed;
  variant: _VariantSeed;
};

export type PartialColorThemeSeed = Partial<ColorSeedColors> & {
  mode?: Partial<_ModeSeed>;
  scheme?: Partial<_SchemeSeed>;
  style?: Partial<_StyleSeed>;
  variant?: Partial<_VariantSeed>;
};
