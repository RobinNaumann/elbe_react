import { LayerColor } from "./colors/_color_layer";
import {
  colors,
  ColorThemeSeed,
  HexColor,
  SeedFlatSelector,
  SeedSelector,
  SeedStyleSelector,
} from "./colors/colors";

const _styleSel: SeedStyleSelector = ({ base, style }) => {
  const bL = base.luminance();
  if (bL === 1) return style;
  //if (bL === 0) return s.mirrorBrightness();

  if (style.luminance() == 0) return style.mirrorBrightnessLayer();

  return style.interLayer(
    LayerColor.fromBack(bL > 0.5 ? colors.black : colors.white),
    0.1
  );
};

const _makePrimary: SeedSelector = (p) => p.base;

const _makeSecondary: SeedSelector = ({ base, seed }) =>
  LayerColor.new({
    back: base.back
      .inter(
        LayerColor.fromBack(seed.accent).back,
        base.back.luminance() < 0.3 ? 0.2 : 0.1
      )
      .desaturated(0.5),
    front: base.front,
    border: base.border,
  });

const _makeInverse: SeedSelector = ({ base }) => base.mirrorBrightnessLayer();

const _makeMajor: SeedStyleSelector = ({ style, path }) => {
  return LayerColor.fromBack(style.back, { border: style.back });
};

const _makeMinor: SeedStyleSelector = ({ base, style }) => {
  const b = base.back;

  const backIn = b.mirrorBrightness();
  const major = style.back;
  const minor = style.back.inter(b, 0.8);
  const minorFront = minor.hasWCAGContrast(major) ? major : null;
  return LayerColor.new({
    back: style.back.withAlpha(0.25),
    front: minorFront ?? major.inter(backIn, 0.6),
    border: minorFront ?? major.inter(backIn, 0.3),
  });
};

const _makeFlat: SeedFlatSelector = ({ path, style, base }) => {
  const highVis = path.includes("highvis");

  const front = !style
    ? base.front
    : base.back.hasWCAGContrast(style?.back)
    ? style?.back
    : style?.back.inter(base.front, 0.6);

  const isDark = base.back.luminance() < 0.3;

  const border =
    !highVis && !style
      ? base.front.inter(base.back, isDark ? 0.75 : 0.9)
      : base.front;

  return LayerColor.new({
    back: base.back, //.withAlpha(0),
    front,
    border: highVis ? border : null,
    borderContext: border,
  });
};

export const _seed: ColorThemeSeed = {
  base: LayerColor.fromBack(colors.white) as LayerColor | HexColor,
  accent: LayerColor.fromBack(colors.accent.blue) as LayerColor | HexColor,
  info: LayerColor.fromBack(colors.blue) as LayerColor | HexColor,
  success: LayerColor.fromBack(colors.green) as LayerColor | HexColor,
  warning: LayerColor.fromBack(colors.yellow) as LayerColor | HexColor,
  error: LayerColor.fromBack(colors.red) as LayerColor | HexColor,

  selection: {
    contrast: "normal",
    mode: "light",
    scheme: "primary",
    kind: "accent",
    manner: "plain",
  },

  contrast: {
    highvis: ({ seed }) => ({
      ...seed,
      accent: LayerColor.fromBack(colors.black),
    }),
    normal: ({ seed }) => seed,
  },

  mode: {
    light: ({ base }) => base,
    dark: ({ base }) => base.mirrorBrightnessLayer(),
  },
  scheme: {
    primary: _makePrimary,
    secondary: (p) => {
      const highVis = p.path.includes("highvis");
      return (highVis ? _makePrimary : _makeSecondary)(p);
    },
    inverse: _makeInverse,
  },
  kind: {
    accent: _styleSel,
    info: _styleSel,
    success: _styleSel,
    warning: _styleSel,
    error: _styleSel,
  },

  variant: {
    major: _makeMajor,
    minor: (p) => {
      const highVis = p.path.includes("highvis");
      return highVis ? _makeMajor(p) : _makeMinor(p);
    },
    flat: _makeFlat,
  },
};
