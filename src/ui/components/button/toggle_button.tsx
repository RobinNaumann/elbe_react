import { CheckIcon } from "lucide-react";
import type { ElbeColorKinds } from "../../theme/colors";
import { useThemeConfig } from "../../theme/theme_context";
import { ActionElbeProps, applyProps } from "../base/box";
import { Padded } from "../base/padded";
import { Spaced } from "../layout/spaced";
import { Button } from "./button";
import { Icon, type IconChild } from "./icon_button";

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
  const tConfig = useThemeConfig();

  return (
    <Button
      manner={value ? "major" : "flat"}
      kind={kind}
      onTap={onChange && (() => onChange(!value))}
      ariaLabel={elbe.ariaLabel ?? label}
      {...applyProps("toggle_button", elbe, "main-between")}
    >
      <div className="row gap-none">
        <Icon icon={icon} />
        {icon && <Spaced width={0.5} />}
        {label && <span>{label}</span>}
      </div>
      <div
        style={{
          transition: tConfig.reducedMotion
            ? undefined
            : "width 0.2s ease-in-out",
          width: value ? "2.5rem" : "0rem",
        }}
      >
        {value && (
          <Padded className="centered" left={1}>
            <CheckIcon />
          </Padded>
        )}
      </div>
    </Button>
  );
}
