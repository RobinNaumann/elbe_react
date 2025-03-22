import "../../elbe.css";
import { ToDo } from "../components/dev/todo";
import { ColorTheme } from "./colors";
import { GeometryTheme, type GeometryThemeSeed } from "./geometry_theme";
import { PartialColorThemeSeed } from "./seed";
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
    return [this.color, this.type, this.geometry]
      .map((s) => s.asCss())
      .join("\n");
  }

  _pageBackground(dark?: boolean): string {
    const c = this.color.color;
    return `html,:root {${(!!dark ? c.dark : c.light).asCss()};`;
  }

  public static fromSeed(seed: ElbeThemeSeed, highVis: boolean): ElbeThemeData {
    return new ElbeThemeData(
      ColorTheme.generate(seed.color, highVis),
      TypeTheme.generate(seed.type),
      GeometryTheme.generate(seed.geometry)
    );
  }
}

export function ElbeTheme(
  p: {
    children: any;
    dark?: boolean;
    todoOverlay?: boolean;
    highVis?: boolean;
  } & ({ theme: ElbeThemeData } | { seed?: ElbeThemeSeed })
) {
  const theme =
    "theme" in p
      ? p.theme
      : ElbeThemeData.fromSeed(p.seed ?? {}, p.highVis ?? false);
  return (
    <div class={`elbe ${p.dark ? "dark" : ""} ${p.highVis ? "high_vis" : ""}`}>
      {p.todoOverlay && <ToDo.Overlay />}

      <style>{theme.asCss()}</style>
      <style>{theme._pageBackground(p.dark)}</style>
      {p.children}
    </div>
  );
}
