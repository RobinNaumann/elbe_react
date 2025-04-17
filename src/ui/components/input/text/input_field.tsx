import React from "preact/compat";
import { ElbeAlertKinds, KindAlertIcon, Text } from "../../../..";
import { randomAlphaNum } from "../../../util/util";
import { applyProps, ElbeProps } from "../../base/box";
import { Card } from "../../base/card";
import { Row } from "../../layout/flex";
import { _MultiLineField } from "./multi_line";
import { _SingleLineField, SLInputFieldProps } from "./single_line";

export type InputFieldProps = {
  id?: string;
  label: string;
  hideLabel?: boolean;
  hint?: string;
  value: string | number;
  onInput?: (value: string) => void;
  width?: number;
  infoMessage?: string;
  warningMessage?: string;
  errorMessage?: string;
  successMessage?: string;
} & ElbeProps;

export class Field<T extends InputFieldProps> extends React.Component<
  T & {
    type: "text" | "number" | "password" | "date" | "time" | "email" | "area";
  }
> {
  static text = (p: SLInputFieldProps) => <Field {...p} type="text" />;
  static number = (p: SLInputFieldProps) => <Field {...p} type="number" />;
  static password = (p: SLInputFieldProps) => <Field {...p} type="password" />;
  static date = (p: SLInputFieldProps) => <Field {...p} type="date" />;
  static time = (p: SLInputFieldProps) => <Field {...p} type="time" />;
  static email = (p: SLInputFieldProps) => <Field {...p} type="email" />;
  static multiLine = (p: InputFieldProps) => <Field {...p} type="area" />;

  render() {
    const { label, hint, type, value, onInput, ...elbe } = this.props;

    const id = this.props.id ?? randomAlphaNum(8, "input_field_");

    const msg: { kind: ElbeAlertKinds; msg: string } | null = this.props
      .errorMessage
      ? { kind: "error", msg: this.props.errorMessage }
      : this.props.warningMessage
      ? { kind: "warning", msg: this.props.warningMessage }
      : this.props.infoMessage
      ? { kind: "info", msg: this.props.infoMessage }
      : this.props.successMessage
      ? { kind: "success", msg: this.props.successMessage }
      : null;

    return (
      <div
        style={{
          flex: this.props.flex
            ? this.props.flex === true
              ? 1
              : this.props.flex
            : null,
          width: this.props.flex ? null : (this.props.width ?? 12) + "rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          filter: this.props.onInput ? null : "grayscale(1) opacity(0.5)",
          pointerEvents: this.props.onInput ? null : "none",
          cursor: this.props.onInput ? null : "not-allowed",
        }}
        data-tooltip={this.props?.tooltip}
      >
        <label
          htmlFor={id}
          style={{
            display: this.props.hideLabel ? "none" : "block",
            fontSize: "0.8rem",
            padding: "0.2rem 0.5rem",
          }}
        >
          {label}
        </label>
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            border: "none",
          }}
          kind={msg?.kind}
          padding={0}
          manner={msg ? "major" : "plain"}
        >
          <Card
            padding={0}
            style={{
              border: "none",
            }}
            kind="plain"
          >
            <Card
              kind={msg?.kind}
              manner={msg ? "minor" : "plain"}
              overflow="hidden"
              padding={0}
              bordered
              {...applyProps(
                "text-field",
                elbe,
                ["text_field_base"],
                this.props.style
              )}
            >
              {type === "area" ? (
                <_MultiLineField props={this.props} id={id} />
              ) : (
                <_SingleLineField
                  props={this.props}
                  msg={msg}
                  type={type ?? "text"}
                  id={id}
                />
              )}
            </Card>
          </Card>
          {msg && (
            <Row
              gap={0.5}
              style={{
                padding: "0.25rem 0.5rem",
              }}
            >
              <KindAlertIcon kind={msg.kind} size="body-s" />
              <Text.s bold v={msg.msg} flex />
            </Row>
          )}
        </Card>
      </div>
    );
  }
}
