import { ColorSelection, KindAlertIcon, Text } from "../../../..";
import { useApp } from "../../../app/app_ctxt";
import { randomAlphaNum } from "../../../util/util";
import { ElbeActionProps } from "../../base/box";
import { Card } from "../../base/card";
import { Row } from "../../layout/flex";
import { LabeledInput, LabeledInputProps } from "../_labeled_input";
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

export type InputFieldProps = ElbeActionProps &
  LabeledInputProps & {
    hint?: string;
    value: string | number;
    onInput?: (value: string) => void;
    infoMessage?: string;
    warningMessage?: string;
    errorMessage?: string;
    successMessage?: string;
  };

type SingleLineInputFieldProps = InputFieldProps & SLInputFieldProps;

export namespace Field {
  export function text(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="text" />;
  }
  export function number(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="number" />;
  }
  export function password(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="password" />;
  }
  export function date(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="date" />;
  }
  export function time(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="time" />;
  }
  export function email(p: SingleLineInputFieldProps) {
    return <_Field {...p} inputType="email" />;
  }
  export function multiLine(p: InputFieldProps) {
    return <_Field {...p} inputType="area" />;
  }
}

function _Field(
  p:
    | (SingleLineInputFieldProps & { inputType: Exclude<_InputTypes, "area"> })
    | (InputFieldProps & { inputType: "area" })
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
            borderStyle: "none",
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
                value={String(p.value)}
                hint={p.hint}
                inputType={p.inputType}
                message={msg}
                manner={manner}
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
