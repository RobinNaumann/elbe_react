import type {
  ElbeColorKinds,
  ElbeColorManners,
  ElbeColorModes,
  ElbeColorSchemes,
} from "../../theme/colors";
import type { ElbeChildren } from "../../util/util";
import { applyProps, type ElbeProps } from "./box";

export function Card({
  mode,
  scheme = "primary",
  kind,
  manner,
  padding = 1,
  margin = 0,
  onTap,
  onLongTap,
  children,
  ...elbe
}: {
  mode?: ElbeColorModes;
  scheme?: ElbeColorSchemes;
  kind?: ElbeColorKinds;
  manner?: ElbeColorManners;
  padding?: number;
  margin?: number;
  onTap?: () => void;
  onLongTap?: () => void;
  children?: ElbeChildren;
} & ElbeProps) {
  return (
    <div
      {...applyProps(elbe, ["card", mode, scheme, kind, manner], {
        padding: `${padding}rem`,
        margin: `${margin}rem`,
      })}
      onClick={onTap}
      onContextMenu={onLongTap}
    >
      {children}
    </div>
  );
}
