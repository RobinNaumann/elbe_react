import "../../elbe.css";
import { ToDo } from "../components/dev/todo";
import { ColorTheme } from "./colors";
import { GeometryTheme, type GeometryThemeSeed } from "./geometry_theme";
import { PartialColorThemeSeed } from "./seed";
import {
  _configCss,
  ElbeThemeConfig,
  makeThemeConfig,
  ThemeConfigContext,
  ThemeContext,
} from "./theme_context";
import { TypeTheme, type TypeThemeSeed } from "./type_theme";

export * from "./color_theme";
export * from "./colors";
export * from "./geometry_theme";
export * from "./type_theme";

export interface ElbeThemeSeed {
  color?: Partial<PartialColorThemeSeed>;
  type?: Partial<TypeThemeSeed>;
  geometry?: Partial<GeometryThemeSeed>;
}

export class ElbeThemeData {
  constructor(
    public readonly color: ColorTheme,
    public readonly type: TypeTheme,
    public readonly geometry: GeometryTheme
  ) {}

  public asCss(): string {
    const inner = [this.color, this.type, this.geometry]
      .map((s) => s.asCss())
      .join("\n");
    return `.elbe {${inner}}`;
  }

  public static fromSeed(seed: ElbeThemeSeed): ElbeThemeData {
    return new ElbeThemeData(
      ColorTheme.generate(seed.color),
      TypeTheme.generate(seed.type),
      GeometryTheme.generate(seed.geometry)
    );
  }
}

export function ElbeTheme(
  p: {
    children: any;
    todoOverlay?: boolean;
  } & Partial<ElbeThemeConfig> &
    ({ theme: ElbeThemeData } | { seed?: ElbeThemeSeed })
) {
  const theme = "theme" in p ? p.theme : ElbeThemeData.fromSeed(p.seed ?? {});

  const config: ElbeThemeConfig = makeThemeConfig(p);

  return (
    <div
      class={`elbe ${config.dark ? "dark" : ""} ${
        config.highVis ? "highvis" : ""
      } ${config.reducedMotion ? "reduced_motion" : ""}`}
    >
      {p.todoOverlay && <ToDo.Overlay />}

      <style>{theme.asCss()}</style>
      <style>{_configCss(theme, config)}</style>

      <ThemeConfigContext.Provider value={config}>
        <ThemeContext.Provider value={theme}>
          {p.children}
        </ThemeContext.Provider>
      </ThemeConfigContext.Provider>
    </div>
  );
}
