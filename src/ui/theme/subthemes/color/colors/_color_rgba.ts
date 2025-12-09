import { hslToRgb, rgbToHsl } from "colors-convert";
import { clamp } from "../../../../..";
import { defineColor } from "./_colordef";

export const RGBAColor = defineColor({
  type: "rgba",
  static: {
    rgba: (
      red: number,
      green: number,
      blue: number,
      alpha: number
    ): RGBAColor => {
      return RGBAColor.new({
        red,
        green,
        blue,
        alpha,
      });
    },
    fromHex: (hex: string) => {
      if (hex.startsWith("#") === false) {
        throw new Error("Invalid hex color");
      }
      let r = 0,
        g = 0,
        b = 0,
        a = 1;

      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }

      return RGBAColor.rgba(r, g, b, a);
    },
  },
  parent: (_) => ({}),
  compute: (value: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }) => {
    function luminance() {
      const [lr, lg, lb] = [value.red, value.green, value.blue].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return lr * 0.2126 + lg * 0.7152 + lb * 0.0722;
    }

    function desaturated(f: number = 1) {
      const avg = (value.red + value.green + value.blue) / 3;
      return RGBAColor.rgba(
        value.red + (avg - value.red) * f,
        value.green + (avg - value.green) * f,
        value.blue + (avg - value.blue) * f,
        value.alpha
      );
    }

    function withAlpha(alpha: number) {
      return RGBAColor.new({ ...value, alpha });
    }

    function inter(other: RGBAColor, factor: number) {
      return RGBAColor.rgba(
        value.red + (other.red - value.red) * factor,
        value.green + (other.green - value.green) * factor,
        value.blue + (other.blue - value.blue) * factor,
        value.alpha + (other.alpha - value.alpha) * factor
      );
    }

    function mirrorBrightness(factor: number = 1) {
      const hsl = rgbToHsl({ r: value.red, g: value.green, b: value.blue });
      const newL = (50 - hsl.l) * (factor * 2 - 1) + 50;
      const rgb = hslToRgb({
        ...hsl,
        l: clamp(newL, 0, 100),
        s: clamp(hsl.s, 0, 100),
        //s: -Math.abs(2 * newL - 100) + 100,
      });
      return RGBAColor.rgba(rgb.r, rgb.g, rgb.b, value.alpha);
    }

    function hasWCAGContrast(color: RGBAColor) {
      return contrastRatio(color) >= 3;
    }

    function contrastRatio(color: RGBAColor): number {
      const l1 = luminance();
      const l2 = color.luminance();
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    function hex() {
      const c = [value.red, value.green, value.blue].map((v) =>
        Math.round(v).toString(16).padStart(2, "0")
      );

      const aHex = Math.round(value.alpha * 255)
        .toString(16)
        .padStart(2, "0");

      return `#${c.join("")}${aHex}`;
    }

    return {
      asCss: () =>
        `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`,
      hex,
      isDark: () => luminance() < 0.5,
      luminance,
      desaturated,
      withAlpha,

      inter,
      mirrorBrightness,
      hasWCAGContrast,
      contrastRatio,
    };
  },
});

export type RGBAColor = (typeof RGBAColor)["_typeHint"]["color"];
