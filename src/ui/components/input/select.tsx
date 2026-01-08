import { randomAlphaNum } from "../../util/util";
import {
  ElbeActionProps,
  styleBorderFromContext,
  styleColorFromContext,
} from "../base/box";
import { LabeledInput, LabeledInputProps } from "./_labeled_input";

/** * A select dropdown input component that allows users to choose one option from a list.
 *
 * **Properties:**
 * - `options` (array): An array of option objects, each containing a `key` and a `label`.
 * - `value` (T | undefined): The currently selected option's key.
 * - `label` (string | undefined): The label text for the select input.
 * - `hideLabel` (boolean | undefined): If true, the label is visually hidden.
 * - `width` (number | undefined): The width of the select input in rem units.
 * - `onChange` (function | undefined): Callback function that receives the selected option's key when the selection changes.
 */
export function Select<T>(
  p: ElbeActionProps &
    LabeledInputProps & {
      options: { key: T; label: string }[];
      value?: T;
      label?: string;
      hideLabel?: boolean;
      width?: number;
      onChange?: (value: T) => any;
    }
) {
  const id = p.id ?? randomAlphaNum(8, "input_field_");

  let valueIndex = p.options.findIndex((o) => o.key === p.value);
  // If the value is not found, select the first option without a key (if any) or the first option
  if (valueIndex === -1) {
    valueIndex = p.options.findIndex((v) => !v.key);
    if (valueIndex === -1) {
      valueIndex = 0;
    }
  }

  let valStr = "-".repeat(valueIndex + 1);

  return (
    <LabeledInput {...p} id={id} disabled={!p.onChange} typeLabel="select">
      <select
        id={id}
        value={valStr}
        disabled={!p.onChange}
        role={"combobox"}
        className="elbe-focussink"
        style={{
          padding: "0 0.75rem",
          height: "3rem",
          minWidth: "12rem",
          width: "100%",
          cursor: "inherit",
          ...styleColorFromContext,
          ...styleBorderFromContext,
        }}
        onChange={(e) => {
          const index = e.currentTarget.value.length - 1;
          const selectedOption = p.options[index];
          selectedOption && p.onChange ? p.onChange(selectedOption.key) : null;
        }}
      >
        {p.options.map(({ key, label }, i) => (
          <option key={JSON.stringify(key)} value={"-".repeat(i + 1)}>
            {label}
          </option>
        ))}
      </select>
    </LabeledInput>
  );
}
