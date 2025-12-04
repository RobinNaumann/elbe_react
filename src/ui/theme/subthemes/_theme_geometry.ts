import { ElbeSubThemeData } from "../theme";

const _data = {
  size: 16,
  radius: 0.75,
  padding: 1,
  borderWidth: 0.75,
};

export const geometryThemeData: ElbeSubThemeData<typeof _data> = {
  seed: _data,
  _configType: _data,
  compute: (c) => c,
  asCss: (c) => ({}),
  fromSeed: (seed) => seed,
};
