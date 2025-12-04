import React from "react";
import { ColorSelection, KindAlertIcon, Text } from "../../../..";
import { randomAlphaNum } from "../../../util/util";
import { applyProps, ElbeProps, ElbeStyleProps } from "../../base/box";
import { Card } from "../../base/card";
import { Row } from "../../layout/flex";
import { _MultiLineField } from "./multi_line";
import { _SingleLineField, SLInputFieldProps } from "./single_line";

type _InputTypes =
  | "text"
  | "number"
  | "password"
  | "date"
  | "time"
  | "email"
  | "area";

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
} & ElbeStyleProps &
  ElbeProps;

export class Field<T extends InputFieldProps> extends React.Component<
  T & { inputType: _InputTypes }
> {
  static text = (p: SLInputFieldProps) => <Field {...p} inputType="text" />;
  static number = (p: SLInputFieldProps) => <Field {...p} inputType="number" />;
  static password = (p: SLInputFieldProps) => (
    <Field {...p} inputType="password" />
  );
  static date = (p: SLInputFieldProps) => <Field {...p} inputType="date" />;
  static time = (p: SLInputFieldProps) => <Field {...p} inputType="time" />;
  static email = (p: SLInputFieldProps) => <Field {...p} inputType="email" />;
  static multiLine = (p: InputFieldProps) => <Field {...p} inputType="area" />;

  render() {
    return <_Field {...this.props} />;
  }
}

function _Field(p: InputFieldProps & { inputType: _InputTypes }) {
  {
    const id = p.id ?? randomAlphaNum(8, "input_field_");

    const msg: { kind: ColorSelection.KindsAlert; msg: string } | null =
      p.errorMessage
        ? { kind: "error", msg: p.errorMessage }
        : p.warningMessage
        ? { kind: "warning", msg: p.warningMessage }
        : p.infoMessage
        ? { kind: "info", msg: p.infoMessage }
        : p.successMessage
        ? { kind: "success", msg: p.successMessage }
        : null;

    return (
      <div
        style={{
          flex: p.flex ? (p.flex === true ? 1 : p.flex) : undefined,
          width: p.flex ? undefined : (p.width ?? 12) + "rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          filter: p.onInput ? undefined : "grayscale(1) opacity(0.5)",
          pointerEvents: p.onInput ? undefined : "none",
          cursor: p.onInput ? undefined : "not-allowed",
        }}
        data-tooltip={p?.tooltip}
      >
        <label
          htmlFor={id}
          style={{
            display: p.hideLabel ? "none" : "block",
            fontSize: "0.8rem",
            padding: "0.2rem 0.5rem",
          }}
        >
          {p.label}
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
            kind="accent"
          >
            <Card
              kind={msg?.kind}
              manner={msg ? "minor" : "plain"}
              overflow="hidden"
              padding={0}
              bordered
              {...applyProps("text-field", p, ["text_field_base"], p.style)}
            >
              {p.inputType === "area" ? (
                <_MultiLineField props={p} id={id} />
              ) : (
                <_SingleLineField
                  props={p}
                  msg={msg}
                  type={p.inputType ?? "text"}
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
