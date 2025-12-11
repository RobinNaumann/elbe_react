import { colors, createBit, LayerColor, type ElbeThemeSeed } from "elbe-ui";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _empty = {};

type Data = {
  seed: ElbeThemeSeed<typeof _empty>;
};

export const ThemeBit = createBit({
  debugLabel: "ThemeBit",
  worker: () =>
    ({
      seed: {
        color: {
          accent: LayerColor.fromBack(colors.accent.blue),
          selection: {
            contrast: "normal",
            mode: "light",
            scheme: "primary",
            kind: "accent",
            manner: "plain",
            state: "neutral",
          },
        },
        type: {
          body: {
            family: ["Inter", "Arial", "sans-serif"],
          },
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
  control: ({ act }) => ({
    setSeed: (
      w: (
        v: ElbeThemeSeed<typeof _empty>
      ) => Partial<ElbeThemeSeed<typeof _empty>>
    ) =>
      act(
        (v) => ({
          ...v,
          seed: {
            ...v.seed,
            ...w(v.seed),
          },
        }),
        true
      ),
  }),
});
