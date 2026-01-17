import React, { Component, ComponentType } from "react";
import {
  applyProps,
  ColorSelection,
  ElbeActionProps,
  ElbeProps,
  type ElbeChild,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { WithStateTheme } from "../base/state_builder";
import { WithTooltip } from "../tooltip";

export type IconChild = ElbeChild | ((_: any) => ElbeChild);

export type IconButtonProps = ElbeActionProps & {
  icon?: IconChild;
  kind?: ColorSelection.Kinds;
  transparent?: boolean;
  sharp?: boolean;

  onTap?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export class IconButton extends Component<
  IconButtonProps & { manner?: ColorSelection.Manners }
> {
  static major = (p: IconButtonProps) => <_btn {...p} manner="major" />;
  static minor = (p: IconButtonProps) => <_btn {...p} manner="minor" />;
  static flat = (p: IconButtonProps) => <_btn {...p} manner="flat" />;
  static plain = (p: IconButtonProps) => <_btn {...p} manner="plain" />;

  render() {
    return <_btn {...this.props} manner={this.props.manner ?? "plain"} />;
  }
}

function _btn({
  icon,
  onTap,
  manner,
  ...elbe
}: IconButtonProps & {
  manner: ColorSelection.Manners;
}) {
  const { _appThemeContext } = useApp({ useFallback: true });

  const baseTheme = _appThemeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          kind: elbe.kind ?? color.selection.kind ?? "accent",
          manner: manner,
        },
      },
    }),
    [elbe.kind, manner]
  );

  return (
    <WithTooltip tooltip={elbe.tooltip}>
      <WithStateTheme theme={baseTheme} disabled={!onTap}>
        <button
          {...applyProps("icon_button", elbe, ["elbe_colored"], {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "inherit",
            backgroundColor: elbe.transparent ? "transparent" : undefined,
            border: "none",
            borderRadius: elbe.sharp ? 0 : "3rem",
            height: "3rem",
            width: "3rem",
          })}
          title={elbe.tooltip ? undefined : elbe.ariaLabel ?? undefined}
          onClick={(e) => {
            e.stopPropagation();
            onTap && onTap(e);
          }}
        >
          <Icon icon={icon} />
        </button>
      </WithStateTheme>
    </WithTooltip>
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
