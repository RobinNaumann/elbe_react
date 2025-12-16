import { ElbeSubThemeData } from "../theme";
import { ColorSelection } from "./color/colors/colors";

const _theme = {
  scheme: "secondary" as ColorSelection.Schemes,
  elevated: false as boolean,
  sharp: false as boolean,
};

export const menuThemeData: ElbeSubThemeData<typeof _theme, typeof _theme> = {
  seed: _theme,
  _configType: _theme,
  compute: (c) => c,
  asCss: (c) => ({}),
  fromSeed: (seed) => seed,
};
