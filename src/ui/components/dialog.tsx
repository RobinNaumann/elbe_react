import { X } from "lucide-react";
import type { ElbeChildren } from "../util/util";
import { IconButton } from "./button/icon_button";
import { Spaced } from "./layout/spaced";

export function ElbeDialog({
  title,
  open,
  onClose,
  children,
  _style,
}: {
  _style?: string;
  title: string;
  open: boolean;
  onClose: () => void;
  children: ElbeChildren;
}) {
  return (
    <dialog
      onClick={(e) => e.stopPropagation()}
      open={open}
      style={"text-align: start" + (_style ?? "")}
    >
      <div
        class="primary card plain-opaque padding-none"
        style="max-width: 40rem; min-width: 10rem"
      >
        <div class="row cross-center padded main-between">
          <div class="body-l b">{title}</div>

          <IconButton.plain
            icon={X}
            onTap={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
          />
        </div>
        <Spaced amount={0.5} />
        <div class="padded" style="max-height: 80vh; overflow: auto">
          {children}
        </div>
      </div>
    </dialog>
  );
}
