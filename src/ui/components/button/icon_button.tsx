import { Component } from "preact";
import {
  applyProps,
  type ElbeChild,
  type ElbeColorKinds,
  type ElbeColorManners,
  type ElbeProps,
} from "../../..";

export type IconChild = ElbeChild | ((_: any) => ElbeChild);

export type IconButtonProps = {
  icon?: IconChild;
  kind?: ElbeColorKinds;

  onTap?: (e: Event) => void;
} & ElbeProps;

export class IconButton extends Component<
  IconButtonProps & { manner?: ElbeColorManners }
> {
  static major = (p: IconButtonProps) => _btn(p, "major");
  static minor = (p: IconButtonProps) => _btn(p, "minor");
  static flat = (p: IconButtonProps) => _btn(p, "flat");
  static plain = (p: IconButtonProps) => _btn(p, "plain");

  render() {
    return _btn(this.props, this.props.manner);
  }
}

function _btn(
  { icon, onTap, ...elbe }: IconButtonProps,
  manner: ElbeColorManners = "major"
) {
  return (
    <button
      {...applyProps(
        elbe,
        [
          "row",
          "main-center",
          "gap-half",
          elbe.kind ?? (manner != "plain" && "accent"),
          manner,
          !onTap && "disabled",
        ],
        {
          border: "none",
          borderRadius: "3rem",
          height: "3rem",
          width: "3rem",
        }
      )}
      onClick={(e) => onTap && onTap(e)}
    >
      {typeof icon === "function" ? icon({}) : icon}
    </button>
  );
}
