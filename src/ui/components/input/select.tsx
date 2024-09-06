import { applyProps, type ElbeProps } from "../box";

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
} & ElbeProps) {
  return (
    <select
      {...applyProps(elbe)}
      value={value}
      label={label}
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
