import {
  ElbeChildren,
  ElbeColorKinds,
  ElbeColorManners,
  ElbeColorModes,
  ElbeColorSchemes,
  ElbeProps,
  applyProps,
} from "../../..";

export const elevatedShadow = "0 0 15px rgba(0,0,0,.2)";

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
  elevated,
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
  elevated?: boolean;
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
          boxShadow: elevated ? elevatedShadow : undefined,
        }
      )}
      onClick={onTap}
      onContextMenu={onLongTap}
    >
      {children}
    </div>
  );
}
