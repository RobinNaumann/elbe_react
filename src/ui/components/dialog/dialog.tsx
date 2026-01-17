import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import {
  Card,
  ColorSelection,
  ElbeThemeComputed,
  ElbeThemeData,
  KindAlertIcon,
  ToolbarContext,
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

/** A modal dialog component that displays content in a centered overlay with an optional title and close functionality.
 * ### Properties:
 * - `title` (string): The title of the dialog, displayed at the top.
 * - `open` (boolean): Controls whether the dialog is visible.
 * - `onClose` (function): Callback function invoked when the dialog is requested to be closed.
 * - `kind` (ColorSelection.KindsAlert | undefined): An optional kind to display an alert icon next to the title.
 * - `dismissible` ("none" | "button" | "barrier" | undefined): Controls how the dialog can be dismissed.
 *    - "none": The dialog cannot be dismissed by user actions.
 *    - "button": A close button is provided in the title bar. (**DEFAULT**)
 *    - "barrier": Clicking outside the dialog will close it.
 *    Default is "button".
 * - `maxWidth` (number | undefined): The maximum width of the dialog in rem units. Defaults to 90vw if not provided.
 * - `children` (ElbeChildren | undefined): The content to be displayed within the dialog.
 *
 * ### Usage:
 * ```tsx
 * <ElbeDialog
 *   title="My Dialog"
 *   open={isDialogOpen}
 *   onClose={() => setDialogOpen(false)}
 *   kind="warning"
 *   dismissible="barrier"
 * >
 *   <p>This is the content of the dialog.</p>
 * </ElbeDialog>
 * ```
 */
export function Dialog({ dismissible = "button", ...p }: ElbeDialogProps) {
  const { _appThemeContext } = useApp({ useFallback: true });
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
    <ToolbarContext.Provider value={null}>
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
                maxWidth: p.maxWidth ? `min(${p.maxWidth}rem, 90vw)` : "90vw",
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
        </div>
      </_appThemeContext.WithTheme>
    </ToolbarContext.Provider>,
    rootDOM
  );
}
