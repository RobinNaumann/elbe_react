import { ElbeSubThemeData } from "../theme";

type _ToastAlignment =
  | "top_start"
  | "top_center"
  | "top_end"
  | "bottom_start"
  | "bottom_center"
  | "bottom_end";

const _theme = {
  alignment: "bottom_center" as _ToastAlignment,
  duration: 3000 as number,
};

export const toastThemeData: ElbeSubThemeData<typeof _theme, typeof _theme> = {
  seed: _theme,
  _configType: _theme,
  compute: (c) => c,
  asCss: (c) => ({}),
  fromSeed: (seed) => seed,
};
