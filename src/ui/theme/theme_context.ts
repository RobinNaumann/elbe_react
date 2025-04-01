import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { ElbeThemeData } from "./theme";

export interface ElbeThemeConfig {
  highVis: boolean;
  dark: boolean;
  reducedMotion: boolean;
  scale: number;
}

export function makeThemeConfig(p: Partial<ElbeThemeConfig>) {
  return {
    highVis: p.highVis ?? false,
    dark: p.dark ?? false,
    reducedMotion: p.reducedMotion ?? false,
    scale: p.scale ?? 1,
  };
}

export const ThemeConfigContext = createContext<ElbeThemeConfig>(
  makeThemeConfig({})
);

export function _configCss(t: ElbeThemeData, c: ElbeThemeConfig): string {
  const cBack = c.dark ? t.color.color.dark : t.color.color.light;
  return `html,:root {
  font-size: ${c.scale * 16}px;
  ${cBack.asCss()};}`;
}

export const ThemeContext = createContext<ElbeThemeData>(
  ElbeThemeData.fromSeed({})
);

export function useThemeConfig() {
  return useContext(ThemeConfigContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
