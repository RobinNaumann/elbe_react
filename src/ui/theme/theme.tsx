import { ToDo } from "../components/dev/todo";
import { ColorTheme, type ColorThemeSeed } from "./colors";
import { GeometryTheme, type GeometryThemeSeed } from "./geometry_theme";
import { TypeTheme, type TypeThemeSeed } from "./type_theme";

export * from "./color_theme";
export * from "./colors";
export * from "./geometry_theme";
export * from "./type_theme";

export interface ElbeThemeSeed {
  color?: Partial<ColorThemeSeed>;
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

  public static fromSeed(seed: ElbeThemeSeed): ElbeThemeData {
    return new ElbeThemeData(
      ColorTheme.generate(seed.color),
      TypeTheme.generate(seed.type),
      GeometryTheme.generate(seed.geometry)
    );
  }
}

export function ElbeTheme(
  p: { children: any; dark?: boolean; todoOverlay?: boolean } & (
    | { theme: ElbeThemeData }
    | { seed?: ElbeThemeSeed }
  )
) {
  const theme = "theme" in p ? p.theme : ElbeThemeData.fromSeed(p.seed ?? {});
  return (
    <div class={`elbe ${p.dark ? "dark" : ""}`}>
      {p.todoOverlay && <ToDo.Overlay />}

      <style>{theme.asCss()}</style>
      {p.children}
    </div>
  );
}
