import React, { Component, ComponentType } from "react";
import {
  ActionElbeProps,
  applyProps,
  ElbeProps,
  type ElbeChild,
  type ElbeColorKinds,
  type ElbeColorManners,
} from "../../..";

export type IconChild = ElbeChild | ((_: any) => ElbeChild);

export type IconButtonProps = {
  icon?: IconChild;
  kind?: ElbeColorKinds;
  transparent?: boolean;

  onTap?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & ActionElbeProps;

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
        "icon_button",
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
          backgroundColor: elbe.transparent ? "transparent" : undefined,
          border: "none",
          borderRadius: "3rem",
          height: "3rem",
          width: "3rem",
        }
      )}
      title={elbe.ariaLabel ?? undefined}
      onClick={(e) => onTap && onTap(e)}
    >
      <Icon icon={icon} />
    </button>
  );
}

export function Icon(p: { icon: IconChild } & ElbeProps) {
  if (!p.icon) return null;
  return (
    <div
      {...applyProps("icon", p, null, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      {_renderIcon(p.icon)}
    </div>
  );
}

export function _renderIcon(icon: IconChild | undefined) {
  if (!icon) return null;
  if (typeof icon === "function") return icon({});
  // check if it's a valid React element
  if (React.isValidElement(icon)) return icon;
  // return it as a component
  const Icon = icon as any as ComponentType<any>;
  return <Icon />;
}
