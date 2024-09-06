import React from "preact/compat";
import type { ElbeColorManners, ElbeColorStyles } from "../color_theme";
import { _ElbeErr } from "../util/error_view";
import { applyProps, type ElbeProps } from "./box";
import type { IconChild } from "./icon_button";

export type ButtonProps = ElbeProps & {
  colorStyle?: ElbeColorStyles;
  onTap?: () => void;
} & (
    | { icon?: IconChild; message: string }
    | {
        icon: IconChild;
        message?: string;
      }
  );

export class Button extends React.Component<
  ButtonProps & {
    colorManner: ElbeColorManners;
  }
> {
  static major = (p: ButtonProps) => _btn(p, "major");
  static minor = (p: ButtonProps) => _btn(p, "minor");
  static action = (p: ButtonProps) => _btn(p, "action");
  static integrated = (p: ButtonProps) => _btn(p, "integrated");

  render() {
    return _btn(this.props, this.props.colorManner);
  }
}

function _btn(
  { colorStyle, onTap, icon, message, ...elbe }: ButtonProps,
  colorManner: ElbeColorManners
) {
  return message || icon ? (
    <button
      {...applyProps(
        elbe,
        [
          "row",
          "main-center",
          "gap-half",
          colorStyle ?? "accent",
          colorManner,
          !onTap && "disabled",
        ],
        {
          border: "none",
        }
      )}
      onClick={() => onTap && onTap()}
    >
      {typeof icon === "function" ? icon({}) : icon}
      {message && <span>{message}</span>}
    </button>
  ) : (
    _ElbeErr("Button requires either an icon or a message")
  );
}
