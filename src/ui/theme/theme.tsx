import "../../elbe.css";
import { geometryThemeData } from "./subthemes/_theme_geometry";
import { motionThemeData } from "./subthemes/_theme_motion";
import { typeThemeData } from "./subthemes/_theme_type";
import { colorThemeData } from "./subthemes/color/_theme_color";

export type ElbeSubThemeData<
  Computed extends Dict<any>,
  Seed extends Dict<any> = Computed,
  Config extends Dict<any> = Computed
> = {
  seed: Seed;
  _configType: Config;
  compute: (data: Config) => Computed;
  fromSeed: (seed: Seed) => Config;
  asCss: (data: Computed) => React.CSSProperties;
  /**
   * entries will be converted into CSS custom properties.
   * Each key will be prefixed with '--elbe-<subtheme>-'.
   * All properties will cascade down to child elements.
   *
   * Example:
   * For subtheme 'color' and return value { "current-front": "#ff0000" }
   * the resulting CSS custom property will be '--elbe-color-current-front: #ff0000;'
   * @param data
   * @returns
   */
  asCssContext?: (data: Computed) => Dict<string | number>;
};

export type ElbeThemeData = {
  [key: string]: ElbeSubThemeData<any, any>;
};

export const elbeCoreThemes = {
  motion: motionThemeData,
  geometry: geometryThemeData,
  type: typeThemeData,
  color: colorThemeData,
  with: typeThemeData,
};

export type ElbeThemeDefinitions<T extends ElbeThemeData> =
  typeof elbeCoreThemes & T;

export type ElbeThemeConfig<T extends ElbeThemeData> = {
  [key in keyof ElbeThemeDefinitions<T>]: ElbeThemeDefinitions<T>[key]["_configType"];
};

export type ElbeThemeComputed<T extends ElbeThemeData> = {
  [key in keyof ElbeThemeDefinitions<T>]: ReturnType<
    ElbeThemeDefinitions<T>[key]["compute"]
  >;
};

export type ElbeThemeSeed<T extends ElbeThemeData> = {
  [key in keyof ElbeThemeDefinitions<T>]: Partial<
    ElbeThemeDefinitions<T>[key]["seed"]
  >;
};

export type ElbeThemeContextData<T extends ElbeThemeData> = {
  themeDefinitions: ElbeThemeDefinitions<T>;
  themeConfig: ElbeThemeConfig<T>;
  theme: ElbeThemeComputed<T>;
  useWith: (
    worker: (config: ElbeThemeConfig<T>) => Partial<ElbeThemeConfig<T>>,
    dependencies: any[]
  ) => ElbeThemeContextData<T>;
};
