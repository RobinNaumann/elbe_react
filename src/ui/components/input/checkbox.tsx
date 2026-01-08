import { _InputSpacer, BooleanInputProps, Text } from "../../..";
import { useApp } from "../../app/app_ctxt";
import {
  applyProps,
  ElbeActionProps,
  styleBorderFromContext,
} from "../base/box";
import { WithStateTheme } from "../base/state_builder";
import { WithTooltip } from "../tooltip";

/** * A checkbox input component that allows users to select or deselect an option.
 *
 * **Alternatives:**
 * - Use a Switch component for a toggle-style input.
 *
 * **Properties:**
 * - `value` (boolean): The current state of the checkbox; true for checked and false for unchecked.
 * - `label` (string | undefined): The label text for the checkbox input.
 * - `compact` (boolean | undefined): If true, the checkbox is rendered in a compact style.
 * - `onChange` (function | null): Callback function that receives the new state when the checkbox is toggled. If null, the checkbox is disabled.
 * - `manner` ("flat" | "plain" | undefined): The visual style of the checkbox when it is unchecked.
 */
export function Checkbox(
  p: BooleanInputProps & ElbeActionProps & { manner?: "flat" | "plain" }
) {
  const { _appThemeContext } = useApp();
  const baseTheme = _appThemeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          manner: p.value ? "major" : p.manner ?? "flat",
        },
      },
    }),
    [p.value, p.manner]
  );

  return _InputSpacer(
    p,
    <WithTooltip tooltip={p.tooltip}>
      <div
        {...applyProps(
          "checkbox",
          {
            role: "checkbox",
            ...p,
          },
          [],
          {
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            filter: p.onChange ? "" : "grayscale(1)",
            opacity: p.onChange ? "" : "0.5",
          }
        )}
      >
        <WithStateTheme theme={baseTheme} disabled={!p.onChange}>
          <input
            type="checkbox"
            disabled={!p.onChange}
            checked={p.value}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => p.onChange?.(e.currentTarget.checked)}
            className="elbe_colored"
            style={{
              width: "1.8rem",
              height: "1.8rem",
              cursor: "inherit",
              ...styleBorderFromContext,
            }}
          />
        </WithStateTheme>
        {p.label && <Text v={p.label} />}
      </div>
    </WithTooltip>
  );
}
