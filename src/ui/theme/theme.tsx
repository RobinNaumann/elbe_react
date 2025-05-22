import { useEffect } from "preact/hooks";
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

  _addTooltip();

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

function _addTooltip() {
  return useEffect(() => {
    const _gap = 8;

    const onHover = (e: any) => {
      const target = (e.target as Element | null)?.closest("[data-tooltip]");
      if (!target) return;

      // remove existing tooltip
      const existingTooltip = document.querySelector("._elbe_tooltip");
      if (existingTooltip) existingTooltip.remove();

      // create new tooltip
      let tooltip = document.createElement("div");
      tooltip.className = "_elbe_tooltip";
      tooltip.textContent = target.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);

      const rect = target.getBoundingClientRect();
      let top = rect.top - tooltip.offsetHeight - _gap;
      let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;

      // Adjust if out of viewport
      if (top < 0) top = rect.bottom + _gap;
      if (left < 0) left = _gap;
      if (left + tooltip.offsetWidth > window.innerWidth)
        left = window.innerWidth - tooltip.offsetWidth - _gap;

      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;

      // remove tooltip when target is removed or mouse leaves
      const observer = new MutationObserver(() => {
        if (
          !document.body.contains(target) ||
          (target as HTMLElement) === null
        ) {
          tooltip.remove();
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      target.addEventListener("mouseleave", () => tooltip.remove(), {
        once: true,
      });
    };
    document.addEventListener("mouseover", onHover);
    return () => document.removeEventListener("mouseover", onHover);
  });
}
