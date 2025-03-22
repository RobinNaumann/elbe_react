import { ActionElbeProps, applyProps } from "../base/box";

export function Checkbox({
  value,
  label,
  onChange,
  ...elbe
}: {
  value: boolean;
  label?: string;
  onChange?: ((checked: boolean) => void) | null;
} & ActionElbeProps) {
  return (
    <div
      class={`row ${onChange ? "" : "disabled"}`}
      style={{
        gap: ".75rem",
        filter: onChange ? "" : "grayscale(1)",
        opacity: onChange ? "" : "0.5",
      }}
    >
      <input
        type="checkbox"
        {...applyProps(
          "checkbox",
          elbe,
          value ? ["accent major"] : "accent minor",
          {
            background: value ? null : "transparent",
          }
        )}
        disabled={!onChange}
        checked={value}
        onChange={(e) => onChange?.(e.currentTarget.checked)}
      />
      {label && <div style="margin-top: -.25rem">{label}</div>}
    </div>
  );
}
