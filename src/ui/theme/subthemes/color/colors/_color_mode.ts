import { LayerColor } from "./_color_layer";
import { SchemeColor } from "./_color_scheme";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const ModeColor = defineColor({
  type: "mode",
  static: {
    generate(path: string[], seed: ColorThemeSeed): ModeColor {
      return ModeColor.new({
        light: SchemeColor.generate(path, seed, LayerColor.asLayer(seed.base)),
        dark: SchemeColor.generate(
          [...path, "dark"],
          seed,
          seed.mode.dark({ path, seed, base: LayerColor.asLayer(seed.base) })
        ),
      });
    },
  },
  parent: (data) => data.light,
  compute: (data: { light: SchemeColor; dark: SchemeColor }) => ({}),
});

export type ModeColor = (typeof ModeColor)["_typeHint"]["color"];
