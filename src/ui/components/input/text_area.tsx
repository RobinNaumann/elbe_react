import { ActionElbeProps, applyProps } from "../base/box";

export function _TextArea({
  label,
  hint,
  readonly,
  rows = 4,
  maxLength,
  value,
  onInput,
  ...elbe
}: {
  label?: string;
  hint: string;
  rows?: number;
  maxLength?: number;
  readonly?: boolean;
  value: string | number;
  onInput?: (value: string) => void;
} & ActionElbeProps) {
  return (
    <div
      style={{
        width: "12rem !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
      data-tooltip={elbe.tooltip}
    >
      <textarea
        {...applyProps("text_area", elbe, null, { width: "100%" })}
        label={label}
        size={5}
        cols={5}
        placeholder={hint}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onInput={(e) => onInput && onInput(e.currentTarget.value)}
        readonly={readonly}
      />
    </div>
  );
}
