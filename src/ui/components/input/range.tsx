import { useApp } from "../../app/app_ctxt";
import { css } from "../../util/_util";
import { _ElbeErr } from "../../util/error_view";
import { applyProps, ElbeActionProps } from "../base/box";
import { Card } from "../base/card";

type _RangeProps = ElbeActionProps & {
  value: number;
  min?: number;
  step?: number;
  max?: number;
  onChange?: ((value: number) => void) | null;
};

/** * A range input component that allows users to select a value within a specified range by sliding a handle.
 *
 * **Properties:**
 * - `value` (number): The current value of the range input.
 * - `min` (number): The minimum value of the range. Default is 0.
 * - `max` (number): The maximum value of the range. Default is 100.
 * - `step` (number): The increment step for the range. Default is 1.
 * - `onChange` (function | null): Callback function that receives the new value when the range changes. If null, the range is disabled.
 */
export function Range(p: _RangeProps) {
  return (p.min ?? 0) > (p.max ?? 100) ? (
    <_ElbeErr msg="Range: max is smaller than min" />
  ) : (
    <Card
      flex={p.flex}
      ariaLabel={p.ariaLabel}
      scheme="secondary"
      kind="accent"
      manner="minor"
      tooltip={p.tooltip}
      style={{
        overflow: "unset",
        backgroundColor: "transparent",
        padding: "0",
        margin: "0",
        ...css.borderStyle("none"),
      }}
    >
      <_StyledRange {...p} />
    </Card>
  );
}

function _StyledRange({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  ...elbe
}: _RangeProps) {
  const { _appThemeContext } = useApp();
  const { theme } = _appThemeContext.useTheme().useWith(
    (c) => ({
      color: {
        ...c.color,
        selection: {
          ...c.color.selection,
          manner: "major",
        },
      },
    }),
    []
  );

  return (
    <input
      type="range"
      {...applyProps(
        "range",
        {
          role: "slider",
          ...elbe,
        },
        null,
        {
          filter: onChange ? "" : "grayscale(1)",
          opacity: onChange ? "" : "0.5",
          cursor: onChange ? "pointer" : "not-allowed",
          width: "100%",
          borderRadius: theme.geometry.radius + "rem",
          ...({
            "--elbe-range-dot-back": theme.color.isContrast
              ? theme.color.currentColor.front.asCss()
              : theme.color.currentColor.back.asCss(),
            "--elbe-range-dot-border":
              theme.color.currentColor.border?.asCss() ?? "transparent",
          } as any),
        }
      )}
      min={min}
      max={max}
      step={step}
      disabled={!onChange}
      value={value}
      onInput={(e) => onChange?.(Number(e.currentTarget.value))}
    />
  );
}
