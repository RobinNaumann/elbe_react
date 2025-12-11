import { LayerColor } from "./_color_layer";
import { StateColor } from "./_color_state";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const MannerColor = defineColor({
  type: "manner",
  static: {
    generate(
      path: string[],
      seed: ColorThemeSeed,
      base: LayerColor,
      style: LayerColor
    ) {
      return MannerColor.new({
        major: StateColor.generate(
          [...path, "major"],
          seed,
          base,
          seed.manner.major({ path, seed, base, style })!
        ),
        minor: StateColor.generate(
          [...path, "minor"],
          seed,
          base,
          seed.manner.minor({ path, seed, base, style })
        ),
        flat: StateColor.generate(
          [...path, "flat"],
          seed,
          base,
          seed.manner.flat({ path, seed, base, style }),
          true
        ),
        plain: StateColor.generate([...path, "plain"], seed, base, base, true),
      });
    },
  },
  parent: (p) => p.flat,
  compute: (_: {
    major: StateColor;
    minor: StateColor;
    flat: StateColor;
    plain: StateColor;
  }) => ({}),
});

export type MannerColor = (typeof MannerColor)["_typeHint"]["color"];
