import { X } from "lucide-react";
import { useEffect } from "react";
import type { ElbeChildren } from "../util/types";
import { IconButton } from "./button/icon_button";
import { Spaced } from "./layout/spaced";

export function ElbeDialog({
  title,
  open,
  onClose,
  children,
  _style,
  barrierDismissible,
}: {
  _style?: React.CSSProperties;
  title: string;
  open: boolean;
  onClose: () => void;
  children: ElbeChildren;
  barrierDismissible?: boolean;
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
        style={{ maxWidth: "40rem", minWidth: "10rem" }}
      >
        <div className="row cross-center padded main-between">
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
        </div>
        <Spaced amount={0.5} />
        <div
          className="padded"
          style={{
            paddingTop: 0,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}
