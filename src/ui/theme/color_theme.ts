import { colors, LayerColor, type SeedStyleSelector } from "./colors";
import { ColorThemeSeed, PartialColorThemeSeed } from "./seed";

export function colorThemePreset(
  merge?: Partial<PartialColorThemeSeed>,
  highVis: boolean = false
): ColorThemeSeed {
  const styleSel: SeedStyleSelector = (_, b, s) => {
    const bL = b.luminance;
    if (bL === 1) return s;
    //if (bL === 0) return s.mirrorBrightness();

    if (s.luminance == 0) return s.mirrorBrightness();

    return s.inter(
      LayerColor.fromBack(bL > 0.5 ? colors.black : colors.white),
      0.1
    );
  };
  const seed = merge ?? {};
  return {
    base: seed.base ?? LayerColor.fromBack(colors.white),
    accent: highVis
      ? LayerColor.fromHex("#000000")
      : seed.accent ?? LayerColor.fromBack(colors.blueAccent),
    info: seed.info ?? LayerColor.fromBack(colors.blue),
    success: seed.success ?? LayerColor.fromBack(colors.green),
    warning: seed.warning ?? LayerColor.fromBack(colors.yellow),
    error: seed.error ?? LayerColor.fromBack(colors.red),

    mode: {
      light: seed.mode?.light ?? ((_, b) => b),
      dark: seed.mode?.dark ?? ((_, b) => b.mirrorBrightness()),
    },
    scheme: {
      primary: seed.scheme?.primary ?? _makePrimary,
      secondary: highVis
        ? seed.scheme?.primary ?? _makePrimary
        : seed.scheme?.secondary ?? _makeSecondary,
      inverse: seed.scheme?.inverse ?? _makeInverse,
    },
    style: {
      accent: styleSel,
      info: styleSel,
      success: styleSel,
      warning: styleSel,
      error: styleSel,
    },

    variant: {
      major: seed.variant?.major ?? _makeMajor,
      minor: seed.variant?.minor ?? highVis ? _makeMajor : _makeMinor,
      flat: seed.variant?.flat ?? ((c, b, s) => _makeFlat(highVis, c, b, s)),
    },
  };
}

function _makePrimary(seed: ColorThemeSeed, base: LayerColor) {
  return base;
}

function _makeSecondary(seed: ColorThemeSeed, base: LayerColor) {
  const isDark = base.back.luminance < 0.3;

  return new LayerColor(
    base.back.inter(seed.accent.back, isDark ? 0.2 : 0.1).desaturated(0.5),
    base.front,
    base.border
  );
}

function _makeInverse(seed: ColorThemeSeed, base: LayerColor) {
  return base.mirrorBrightness();
}

function _makeMajor(seed: ColorThemeSeed, back: LayerColor, style: LayerColor) {
  return LayerColor.fromBack(style.back, { border: style.back });
}

function _makeMinor(seed: ColorThemeSeed, back: LayerColor, style: LayerColor) {
  const b = back.back;

  const backIn = b.mirrorBrightness();
  const major = style.back;
  const minor = style.back.inter(b, 0.8);
  const minorFront = minor.hasWCAGContrast(major) ? major : null;
  return new LayerColor(
    style.back.withAlpha(0.25),
    minorFront ?? major.inter(backIn, 0.6),
    minorFront ?? major.inter(backIn, 0.3)
  );
}

function _makeFlat(
  highVis: boolean,
  seed: ColorThemeSeed,
  back: LayerColor,
  style?: LayerColor
) {
  const front = !style
    ? back.front
    : back.back.hasWCAGContrast(style?.back)
    ? style?.back
    : style?.back.inter(back.front, 0.6);

  const isDark = back.back.luminance < 0.3;

  const border =
    !highVis && !style
      ? back.front.inter(back.back, isDark ? 0.75 : 0.9)
      : back.front;

  return new LayerColor(
    back.back, //.withAlpha(0),
    front,
    highVis ? border : null,
    border
  );
}
