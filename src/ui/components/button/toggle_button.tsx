import { CheckIcon } from "lucide-react";
import { ColorSelection, Row } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { applyProps, ElbeActionProps } from "../base/box";
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
}: ElbeActionProps & {
  value: boolean;
  onChange?: (v: boolean) => void;
  kind?: ColorSelection.Kinds;
  label: string;
  icon?: IconChild;
}) {
  const { appConfig } = useApp();
  const { theme } = appConfig.themeContext.useTheme();

  return (
    <Button
      manner={value ? "major" : "flat"}
      kind={kind}
      onTap={onChange && (() => onChange(!value))}
      ariaLabel={elbe.ariaLabel ?? label}
      contentAlign="space-between"
      {...applyProps("toggle_button", elbe, [], {
        overflow: "hidden",
      })}
    >
      <Row gap={0}>
        <Icon icon={icon} />
        {icon && <Spaced width={0.5} />}
        {label && <span>{label}</span>}
      </Row>
      <div
        style={{
          transition: theme.motion.reduced
            ? undefined
            : "width 0.2s ease-in-out",
          width: value ? "2.5rem" : "0rem",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {value && (
          <CheckIcon style={{ marginLeft: "1rem", minWidth: ".5rem" }} />
        )}
      </div>
    </Button>
  );
}
