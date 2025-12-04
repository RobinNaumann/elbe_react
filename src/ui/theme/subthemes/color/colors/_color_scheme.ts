import { KindColor } from "./_color_kind";
import { LayerColor } from "./_color_layer";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const SchemeColor = defineColor({
  type: "state",
  static: {
    generate(
      path: string[],
      seed: ColorThemeSeed,
      base: LayerColor
    ): SchemeColor {
      const m = seed.scheme;
      return SchemeColor.new({
        primary: KindColor.generate(
          [...path, "primary"],
          seed,
          m.primary({ path, seed, base })
        ),
        secondary: KindColor.generate(
          [...path, "secondary"],
          seed,
          m.secondary({ path, seed, base })
        ),
        inverse: KindColor.generate(
          [...path, "inverse"],
          seed,
          m.inverse({ path, seed, base })
        ),
      });
    },
  },
  parent: (data) => data.primary,
  compute: (_: {
    primary: KindColor;
    secondary: KindColor;
    inverse: KindColor;
  }) => ({}),
});

export type SchemeColor = (typeof SchemeColor)["_typeHint"]["color"];
