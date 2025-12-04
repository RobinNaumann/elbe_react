import React, { Component } from "react";
import { ColorSelection, Row, Text } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { useToolbar } from "../../util/ctx_toolbar";
import { ElbeChildren } from "../../util/types";
import { ActionElbeProps, applyProps } from "../base/box";
import { Icon, type IconChild } from "./icon_button";

export type ButtonProps = ActionElbeProps & {
  kind?: ColorSelection.Kinds;
  transparent?: boolean;
  contentAlign?: "start" | "center" | "end";
  onTap?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & { icon?: IconChild; label?: string; children?: ElbeChildren };

export class Button extends Component<
  ButtonProps & {
    manner: ColorSelection.Manners;
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
  manner: ColorSelection.Manners;
}) {
  const toolbarCtx = useToolbar();
  const { appConfig } = useApp();

  const usedTheme = appConfig.themeContext.useTheme().with(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          kind: kind ?? "accent",
          manner: manner,
        },
      },
    }),
    [kind, manner]
  );

  return label || icon || children ? (
    <appConfig.themeContext.WithTheme theme={usedTheme}>
      <button
        {...applyProps(
          "button",
          {
            role: "button",
            ...elbe,
            flex: toolbarCtx?.isInOverflow ? 1 : elbe.flex,
          },
          [],
          {
            backgroundColor: elbe.transparent
              ? "transparent"
              : usedTheme.theme.color.currentColor.back.asCss(),
            cursor: onTap ? "pointer" : "not-allowed",
            padding: "0.25rem 0.75rem",
            minHeight: "3rem",
            border: "none",
            borderRadius: usedTheme.theme.geometry.radius + "rem",
          }
        )}
        title={elbe.ariaLabel ?? label}
        disabled={!onTap}
        onClick={(e) => onTap && onTap(e)}
      >
        <Row
          cross="center"
          main={contentAlign ?? (toolbarCtx?.isInOverflow ? "start" : "center")}
          gap={0.5}
        >
          <Icon icon={icon} />
          {!toolbarCtx?.isInToolbar && label && (
            <Text
              bold
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              v={label}
            />
          )}
          {children}
        </Row>
      </button>
    </appConfig.themeContext.WithTheme>
  ) : (
    <div />
    //_ElbeErr("Button requires either an icon and or a label, or a child")
  );
}
