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
  compute: (data: { back: RGBAColor; front: RGBAColor; border: RGBAColor }) => {
    function interLayerLayer(
      other: LayerColor,
      factor: number,
      factorFront?: number,
      factorBorder?: number
    ): LayerColor {
      return LayerColor.new({
        back: data.back.inter(other.back, factor),
        front: data.front.inter(other.front, factorFront ?? factor),
        border: data.border.inter(
          other.border ?? colors.transparent,
          factorBorder ?? factor
        ),
      });
    }

    function interLayer(
      other: RGBAColor,
      factor: number,
      factorFront?: number,
      factorBorder?: number
    ): LayerColor {
      return LayerColor.new({
        back: data.back.inter(other, factor),
        front: data.front.inter(other, factorFront ?? factor),
        border: data.border.inter(
          other ?? colors.transparent,
          factorBorder ?? factor
        ),
      });
    }

    function mirrorBrightnessLayer(
      factor?: number,
      factorBack?: number,
      factorBorder?: number
    ): LayerColor {
      return LayerColor.new({
        back: data.back.mirrorBrightness(factorBack ?? factor),
        front: data.front.mirrorBrightness(factor),
        border: data.border?.mirrorBrightness(factorBorder ?? factor),
      });
    }

    function desaturatedLayer(): LayerColor {
      return LayerColor.new({
        back: data.back.desaturated(),
        front: data.front.desaturated(),
        border: data.border?.desaturated(),
      });
    }

    function withBack(back: RGBAColor): LayerColor {
      return LayerColor.new({
        back,
        front: data.front,
        border: data.border,
      });
    }

    function withFront(front: RGBAColor): LayerColor {
      return LayerColor.new({
        back: data.back,
        front,
        border: data.border,
      });
    }

    function withBorder(border: RGBAColor): LayerColor {
      return LayerColor.new({
        back: data.back,
        front: data.front,
        border,
      });
    }

    return {
      interLayer,
      interLayerLayer,
      mirrorBrightnessLayer,
      desaturatedLayer,
      withBack,
      withFront,
      withBorder,
    };
  },
});

export type LayerColor = (typeof LayerColor)["_typeHint"]["color"];
