import {
  colors,
  ColorThemeSeed,
  CtrlBit,
  ElbeThemeSeed,
  GeometryThemeSeed,
  LayerColor,
  TypeThemeSeed,
  WorkerControl,
} from "elbe-ui";

type Inputs = {};
type Data = {
  dark: boolean;
  highVis: boolean;
  seed: ElbeThemeSeed;
};

class _Ctrl extends WorkerControl<Inputs, Data> {
  async worker() {
    return {
      dark: false,
      highVis: false,
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

  setDark(dark: boolean) {
    this.bit.map({
      onData: (v) =>
        this.bit.emit({
          ...v,
          dark,
        }),
    });
  }

  setColor(s: Partial<ColorThemeSeed>) {
    this.bit.map({
      onData: (v) =>
        this.bit.emit({
          ...v,
          seed: {
            ...v.seed,
            color: {
              ...v.seed.color,
              ...s,
            },
          },
        }),
    });
  }

  setHighVis(highVis: boolean) {
    this.bit.map({
      onData: (v) =>
        this.bit.emit({
          ...v,
          highVis,
        }),
    });
  }

  setType(s: Partial<TypeThemeSeed>) {
    this.bit.map({
      onData: (v) =>
        this.bit.emit({
          ...v,
          seed: {
            ...v.seed,
            type: {
              ...v.seed.type,
              ...s,
            },
          },
        }),
    });
  }

  setGeometry(s: Partial<GeometryThemeSeed>) {
    this.bit.map({
      onData: (v) =>
        this.bit.emit({
          ...v,
          seed: {
            ...v.seed,
            geometry: {
              ...v.seed.geometry,
              ...s,
            },
          },
        }),
    });
  }
}

export const ThemeBit = CtrlBit<Inputs, Data, _Ctrl>(
  (p, b) => new _Ctrl(p, b),
  "ThemeBit"
);
