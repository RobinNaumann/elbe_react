import { CheckIcon } from "lucide-react";
import type { ElbeColorKinds } from "../../theme/colors";
import { ActionElbeProps, applyProps } from "../base/box";
import { Spaced } from "../layout/spaced";
import { Button } from "./button";
import type { IconChild } from "./icon_button";

export function ToggleButton({
  value,
  onChange,
  label,
  icon,
  kind,
  ...elbe
}: {
  value: boolean;
  onChange?: (v: boolean) => void;
  kind?: ElbeColorKinds;
  label: string;
  icon?: IconChild;
} & ActionElbeProps) {
  return (
    <Button
      manner={value ? "minor" : "flat"}
      kind={kind}
      onTap={onChange && (() => onChange(!value))}
      {...applyProps("toggle_button", elbe, "main-between", { gap: "1.5rem" })}
    >
      <div class="row gap-half">
        {typeof icon === "function" ? icon({}) : icon}
        {label && <span>{label}</span>}
      </div>
      {value ? <CheckIcon /> : <Spaced amount={1.5} />}
    </Button>
  );
}
