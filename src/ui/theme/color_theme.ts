import {
  colors,
  LayerColor,
  type ColorThemeSeed,
  type SeedStyleSelector,
} from "./colors";

export function colorThemePreset(
  merge?: Partial<ColorThemeSeed>
): ColorThemeSeed {
  const styleSel: SeedStyleSelector = (_, b, s) => {
    const bL = b.luminance;
    if (bL === 1) return s;
    return s.inter(
      LayerColor.fromBack(bL > 0.5 ? colors.black : colors.white),
      0.1
    );
  };
  const seed = merge ?? {};
  return {
    base: seed.base ?? LayerColor.fromBack(colors.white),
    accent: seed.accent ?? LayerColor.fromBack(colors.blueAccent),
    info: seed.info ?? LayerColor.fromBack(colors.blue),
    success: seed.success ?? LayerColor.fromBack(colors.green),
    warning: seed.warning ?? LayerColor.fromBack(colors.yellow),
    error: seed.error ?? LayerColor.fromBack(colors.red),

    mode: {
      light: seed.mode?.light ?? ((_, b) => b),
      dark: seed.mode?.dark ?? ((_, b) => b.mirrorBrightness()),
    },
    scheme: {
      primary: seed.scheme?.primary ?? ((_, b) => b),
      secondary:
        seed.scheme?.secondary ??
        ((c, b) =>
          new LayerColor(
            b.back.inter(c.accent.back, 0.1).desaturated(0.5),
            b.front,
            b.border
          )),
      inverse: seed.scheme?.inverse ?? ((_, b) => b.mirrorBrightness()),
    },
    style: {
      accent: styleSel,
      info: styleSel,
      success: styleSel,
      warning: styleSel,
      error: styleSel,
    },

    variant: {
      major:
        seed.variant?.major ??
        ((_, __, s) => LayerColor.fromBack(s.back, { border: s.back })),
      minor:
        seed.variant?.minor ??
        ((_, b, s) => {
          const back = b.back;
          const backIn = back.mirrorBrightness();
          const major = s.back;
          const minor = s.back.inter(back, 0.8);
          const minorFront = minor.hasWCAGContrast(major) ? major : null;
          return new LayerColor(
            s.back.withAlpha(0.25),
            minorFront ?? major.inter(backIn, 0.6),
            minorFront ?? major.inter(backIn, 0.3)
          );
        }),
      flat:
        seed.variant?.flat ??
        ((_, b, s) => {
          //return new LayerColor(b.back, s?.back ?? b.front, b.front);

          //calculate front brightness
          const front = !s
            ? b.front
            : b.back.hasWCAGContrast(s?.back)
            ? s?.back
            : s?.back.inter(b.front, 0.6);
          return new LayerColor(
            b.back, //.withAlpha(0),
            front,
            null,
            !s ? b.front.withAlpha(0.3) : b.front
          );
        }),
    },
  };
}
