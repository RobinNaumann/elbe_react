import { _InputSpacer, BooleanInputProps, useThemeConfig } from "../../..";
import { ActionElbeProps, applyProps } from "../base/box";

export function Checkbox(p: BooleanInputProps & ActionElbeProps) {
  const tConfig = useThemeConfig();
  return _InputSpacer(
    p,
    <div
      className={`row ${p.onChange ? "" : "disabled"}`}
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
            background: p.value ? undefined : "transparent",
            transition: tConfig.reducedMotion ? "none" : undefined,
          }
        )}
        disabled={!p.onChange}
        checked={p.value}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => p.onChange?.(e.currentTarget.checked)}
      />
      {p.label && <div style={{ marginTop: "-.25rem" }}>{p.label}</div>}
    </div>
  );
}
