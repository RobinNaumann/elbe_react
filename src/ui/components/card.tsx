import type {
  ElbeColorManners,
  ElbeColorModes,
  ElbeColorStyles,
  ElbeColorThemes,
} from "../color_theme";
import type { ElbeChildren } from "../util/util";
import { applyProps, type ElbeProps } from "./box";

export function Card({
  mode,
  colorScheme = "primary",
  colorStyle,
  colorManner,
  padding = 1,
  margin = 0,
  onTap,
  onLongTap,
  children,
  ...elbe
}: {
  mode?: ElbeColorModes;
  colorScheme?: ElbeColorThemes;
  colorStyle?: ElbeColorStyles;
  colorManner?: ElbeColorManners;
  padding?: number;
  margin?: number;
  onTap?: () => void;
  onLongTap?: () => void;
  children: ElbeChildren;
} & ElbeProps) {
  return (
    <div
      {...applyProps(
        elbe,
        ["card", colorScheme, colorStyle, colorManner, mode],
        { padding: `${padding}rem`, margin: `${margin}rem` }
      )}
      onClick={onTap}
      onContextMenu={onLongTap}
    >
      {children}
    </div>
  );
}
