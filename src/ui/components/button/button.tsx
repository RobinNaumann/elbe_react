import { Component } from "preact";
import type { ElbeColorKinds, ElbeColorManners } from "../../theme/colors";
import { _ElbeErr } from "../../util/error_view";
import { applyProps, type ElbeProps } from "../base/box";
import type { IconChild } from "./icon_button";

export type ButtonProps = ElbeProps & {
  kind?: ElbeColorKinds;
  onTap?: (e: Event) => void;
} & { icon?: IconChild; label?: string; children?: any };

export class Button extends Component<
  ButtonProps & {
    manner: ElbeColorManners;
  }
> {
  static major = (p: ButtonProps) => _btn(p, "major");
  static minor = (p: ButtonProps) => _btn(p, "minor");
  static flat = (p: ButtonProps) => _btn(p, "flat");
  static plain = (p: ButtonProps) => _btn(p, "plain");

  render() {
    return _btn(this.props, this.props.manner);
  }
}

function _btn(
  { kind, onTap, icon, label, children, ...elbe }: ButtonProps,
  manner: ElbeColorManners
) {
  return label || icon || children ? (
    <button
      {...applyProps(elbe, [
        "row",
        "gap-half",
        "main-center",
        kind ?? (manner != "plain" && "accent"),
        manner,
        !onTap && "disabled",
      ])}
      disabled={!onTap}
      onClick={(e) => onTap && onTap(e)}
    >
      {typeof icon === "function" ? icon({}) : icon}
      {label && <span>{label}</span>}
      {children}
    </button>
  ) : (
    _ElbeErr("Button requires either an icon and or a label, or a child")
  );
}
