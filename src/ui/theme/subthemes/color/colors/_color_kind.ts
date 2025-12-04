import { LayerColor } from "./_color_layer";
import { MannerColor } from "./_color_manner";
import { defineColor } from "./_colordef";
import { ColorThemeSeed } from "./colors";

export const KindColor = defineColor({
  type: "kind",
  static: {
    generate(
      path: string[],
      seed: ColorThemeSeed,
      base: LayerColor
    ): KindColor {
      return KindColor.new({
        //plain: MannerColor.generate([...path, "plain"], seed, base),
        accent: MannerColor.generate(
          [...path, "accent"],
          seed,
          base,
          seed.kind.accent({
            path,
            seed,
            base,
            style: LayerColor.asLayer(seed.accent),
          })
        ),
        info: MannerColor.generate(
          [...path, "info"],
          seed,
          base,
          seed.kind.info({
            path,
            seed,
            base,
            style: LayerColor.asLayer(seed.info),
          })
        ),
        success: MannerColor.generate(
          [...path, "success"],
          seed,
          base,
          seed.kind.success({
            path,
            seed,
            base,
            style: LayerColor.asLayer(seed.success),
          })
        ),
        warning: MannerColor.generate(
          [...path, "warning"],
          seed,
          base,
          seed.kind.warning({
            path,
            seed,
            base,
            style: LayerColor.asLayer(seed.warning),
          })
        ),
        error: MannerColor.generate(
          [...path, "error"],
          seed,
          base,
          seed.kind.error({
            path,
            seed,
            base,
            style: LayerColor.asLayer(seed.error),
          })
        ),
      });
    },
  },
  parent: (data) => data.accent,
  compute: (_: {
    //plain: MannerColor;
    accent: MannerColor;
    info: MannerColor;
    success: MannerColor;
    warning: MannerColor;
    error: MannerColor;
  }) => ({}),
});

export type KindColor = (typeof KindColor)["_typeHint"]["color"];
