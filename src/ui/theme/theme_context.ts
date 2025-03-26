import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { ElbeThemeData } from "./theme";

export interface ElbeThemeConfig {
  highVis: boolean;
  dark: boolean;
  reducedMotion: boolean;
}

export const ThemeConfigContext = createContext<ElbeThemeConfig>({
  highVis: false,
  dark: false,
  reducedMotion: false,
});

export const ThemeContext = createContext<ElbeThemeData>(
  ElbeThemeData.fromSeed({})
);

export function useThemeConfig() {
  return useContext(ThemeConfigContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
