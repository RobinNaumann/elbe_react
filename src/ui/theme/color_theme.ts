import {
  colors,
  LayerColor,
  SeedFlatSelector,
  SeedSelector,
  type SeedStyleSelector,
} from "./colors";
import { ColorThemeSeed, lColor, PartialColorThemeSeed } from "./seed";

export function colorThemePreset(
  merge?: Partial<PartialColorThemeSeed>
  //highVis: boolean = false
): ColorThemeSeed {
  const seed = merge ?? {};
  return {
    base: seed.base ?? LayerColor.fromBack(colors.white),
    accent: seed.accent ?? LayerColor.fromBack(colors.blueAccent),
    info: seed.info ?? LayerColor.fromBack(colors.blue),
    success: seed.success ?? LayerColor.fromBack(colors.green),
    warning: seed.warning ?? LayerColor.fromBack(colors.yellow),
    error: seed.error ?? LayerColor.fromBack(colors.red),

    contrast: {
      highvis:
        seed.contrast?.highvis ??
        (({ seed }) => ({
          ...seed,
          accent: LayerColor.fromBack(colors.black),
        })),
      normal: seed.contrast?.normal ?? (({ seed }) => seed),
    },

    mode: {
      light: seed.mode?.light ?? (({ base }) => base),
      dark: seed.mode?.dark ?? (({ base }) => base.mirrorBrightness()),
    },
    scheme: {
      primary: seed.scheme?.primary ?? _makePrimary,
      secondary: (p) => {
        const highVis = p.path.includes("highvis");
        return (
          highVis
            ? seed.scheme?.primary ?? _makePrimary
            : seed.scheme?.secondary ?? _makeSecondary
        )(p);
      },
      inverse: seed.scheme?.inverse ?? _makeInverse,
    },
    style: {
      accent: _styleSel,
      info: _styleSel,
      success: _styleSel,
      warning: _styleSel,
      error: _styleSel,
    },

    variant: {
      major: seed.variant?.major ?? _makeMajor,
      minor: (p) => {
        if (seed.variant?.minor) return seed.variant?.minor(p);
        const highVis = p.path.includes("highvis");
        return highVis ? _makeMajor(p) : _makeMinor(p);
      },
      flat: seed.variant?.flat ?? _makeFlat,
    },
  };
}

const _styleSel: SeedStyleSelector = ({ base, style }) => {
  const bL = base.luminance;
  if (bL === 1) return style;
  //if (bL === 0) return s.mirrorBrightness();

  if (style.luminance == 0) return style.mirrorBrightness();

  return style.inter(
    LayerColor.fromBack(bL > 0.5 ? colors.black : colors.white),
    0.1
  );
};

const _makePrimary: SeedSelector = (p) => p.base;

const _makeSecondary: SeedSelector = ({ base, seed }) =>
  new LayerColor(
    base.back
      .inter(lColor(seed.accent).back, base.back.luminance < 0.3 ? 0.2 : 0.1)
      .desaturated(0.5),
    base.front,
    base.border
  );

const _makeInverse: SeedSelector = ({ base }) => base.mirrorBrightness();

const _makeMajor: SeedStyleSelector = ({ style, path }) => {
  return LayerColor.fromBack(style.back, { border: style.back });
};

const _makeMinor: SeedStyleSelector = ({ base, style }) => {
  const b = base.back;

  const backIn = b.mirrorBrightness();
  const major = style.back;
  const minor = style.back.inter(b, 0.8);
  const minorFront = minor.hasWCAGContrast(major) ? major : null;
  return new LayerColor(
    style.back.withAlpha(0.25),
    minorFront ?? major.inter(backIn, 0.6),
    minorFront ?? major.inter(backIn, 0.3)
  );
};

const _makeFlat: SeedFlatSelector = ({ path, style, base }) => {
  const highVis = path.includes("highvis");

  const front = !style
    ? base.front
    : base.back.hasWCAGContrast(style?.back)
    ? style?.back
    : style?.back.inter(base.front, 0.6);

  const isDark = base.back.luminance < 0.3;

  const border =
    !highVis && !style
      ? base.front.inter(base.back, isDark ? 0.75 : 0.9)
      : base.front;

  return new LayerColor(
    base.back, //.withAlpha(0),
    front,
    highVis ? border : null,
    border
  );
};
