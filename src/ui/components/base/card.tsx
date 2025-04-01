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
  frosted,
  bordered,
  sharp,
  disabled,
  overflow,
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
  frosted?: boolean;
  bordered?: boolean;
  sharp?: boolean;
  disabled?: boolean;
  overflow?: "hidden" | "scroll" | "auto";
  children?: ElbeChildren;
} & ElbeProps) {
  return (
    <div
      {...applyProps(
        "card",
        elbe,
        [
          "card",
          mode,
          scheme,
          kind,
          manner,
          frosted && "frosted",
          bordered && "bordered",
          sharp && "sharp",
          disabled && "disabled",
        ],
        {
          padding: `${padding}rem`,
          margin: `${margin}rem`,
          overflow: overflow,
        }
      )}
      onClick={onTap}
      onContextMenu={onLongTap}
    >
      {children}
    </div>
  );
}
