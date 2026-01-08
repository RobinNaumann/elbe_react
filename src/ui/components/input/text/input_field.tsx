import { ColorSelection, KindAlertIcon, Text, UnixMS } from "../../../..";
import { useApp } from "../../../app/app_ctxt";
import { css } from "../../../util/_util";
import { randomAlphaNum } from "../../../util/util";
import { ElbeActionProps } from "../../base/box";
import { Card } from "../../base/card";
import { Row } from "../../layout/flex";
import { LabeledInput, LabeledInputProps } from "../_labeled_input";
import { dateInputToUnixMs, unixMsToDateInput } from "./_datepicker";
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

export type InputFieldProps<T> = ElbeActionProps &
  LabeledInputProps & {
    hint?: string;
    value: T;
    onInput?: (value: T) => void;
    infoMessage?: string;
    warningMessage?: string;
    errorMessage?: string;
    successMessage?: string;
  };

type SingleLineInputFieldProps<T> = InputFieldProps<T> & SLInputFieldProps<T>;

export namespace Field {
  /**
   * A single-line text input field.
   *
   * **Properties:**
   * - `value` (string): The current text value of the input field.
   * - `onInput` (function): Callback function that receives the new text value when the input changes.
   */
  export function text(p: SingleLineInputFieldProps<string>) {
    return <_Field {...p} inputType="text" />;
  }

  /**
   * A number input field.
   *
   * **Properties:**
   * - `value` (number): The current numeric value of the input field.
   * - `onInput` (function): Callback function that receives the new numeric value when the input changes.
   */
  export function number(p: SingleLineInputFieldProps<number>) {
    return (
      <_Field
        {...p}
        inputType="number"
        transformerToString={(v) => `${v}`}
        transformerFromString={(s) => Number(s)}
      />
    );
  }

  /**
   * A password input field.
   *
   * **Properties:**
   * - `value` (string): The current password value of the input field.
   * - `onInput` (function): Callback function that receives the new password value when the input changes.
   */
  export function password(p: SingleLineInputFieldProps<string>) {
    return <_Field {...p} inputType="password" />;
  }

  /**
   * A date input field that handles UnixMS values.
   *
   * **Properties:**
   * - `value` (UnixMS): The current value of the date input field in Unix milliseconds.
   * - `onInput` (function): Callback function that receives the new UnixMS value when the input changes.
   */
  export function date(p: SingleLineInputFieldProps<UnixMS>) {
    return (
      <_Field<UnixMS>
        {...p}
        inputType="date"
        transformerToString={(v) => unixMsToDateInput(v)}
        transformerFromString={(s) => dateInputToUnixMs(s) ?? 0}
      />
    );
  }

  /**
   * A time input field.
   *
   * **Properties:**
   * - `value` (string): The current time value of the input field in "HH:MM" format.
   * - `onInput` (function): Callback function that receives the new time value when the input changes.
   */
  export function time(p: SingleLineInputFieldProps<string>) {
    return <_Field {...p} inputType="time" />;
  }
  /**
   * An email input field.
   *
   * **Properties:**
   * - `value` (string): The current email value of the input field.
   * - `onInput` (function): Callback function that receives the new email value when the input changes.
   */
  export function email(p: SingleLineInputFieldProps<string>) {
    return <_Field {...p} inputType="email" />;
  }

  /**
   * A multi-line text area input field.
   *
   * **Properties:**
   * - `value` (string): The current text value of the text area.
   * - `onInput` (function): Callback function that receives the new text value when the input changes.
   */
  export function multiLine(p: InputFieldProps<string>) {
    return <_Field {...p} inputType="area" />;
  }
}

function _Field<T>(
  p: (
    | (SingleLineInputFieldProps<T> & {
        inputType: Exclude<_InputTypes, "area">;
      })
    | (InputFieldProps<string> & { inputType: "area" })
  ) & {
    transformerToString?: (v: T) => string;
    transformerFromString?: (s: string) => T;
  }
) {
  {
    const { _appThemeContext } = useApp();
    const usedTheme = _appThemeContext.useTheme();
    const id = p.id ?? randomAlphaNum(8, "input_field_");
    const manner = p.manner ?? "plain";

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
      <LabeledInput
        {...p}
        id={id}
        disabled={!p.onInput}
        typeLabel="text-field"
        manner={manner}
      >
        <Card
          className="elbe-focussink"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            ...css.borderStyle("none"),
          }}
          kind={msg?.kind}
          padding={0}
          manner={msg ? "major" : undefined}
        >
          <Card
            // inner card for input only
            kind={msg?.kind}
            manner={msg ? "minor" : undefined}
            overflow="hidden"
            padding={0}
            bordered
            style={{
              transition: "none",
            }}
          >
            {p.inputType === "area" ? (
              <_MultiLineField props={p} id={id} />
            ) : (
              <_SingleLineField
                leading={p.leading}
                trailing={p.trailing}
                onLeadingTap={p.onLeadingTap}
                onTrailingTap={p.onTrailingTap}
                onInput={p.onInput}
                value={p.value}
                hint={p.hint}
                inputType={p.inputType}
                message={msg}
                manner={manner}
                transformerFromString={
                  p.transformerFromString ?? ((v) => v as any)
                }
                transformerToString={p.transformerToString ?? ((v) => v as any)}
              />
            )}
          </Card>

          {msg && (
            <Row
              gap={0.5}
              style={{
                padding: "0.25rem 0.5rem",
                marginBottom: `${usedTheme.theme.geometry.borderWidth}rem`,
              }}
            >
              <KindAlertIcon kind={msg.kind} size="body-s" />
              <Text.s bold v={msg.msg} flex />
            </Row>
          )}
        </Card>
      </LabeledInput>
    );
  }
}
