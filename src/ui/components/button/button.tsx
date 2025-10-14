import React, { Component } from "react";
import type { ElbeColorKinds, ElbeColorManners } from "../../theme/colors";
import { useToolbar } from "../../util/ctx_toolbar";
import { ElbeChildren } from "../../util/types";
import { ActionElbeProps, applyProps } from "../base/box";
import { Icon, type IconChild } from "./icon_button";

export type ButtonProps = ActionElbeProps & {
  kind?: ElbeColorKinds;
  transparent?: boolean;
  contentAlign?: "start" | "center" | "end";
  onTap?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & { icon?: IconChild; label?: string; children?: ElbeChildren };

export class Button extends Component<
  ButtonProps & {
    manner: ElbeColorManners;
  }
> {
  static major = (p: ButtonProps) => <_Btn {...p} manner="major" />;
  static minor = (p: ButtonProps) => <_Btn {...p} manner="minor" />;
  static flat = (p: ButtonProps) => <_Btn {...p} manner="flat" />;
  static plain = (p: ButtonProps) => <_Btn {...p} manner="plain" />;

  render() {
    return <_Btn {...this.props} manner={this.props.manner} />;
  }
}

function _Btn({
  manner,
  kind,
  onTap,
  icon,
  label,
  children,
  contentAlign,
  ...elbe
}: ButtonProps & {
  manner: ElbeColorManners;
}) {
  const toolbarCtx = useToolbar();

  return label || icon || children ? (
    <button
      {...applyProps(
        "button",
        {
          role: "button",
          ...elbe,
          flex: toolbarCtx?.isInOverflow ? 1 : elbe.flex,
        },
        [
          "row",
          "gap-half",
          kind ?? (manner != "plain" && "accent"),
          manner,

          !onTap && "disabled",
        ],
        {
          overflow: "hidden",
          justifyContent:
            contentAlign ?? (toolbarCtx?.isInOverflow ? "start" : "center"),
          backgroundColor: elbe.transparent ? "transparent" : undefined,
        }
      )}
      title={elbe.ariaLabel ?? label}
      disabled={!onTap}
      onClick={(e) => onTap && onTap(e)}
    >
      <Icon icon={icon} />
      {!toolbarCtx?.isInToolbar && label && (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </div>
      )}
      {children}
    </button>
  ) : (
    <div />
    //_ElbeErr("Button requires either an icon and or a label, or a child")
  );
}
