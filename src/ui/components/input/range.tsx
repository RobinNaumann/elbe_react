import { _ElbeErr } from "../../util/error_view";
import { applyProps, type ElbeProps } from "../base/box";

export function Range({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  ...elbe
}: {
  value: number;
  min?: number;
  step?: number;
  max?: number;
  onChange?: ((value: number) => void) | null;
} & ElbeProps) {
  return min > max ? (
    _ElbeErr("Range: max is smaller than min")
  ) : (
    <input
      type="range"
      {...applyProps(elbe, null, {
        filter: onChange ? "" : "grayscale(1)",
        opacity: onChange ? "" : "0.5",
        cursor: onChange ? "pointer" : "not-allowed",
        width: "100%",
      })}
      min={min}
      max={max}
      step={step}
      disabled={!onChange}
      value={value}
      onInput={(e) => onChange?.(Number(e.currentTarget.value))}
    />
  );
}
