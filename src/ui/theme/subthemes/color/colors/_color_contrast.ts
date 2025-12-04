import { LayerColor } from "./_color_layer";
import { ModeColor } from "./_color_mode";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const ContrastColor = defineColor({
  type: "contrast",
  static: {
    generate(path: string[], seed: ColorThemeSeed): ContrastColor {
      const p = { path, base: LayerColor.asLayer(seed.base), seed };
      return ContrastColor.new({
        normal: ModeColor.generate(path, seed.contrast.normal(p)),
        highvis: ModeColor.generate(
          [...path, "highvis"],
          seed.contrast.highvis(p)
        ),
      });
    },
  },
  parent: (data) => data.normal,
  compute: (_: { normal: ModeColor; highvis: ModeColor }) => ({}),
});

export type ContrastColor = (typeof ContrastColor)["_typeHint"]["color"];
