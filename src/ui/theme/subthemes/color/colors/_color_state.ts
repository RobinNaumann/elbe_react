import { LayerColor } from "./_color_layer";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const StateColor = defineColor({
  type: "state",
  static: {
    generate(
      path: string[],
      seed: ColorThemeSeed,
      context: LayerColor,
      style: LayerColor,
      fromFront?: boolean
    ): StateColor {
      function _make(factor: number) {
        const front = style.front;
        return LayerColor.new({
          back: (fromFront
            ? context.back.inter(front, factor)
            : style.back.inter(context.back.mirrorBrightness(), factor)
          ).withAlpha(Math.max(style.back.alpha, 0.2)),

          front,
          border: style.border,
        });
      }

      return StateColor.new({
        neutral: style,
        hover: _make(0.05) ?? style,
        active: _make(0.15) ?? style,
        disabled:
          path.includes("plain") || path.includes("flat")
            ? style.interLayer(style.back, 0.35, 0.5, 0.35).desaturatedLayer()
            : style.desaturatedLayer().mirrorBrightnessLayer(0.05),
      });
    },
    fromBack(back: string) {
      const style = LayerColor.fromBack(back);
      function _make(factor: number) {
        return LayerColor.new({
          back: style.back
            .inter(style.mirrorBrightness(), factor)
            .withAlpha(Math.max(style.back.alpha, 0.2)),
          front: style.front,
          border: style.border,
        });
      }

      return StateColor.new({
        neutral: style,

        hover: _make(0.05) ?? style,
        active: _make(0.15) ?? style,
        disabled: style.desaturatedLayer(),
      });
    },
  },
  parent: (data) => data.neutral,
  compute: (_: {
    neutral: LayerColor;
    hover: LayerColor;
    active: LayerColor;
    disabled: LayerColor;
  }) => ({}),
});

export type StateColor = (typeof StateColor)["_typeHint"]["color"];
