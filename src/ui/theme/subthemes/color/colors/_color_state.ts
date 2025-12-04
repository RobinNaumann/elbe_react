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
          borderContext: style.borderContext,
        });
      }

      return StateColor.new({
        neutral: style,
        hover: _make(0.05),
        active: _make(0.15),
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
