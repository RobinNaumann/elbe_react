export interface GeometryThemeSeed {
  size: number;
  radius: number;
  padding: number;
  borderWidth: number;
}

export class GeometryTheme {
  constructor(
    public readonly size: number,
    public readonly radius: number,
    public readonly padding: number,
    public readonly borderWidth: number
  ) {}

  public asCss(): string {
    return (
      `:root{` +
      `--g-size: ${this.size}px;` +
      `--g-radius: ${this.radius}rem;` +
      `--g-padding: ${this.padding}rem;` +
      `--g-border-width: ${this.borderWidth}rem;` +
      "}"
    );
  }

  public static generate(seed?: Partial<GeometryTheme>): GeometryTheme {
    const s = geometryThemePreset(seed);
    return new GeometryTheme(s.size, s.radius, s.padding, s.borderWidth);
  }
}

export function geometryThemePreset(
  merge?: Partial<GeometryThemeSeed>
): GeometryThemeSeed {
  const seed = merge ?? {};
  return {
    size: seed.size ?? 16,
    radius: seed.radius ?? 0.75,
    padding: seed.padding ?? 1,
    borderWidth: seed.borderWidth ?? 0.125,
  };
}
