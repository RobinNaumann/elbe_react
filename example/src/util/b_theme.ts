import {
  colors,
  CtrlBit,
  ElbeThemeConfig,
  ElbeThemeSeed,
  LayerColor,
  makeThemeConfig,
  WorkerControl,
} from "elbe-ui";

type Inputs = {};
type Data = {
  config: Partial<ElbeThemeConfig>;
  seed: ElbeThemeSeed;
};

class _Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    return {
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
    };
  }

  setConfig(c: Partial<ElbeThemeConfig>) {
    this.bit.map({
      onData: (v) => {
        this.bit.emit({
          ...v,
          config: {
            ...v.config,
            ...c,
          },
        });
      },
    });
  }

  setSeed(s: Partial<ElbeThemeSeed>) {
    this.bit.map({
      onData: (v) => {
        this.bit.emit({
          ...v,
          seed: {
            ...v.seed,
            ...s,
          },
        });
      },
    });
  }
}

export const ThemeBit = CtrlBit<Inputs, Data, _Ctrl>(
  (p, b) => new _Ctrl(p, b),
  "Theme"
);
