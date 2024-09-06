import React from "preact/compat";
import type { ElbeColorManners, ElbeColorStyles } from "../color_theme";
import type { ElbeChild } from "../util/util";
import { applyProps, type ElbeProps } from "./box";

export type IconChild = ElbeChild | ((_: any) => ElbeChild);

export type IconButtonProps = {
  icon?: IconChild;
  colorStyle?: ElbeColorStyles;

  onTap?: () => void;
} & ElbeProps;

export class IconButton extends React.Component<
  IconButtonProps & { colorManner?: ElbeColorManners }
> {
  static major = (p: IconButtonProps) => _btn(p, "major");
  static minor = (p: IconButtonProps) => _btn(p, "minor");
  static action = (p: IconButtonProps) => _btn(p, "action");
  static integrated = (p: IconButtonProps) => _btn(p, "integrated");

  render() {
    return _btn(this.props, this.props.colorManner);
  }
}

function _btn(
  { icon, onTap, ...elbe }: IconButtonProps,
  colorManner: ElbeColorManners = "major"
) {
  return (
    <button
      {...applyProps(
        elbe,
        [
          "row",
          "main-center",
          "gap-half",
          elbe.colorStyle,
          colorManner,
          !onTap && "disabled",
        ],
        {
          border: "none",
          borderRadius: "3rem",
          height: "3rem",
          width: "3rem",
        }
      )}
      onClick={() => onTap && onTap()}
    >
      {typeof icon === "function" ? icon({}) : icon}
    </button>
  );
}
