import { ElbeSubThemeData } from "../theme";

const _data = {
  size: 16,
  radius: 0.75,
  padding: 1,
  borderWidth: 0.125,
};

export const geometryThemeData: ElbeSubThemeData<typeof _data> = {
  seed: _data,
  _configType: _data,
  compute: (c) => c,
  asCss: (c) => ({}),
  asCssContext(c) {
    document.documentElement.style.fontSize = `${c.size}px`;
    return {
      size: `${c.size}px`,
      padding: `${c.padding}rem`,
      "border-radius": `${c.radius}rem`,
      "border-width": `${c.borderWidth}rem`,
    };
  },
  fromSeed: (seed) => seed,
};
