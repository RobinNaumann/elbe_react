import { useApp } from "../../app/app_ctxt";
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

export function Range(p: _RangeProps) {
  return (p.min ?? 0) > (p.max ?? 100) ? (
    _ElbeErr("Range: max is smaller than min")
  ) : (
    <Card
      ariaLabel={null}
      scheme="secondary"
      kind="accent"
      manner="minor"
      tooltip={p.tooltip}
      style={{
        overflow: "unset",
        backgroundColor: "transparent",
        padding: "0",
        margin: "0",
        borderStyle: "none",
        width: "100%",
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
