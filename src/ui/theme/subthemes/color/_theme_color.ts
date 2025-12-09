import { ElbeSubThemeData } from "../../theme";
import { _seed } from "./_seed";
import { ContrastColor } from "./colors/_color_contrast";
import { LayerColor } from "./colors/_color_layer";
import { StateColor } from "./colors/_color_state";
import { ColorSelection, ColorThemeSelection } from "./colors/colors";

const _data = {
  values: {
    root: {
      base: LayerColor.fromBack("#ffffff"),
      accent: LayerColor.fromBack("#0077ffff"),
      info: LayerColor.fromBack("#0000FF"),
      success: LayerColor.fromBack("#00ff00"),
      warning: LayerColor.fromBack("#ffa600ff"),
      error: LayerColor.fromBack("#ff0000"),
    },
    hirarchy: ContrastColor.generate([], _seed),
  },
  selection: {
    contrast: "normal",
    mode: "dark",
    scheme: "primary",
    kind: "accent",
    manner: "plain",
  } as ColorThemeSelection,
};

const _current = (t: typeof _data) => {
  function parseColor(sc: typeof t.selection): StateColor {
    //if (isLayerColor(sc)) return sc;
    if (!t.values?.hirarchy) {
      throw new Error("ColorTheme: No hirarchy defined");
    }

    const mode = t.values.hirarchy[sc?.contrast ?? "normal"];
    const scheme = mode[sc?.mode ?? "light"];
    const kind = scheme[sc?.scheme ?? "primary"];
    const manner = kind[sc?.kind ?? "accent"];
    let color: StateColor | null =
      manner[(sc?.manner as ColorSelection.Manners) ?? "flat"];

    if (!color || !StateColor.is(manner)) {
      color = manner["flat"];
    }

    if (!color || !StateColor.is(color)) {
      return StateColor.fromBack("#ff00ff");
    }
    return color;
  }

  return {
    ...t,
    currentColor: parseColor(t.selection),
    /** shorthand for color.selection.contrast == "highvis" */
    isContrast: t.selection.contrast == "highvis",
    /** shorthand for color.selection.mode == "dark" */
    isDark: t.selection.mode == "dark",
  };
};

export const colorThemeData: ElbeSubThemeData<
  ReturnType<typeof _current>,
  typeof _seed,
  typeof _data
> = {
  seed: _seed,
  _configType: _data,
  compute: _current,
  asCss: (c) => ({ color: c.currentColor.front.asCss() }),
  asCssContext: (c) => ({
    front: c.currentColor.front.asCss(),
    back: c.currentColor.back.asCss(),
    border: c.currentColor.border?.asCss() ?? "transparent",
    outline: c.values.root.accent.back.asCss(),

    "hover-front": c.currentColor.hover?.front.asCss() ?? "",
    "hover-back": c.currentColor.hover?.back.asCss() ?? "",
    "hover-border": c.currentColor.hover?.border?.asCss() ?? "",

    "active-front": c.currentColor.active?.front.asCss() ?? "",
    "active-back": c.currentColor.active?.back.asCss() ?? "",
    "active-border": c.currentColor.active?.border?.asCss() ?? "",
  }),
  fromSeed: (seed) => {
    return {
      values: {
        root: {
          base: LayerColor.fromBack(seed.base),
          accent: LayerColor.fromBack(seed.accent),
          info: LayerColor.fromBack(seed.info),
          success: LayerColor.fromBack(seed.success),
          warning: LayerColor.fromBack(seed.warning),
          error: LayerColor.fromBack(seed.error),
        },
        hirarchy: ContrastColor.generate([], seed),
      },
      selection: seed.selection ?? _data.selection,
    };
  },
};
