import { RGBAColor } from "./_color_rgba";
import { defineColor, ElbeColor } from "./_colordef";
import { colors, HexColor } from "./colors";

export const LayerColor = defineColor({
  type: "layer",
  static: {
    asLayer: (v: any): LayerColor => {
      if (LayerColor.is(v)) {
        return v;
      } else if (typeof v === "string") {
        return LayerColor.fromBack(RGBAColor.fromHex(v));
      } else {
        throw new Error("Cannot convert to LayerColor");
      }
    },
    fromBack: (
      back: RGBAColor | HexColor | ElbeColor<"layer", any, {}>,
      c?: { front?: RGBAColor; border?: RGBAColor }
    ) => {
      if (LayerColor.is(back)) return back;
      const backColor =
        typeof back === "string" ? RGBAColor.fromHex(back) : back;
      const front = backColor.isDark() ? colors.white : colors.black;

      return LayerColor.new({
        back: backColor,
        front: c?.front ?? front,
        border: c?.border ?? front,
      });
    },
  },
  parent: (data) => data.back,
  compute: (data: {
    back: RGBAColor;
    front: RGBAColor;
    border?: RGBAColor | null;
    borderContext?: RGBAColor | null;
  }) => {
    function interLayer(other: LayerColor, factor: number): LayerColor {
      return LayerColor.new({
        back: data.back.inter(other.back, factor),
        front: data.front.inter(other.front, factor),
        border: data.border?.inter(other.border ?? colors.transparent, factor),
        borderContext: data.borderContext?.inter(
          other.borderContext ?? colors.transparent,
          factor
        ),
      });
    }

    function mirrorBrightnessLayer(
      factor?: number,
      factorBack?: number
    ): LayerColor {
      return LayerColor.new({
        back: data.back.mirrorBrightness(factorBack ?? factor),
        front: data.front.mirrorBrightness(factor),
        border: data.border?.mirrorBrightness(factor),
        borderContext: data.borderContext?.mirrorBrightness(factor),
      });
    }

    function desaturatedLayer(): LayerColor {
      return LayerColor.new({
        back: data.back.desaturated(),
        front: data.front.desaturated(),
        border: data.border?.desaturated(),
        borderContext: data.borderContext?.desaturated(),
      });
    }

    function withBack(back: RGBAColor): LayerColor {
      return LayerColor.new({
        back,
        front: data.front,
        border: data.border,
        borderContext: data.borderContext,
      });
    }

    function withFront(front: RGBAColor): LayerColor {
      return LayerColor.new({
        back: data.back,
        front,
        border: data.border,
        borderContext: data.borderContext,
      });
    }

    function withBorder(border: RGBAColor): LayerColor {
      return LayerColor.new({
        back: data.back,
        front: data.front,
        border,
        borderContext: data.borderContext,
      });
    }

    return {
      interLayer,
      mirrorBrightnessLayer,
      desaturatedLayer,
      withBack,
      withFront,
      withBorder,
    };
  },
});

export type LayerColor = (typeof LayerColor)["_typeHint"]["color"];
