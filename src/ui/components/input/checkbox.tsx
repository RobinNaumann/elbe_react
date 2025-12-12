import { _InputSpacer, BooleanInputProps, Text } from "../../..";
import { useApp } from "../../app/app_ctxt";
import {
  applyProps,
  ElbeActionProps,
  styleBorderFromContext,
} from "../base/box";
import { WithStateTheme } from "../base/state_builder";

export function Checkbox(
  p: BooleanInputProps & ElbeActionProps & { manner?: "flat" | "plain" }
) {
  const { appConfig } = useApp();
  const baseTheme = appConfig.themeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          manner: p.value ? "major" : p.manner ?? "flat",
        },
      },
    }),
    [p.value, p.manner]
  );

  return _InputSpacer(
    p,

    <div
      {...applyProps(
        "checkbox",
        {
          role: "checkbox",
          ...p,
        },
        [],
        {
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
          filter: p.onChange ? "" : "grayscale(1)",
          opacity: p.onChange ? "" : "0.5",
        }
      )}
    >
      <WithStateTheme theme={baseTheme} disabled={!p.onChange}>
        <input
          type="checkbox"
          disabled={!p.onChange}
          checked={p.value}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => p.onChange?.(e.currentTarget.checked)}
          className="elbe_colored"
          style={{
            width: "1.8rem",
            height: "1.8rem",
            cursor: "inherit",
            ...styleBorderFromContext,
          }}
        />
      </WithStateTheme>
      {p.label && <Text v={p.label} />}
    </div>
  );
}
