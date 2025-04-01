import { _InputSpacer, BooleanInputProps, useThemeConfig } from "../../..";
import { ActionElbeProps, applyProps } from "../base/box";

export function Checkbox(p: BooleanInputProps & ActionElbeProps) {
  const tConfig = useThemeConfig();
  return _InputSpacer(
    p,
    <div
      class={`row ${p.onChange ? "" : "disabled"}`}
      style={{
        gap: ".75rem",
        filter: p.onChange ? "" : "grayscale(1)",
        opacity: p.onChange ? "" : "0.5",
      }}
    >
      <input
        type="checkbox"
        {...applyProps(
          "checkbox",
          {
            role: "checkbox",
            ...p,
          },
          p.value ? ["accent major"] : "accent minor",
          {
            background: p.value ? null : "transparent",
            transition: tConfig.reducedMotion ? "none" : null,
          }
        )}
        disabled={!p.onChange}
        checked={p.value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => p.onChange?.(e.currentTarget.checked)}
      />
      {p.label && <div style="margin-top: -.25rem">{p.label}</div>}
    </div>
  );
}
