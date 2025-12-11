import { useApp } from "../../app/app_ctxt";
import { applyProps, ElbeChildrenProps, ElbeStyleProps } from "../base/box";
import { WithStateTheme } from "../base/state_builder";

export type LabeledInputProps = ElbeChildrenProps &
  ElbeStyleProps & {
    label: string;
    hideLabel?: boolean;
    width?: number;
    flex?: boolean | number;
  };

/**
 * a wrapper for creating labeled input fields. This is used internally by various input components
 * such as text fields, number fields, select fields, etc.
 * @param p labeled input props
 * @returns a labeled input component
 */
export function LabeledInput(
  p: LabeledInputProps & { disabled: boolean; typeLabel: string; id: string }
) {
  const { appConfig } = useApp();
  const baseTheme = appConfig.themeContext.useTheme();

  return (
    <WithStateTheme disabled={p.disabled} theme={baseTheme}>
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
  );
}
