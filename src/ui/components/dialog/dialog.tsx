import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import {
  Card,
  ColorSelection,
  ElbeThemeComputed,
  ElbeThemeData,
  KindAlertIcon,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { getRootElement } from "../../util/root";
import type { ElbeChildren } from "../../util/types";
import { IconButton } from "../button/icon_button";
import { Column, Row } from "../layout/flex";
import { Text } from "../text";

export function elevatedBackdropStyle(
  open: boolean,
  theme?: ElbeThemeComputed<ElbeThemeData>,
  openMergeStyle?: React.CSSProperties
): React.CSSProperties {
  return {
    transition: theme?.motion.reduced
      ? undefined
      : "background-color 200ms ease-in-out, backdrop-filter 200ms ease-in-out",
    backgroundColor: open
      ? theme?.color.currentColor.front.withAlpha(0.3).hex()
      : "transparent",
    backdropFilter: open ? "blur(2px)" : "none",
    ...((open && openMergeStyle) || {}),
  };
}

export type ElbeDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  kind?: ColorSelection.KindsAlert;
  dismissible?: "none" | "button" | "barrier";
  maxWidth?: number;
  children?: ElbeChildren;
};

export function Dialog({ dismissible = "button", ...p }: ElbeDialogProps) {
  const { _appThemeContext } = useApp();
  const theme = _appThemeContext.useTheme().useWith(
    (c) => ({
      color: {
        ...c.color,
        selection: {
          ...c.color.selection,
          scheme: "primary",
          kind: "accent",
          manner: "plain",
          state: "neutral",
        },
      },
    }),
    []
  );

  const rootDOM = useMemo(() => getRootElement("elbe_dialog"), []);

  useEffect(() => {
    if (p.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [p.open]);

  if (!p.open) return null;

  return ReactDOM.createPortal(
    <_appThemeContext.WithTheme theme={theme}>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...elevatedBackdropStyle(p.open, theme.theme),
        }}
        className="elbe_dialog-base"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (dismissible === "barrier") p.onClose();
        }}
      >
        <dialog
          open={p.open}
          style={{
            position: "static",
            display: "flex",
            border: "none",
            background: "transparent",
            margin: 0,
            padding: 0,
          }}
        >
          <Card
            padding={0.25}
            bordered
            elevated
            kind={p.kind}
            style={{
              maxWidth: p.maxWidth ? `min(${p.maxWidth}rem, 90vw)` : "90%",
              minWidth: "min(17rem, 90vw)",
            }}
          >
            <Row cross="center" gap={1} style={{ marginLeft: "1rem" }}>
              {p.kind && <KindAlertIcon kind={p.kind} />}
              <Text.h4 v={p.title} flex style={{ marginRight: "1rem" }} />
              {["button", "barrier"].includes(dismissible) && (
                <IconButton.plain
                  ariaLabel={"Close"}
                  icon={X}
                  onTap={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    p.onClose();
                  }}
                />
              )}
            </Row>
            <Column style={{ padding: "1rem" }}>{p.children}</Column>
          </Card>
        </dialog>
        ,
      </div>
    </_appThemeContext.WithTheme>,
    rootDOM
  );
}
