import React, { Component } from "react";
import { ColorSelection, Row, Text } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { useToolbar } from "../../util/ctx_toolbar";
import { _ElbeErr } from "../../util/error_view";
import { ElbeChildren } from "../../util/types";
import { applyProps, ElbeActionProps } from "../base/box";
import { WithStateTheme } from "../base/state_builder";
import { WithTooltip } from "../tooltip";
import { Icon, type IconChild } from "./icon_button";

export type ButtonProps = ElbeActionProps & {
  kind?: ColorSelection.Kinds;
  transparent?: boolean;
  contentAlign?: "start" | "center" | "end" | "space-between";
  gap?: number;
  sharp?: boolean;
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
  const { _appThemeContext } = useApp();

  const baseTheme = _appThemeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          kind: kind ?? color.selection.kind,
          manner: manner,
        },
      },
    }),
    [kind, manner]
  );

  return label || icon || children ? (
    <WithTooltip tooltip={elbe.tooltip}>
      <WithStateTheme theme={baseTheme} disabled={!onTap}>
        <button
          {...applyProps(
            "button",
            {
              role: "button",
              ...elbe,
              flex: toolbarCtx?.isInOverflow ? 1 : elbe.flex,
            },
            ["elbe_colored"],
            {
              /*backgroundColor: elbe.transparent
              ? "transparent"
              : usedTheme.theme.color.currentColor.back.asCss(),*/
              cursor: "inherit",
              padding: "0.25rem .75rem",
              minHeight: "3rem",
              minWidth: "3rem",
              border: "none",
              backgroundColor: elbe.transparent ? "transparent" : undefined,
              borderRadius: elbe.sharp
                ? 0
                : baseTheme.theme.geometry.radius + "rem",
            }
          )}
          title={elbe.tooltip ? undefined : elbe.ariaLabel ?? label}
          disabled={!onTap}
          onClick={(e) => onTap && onTap(e)}
        >
          <Row
            cross="center"
            main={
              contentAlign ?? (toolbarCtx?.isInOverflow ? "start" : "center")
            }
            gap={elbe.gap ?? 0.5}
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
      </WithStateTheme>
    </WithTooltip>
  ) : (
    <_ElbeErr msg="Button requires either an icon and or a label, or a child" />
  );
}
