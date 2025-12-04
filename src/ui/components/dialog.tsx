import { X } from "lucide-react";
import { useEffect } from "react";
import type { ElbeChildren } from "../util/types";
import { Padded } from "./base/padded";
import { IconButton } from "./button/icon_button";
import { Row } from "./layout/flex";
import { Spaced } from "./layout/spaced";

export function ElbeDialog({
  title,
  open,
  onClose,
  children,
  _style,
  barrierDismissible,
  maxWidth,
}: {
  _style?: React.CSSProperties;
  title: string;
  open: boolean;
  onClose: () => void;
  children: ElbeChildren;
  barrierDismissible?: boolean;
  maxWidth?: number;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (barrierDismissible) onClose();
      }}
      open={open}
      style={{ textAlign: "start", ...(_style ?? {}) }}
    >
      <div
        className="elbe_dialog_base primary card plain-opaque padding-none"
        style={{
          maxWidth: `min(${maxWidth ?? 40}rem, 100%)`,
          minWidth: "10rem",
        }}
      >
        <Padded.all amount={1}>
          <Row cross="center" main="space-between">
            <div className="body-l b">{title}</div>

            <IconButton.plain
              ariaLabel={"Close"}
              icon={X}
              onTap={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClose();
              }}
            />
          </Row>
        </Padded.all>
        <Spaced amount={0.5} />
        <Padded.all
          amount={1}
          style={{
            paddingTop: 0,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {children}
        </Padded.all>
      </div>
    </dialog>
  );
}
