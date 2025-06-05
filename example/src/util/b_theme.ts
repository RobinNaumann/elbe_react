import {
  colors,
  createBit,
  ElbeThemeConfig,
  ElbeThemeSeed,
  LayerColor,
  makeThemeConfig,
} from "elbe-ui";

type Data = {
  config: Partial<ElbeThemeConfig>;
  seed: ElbeThemeSeed;
};

export const ThemeBit = createBit({
  debugLabel: "ThemeBit",
  worker: () =>
    ({
      config: makeThemeConfig({}),
      seed: {
        color: {
          accent: LayerColor.fromBack(colors.blueAccent),
        },
        type: {
          heading: {
            bold: true,
            family: ["Calistoga", "Arial", "sans-serif"],
            size: 2.2,
          },
        },
        geometry: {
          radius: 0.75,
          borderWidth: 0.125,
        },
      },
    } as Data),
  useHistory: false,
  control: ({ act, parameters }) => ({
    setConfig: (c: Partial<ElbeThemeConfig>) =>
      act(
        (v) => ({
          ...v,
          config: {
            ...v.config,
            ...c,
          },
        }),
        true
      ),
    setSeed: (s: Partial<ElbeThemeSeed>) =>
      act(
        (v) => ({
          ...v,
          seed: {
            ...v.seed,
            ...s,
          },
        }),
        true
      ),
  }),
});
