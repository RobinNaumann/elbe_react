import { applyProps } from "../../base/box";
import { InputFieldProps } from "./input_field";

export interface MLInputFieldProps extends InputFieldProps {
  rows?: number;
  maxLength?: number;
  notResizable?: boolean;
}

export function _MultiLineField(p: { props: MLInputFieldProps; id: string }) {
  return (
    <textarea
      data-tooltip={p.props.tooltip}
      {...applyProps(
        "text_area",
        { ...p.props, id: p.id, ariaLabel: p.props.ariaLabel ?? p.props.label },
        null,
        {
          width: "100%",
          background: "none",
          border: "none",
          outline: "none",
          padding: "1rem",
          margin: "0 0",
          resize: p.props.notResizable ? "none" : "vertical",
        }
      )}
      size={5}
      cols={5}
      placeholder={p.props.hint}
      rows={p.props.rows ?? 5}
      maxLength={p.props.maxLength}
      value={p.props.value}
      onInput={(e) => {
        e.stopPropagation();
        e.preventDefault();
        p.props.onInput?.(e.currentTarget.value);
      }}
      readonly={p.props.onInput ? false : true}
    />
  );
}
