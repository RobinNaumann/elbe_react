import { useApp } from "../../app/app_ctxt";
import { ColorSelection } from "../../theme/subthemes/color/colors/colors";
import { applyProps, ElbeChildrenProps, ElbeStyleProps } from "../base/box";
import { WithStateTheme } from "../base/state_builder";
import { WithTooltip } from "../tooltip";

export type LabeledInputProps = ElbeChildrenProps &
  ElbeStyleProps & {
    label: string;
    hideLabel?: boolean;
    width?: number;
    flex?: boolean | number;
    manner?: Exclude<ColorSelection.Manners, "major" | "minor">;
    disabled?: boolean;
    tooltip?: string;
  };

/**
 * a wrapper for creating labeled input fields. This is used internally by various input components
 * such as text fields, number fields, select fields, etc.
 * @param p labeled input props
 * @returns a labeled input component
 */
export function LabeledInput(
  p: LabeledInputProps & { typeLabel: string; id: string }
) {
  const { _appThemeContext } = useApp();
  const baseTheme = _appThemeContext.useTheme();

  return (
    <WithTooltip tooltip={p.tooltip}>
      <WithStateTheme
        disabled={p.disabled ?? false}
        theme={baseTheme}
        manner={p.manner}
      >
        <div
          {...applyProps(p.typeLabel, p, [], {
            flex: p.flex ? (p.flex === true ? 1 : p.flex) : undefined,
            width: p.flex ? undefined : (p.width ?? 12) + "rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            ...p.style,
          })}
        >
          <label
            htmlFor={p.id}
            style={{
              display: p.hideLabel ? "none" : "block",
              fontSize: "0.8rem",
              padding: "0.2rem 0.5rem",
            }}
          >
            {p.label}
          </label>
          {p.children}
        </div>
      </WithStateTheme>
    </WithTooltip>
  );
}
