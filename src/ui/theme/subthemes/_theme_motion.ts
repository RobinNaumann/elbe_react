import { ElbeSubThemeData } from "../theme";

const _seed = {
  reduced: false,
};

const _theme = {
  reduced: false,
};

export const motionThemeData: ElbeSubThemeData<typeof _theme, typeof _seed> = {
  seed: _seed,
  _configType: _theme,
  compute: (c) => c,
  asCss: (c) => ({}),
  fromSeed: (seed) => seed,
};
