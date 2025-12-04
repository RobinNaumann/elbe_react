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
      style?: LayerColor
    ) {
      return MannerColor.new({
        major: style
          ? StateColor.generate(
              [...path, "major"],
              seed,
              base,
              seed.variant.major({ path, seed, base, style })
            )
          : null,
        minor: style
          ? StateColor.generate(
              [...path, "minor"],
              seed,
              base,
              seed.variant.minor({ path, seed, base, style })
            )
          : null,
        flat: StateColor.generate(
          [...path, "flat"],
          seed,
          base,
          seed.variant.flat({ path, seed, base, style }),
          true
        ),
      });
    },
  },
  parent: (p) => p.flat,
  compute: (_: {
    major: StateColor | null;
    minor: StateColor | null;
    flat: StateColor;
  }) => ({}),
});

export type MannerColor = (typeof MannerColor)["_typeHint"]["color"];
