import React from "preact/compat";
import { applyProps, type ElbeProps } from "../box";
import { _TextArea } from "./text_area";

export type InputFieldProps = {
  label?: string;
  hint: string;
  readonly?: boolean;
  value: string | number;
  onInput?: (value: string) => void;
} & ElbeProps;

export class Field extends React.Component<
  InputFieldProps & {
    type?: "text" | "number" | "password" | "date" | "time" | "email";
  }
> {
  static text = (p: InputFieldProps) => <Field {...p} type="text" />;
  static number = (p: InputFieldProps) => <Field {...p} type="number" />;
  static password = (p: InputFieldProps) => <Field {...p} type="password" />;
  static date = (p: InputFieldProps) => <Field {...p} type="date" />;
  static time = (p: InputFieldProps) => <Field {...p} type="time" />;
  static email = (p: InputFieldProps) => <Field {...p} type="email" />;

  static multiLine = _TextArea;

  render() {
    const { label, hint, readonly, type, value, onInput, ...elbe } = this.props;

    return (
      <div
        style={{
          width: "12rem !important",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
        data-tooltip={this.props?.tooltip}
      >
        <input
          type={this.props.type}
          {...applyProps(this.props, null, {
            width: "100%",
          })}
          size={5}
          label={this.props.label}
          placeholder={this.props.hint}
          value={this.props.value}
          onInput={(e) =>
            this.props.onInput && this.props.onInput(e.currentTarget.value)
          }
          readonly={this.props.readonly}
        />
      </div>
    );
  }
}
