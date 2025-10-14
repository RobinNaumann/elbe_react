import { ActionElbeProps, applyProps } from "../base/box";

export function Select({
  options,
  value,
  label,
  onChange,
  ...elbe
}: {
  options: { key: string; label: string }[];
  value?: string;
  label?: string;
  onChange: (value: string) => any;
} & ActionElbeProps) {
  return (
    <select
      {...applyProps("select", elbe)}
      value={value}
      role={"combobox"}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      {options.map(({ key, label }) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
