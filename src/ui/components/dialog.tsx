import { X } from "lucide-react";
import type { ElbeChildren } from "../util/util";
import { Spaced } from "./util";

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
        class=" card plain-opaque padding-none"
        style="max-width: 40rem; min-width: 10rem"
      >
        <div class="row cross-start padded">
          <div class="flex-1 b" style="margin-top: 0.6rem; font-size: 1.2rem">
            {title}
          </div>
          <button
            class="integrated"
            style="width: 3rem"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
          >
            <X />
          </button>
        </div>
        <Spaced amount={0.5} />
        <div class="padded" style="max-height: 80vh; overflow: auto">
          {children}
        </div>
      </div>
    </dialog>
  );
}
