import { Component } from "preact";
import type { ElbeColorKinds, ElbeColorManners } from "../../theme/colors";
import { useToolbar } from "../../util/ctx_toolbar";
import { _ElbeErr } from "../../util/error_view";
import { ActionElbeProps, applyProps } from "../base/box";
import type { IconChild } from "./icon_button";

export type ButtonProps = ActionElbeProps & {
  kind?: ElbeColorKinds;
  transparent?: boolean;
  contentAlign?: "start" | "center" | "end";
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
  { kind, onTap, icon, label, children, contentAlign, ...elbe }: ButtonProps,
  manner: ElbeColorManners
) {
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
          backgroundColor: elbe.transparent ? "transparent" : null,
        }
      )}
      title={elbe.ariaLabel ?? label}
      disabled={!onTap}
      onClick={(e) => onTap && onTap(e)}
    >
      {typeof icon === "function" ? icon({}) : icon}
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
    _ElbeErr("Button requires either an icon and or a label, or a child")
  );
}
