import { randomAlphaNum } from "../../util/util";
import {
  ElbeActionProps,
  styleBorderFromContext,
  styleColorFromContext,
} from "../base/box";
import { LabeledInput, LabeledInputProps } from "./_labeled_input";

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

  /*return (
    <div
      style={{
        flex: elbe.flex ? (elbe.flex === true ? 1 : elbe.flex) : undefined,
        width: elbe.flex ? undefined : (width ?? 12) + "rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        filter: onChange ? undefined : "grayscale(1) opacity(0.5)",
        pointerEvents: onChange ? undefined : "none",
        cursor: onChange ? undefined : "not-allowed",
      }}
      data-tooltip={elbe.tooltip}
    >
      <label
        htmlFor={id}
        style={{
          display: hideLabel ? "none" : "block",
          fontSize: "0.8rem",
          padding: "0.2rem 0.5rem",
        }}
      >
        {label}
      </label>

      <select
        id={id}
        {...applyProps("select", elbe, [], {
          minHeight: "3rem",
          cursor: onChange ? "pointer" : "not-allowed",
        })}
        value={valStr}
        disabled={!onChange}
        role={"combobox"}
        onChange={(e) => {
          const index = e.currentTarget.value.length - 1;
          const selectedOption = options[index];
          selectedOption && onChange ? onChange(selectedOption.key) : null;
        }}
      >
        {options.map(({ key, label }, i) => (
          <option key={JSON.stringify(key)} value={"-".repeat(i + 1)}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );*/
}
