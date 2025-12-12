import { CheckIcon, XIcon } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { applyProps, ElbeActionProps, styleBorderFromContext } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { WithStateTheme } from "../base/state_builder";

export type BooleanInputProps = {
  value: boolean;
  label?: string;
  compact?: boolean;
  onChange?: ((checked: boolean) => void) | null;
};

export function Switch(
  p: BooleanInputProps & ElbeActionProps & { manner?: "flat" | "plain" }
) {
  const { appConfig, setAppView } = useApp();
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
    <WithStateTheme theme={baseTheme} disabled={!p.onChange}>
      <button
        onClick={(e) => {
          p.onChange?.(!p.value);
          e.stopPropagation();
        }}
        {...applyProps(
          "switch",
          {
            role: "switch",
            ...p,
          },
          ["elbe_colored"],
          {
            ...styleBorderFromContext,
            minHeight: 0,
            minWidth: 0,
            filter: p.onChange ? "" : "grayscale(1)",
            opacity: p.onChange ? "" : "0.5",
            height: "1.8rem",
            width: "2.7rem",
            position: "relative",
            padding: 0,
            display: "flex",
            alignItems: "center",
            cursor: "inherit",
            transition: baseTheme.theme.motion.reduced
              ? "none"
              : "background-color 0.25s",
          }
        )}
      >
        <div
          style={{
            position: "absolute",
            left: p.value ? "1.2rem" : "0.4rem",
            height: ".8rem",
            width: ".8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: baseTheme.theme.motion.reduced ? "none" : "left 0.25s",
          }}
        >
          {p.value ? (
            <CheckIcon
              color="var(--elbe-context-color-front)"
              strokeWidth="0.25rem"
            />
          ) : (
            <XIcon
              color="var(--elbe-context-color-front)"
              strokeWidth="0.25rem"
            />
          )}
        </div>
      </button>
    </WithStateTheme>
  );
}

export function _InputSpacer(
  p: BooleanInputProps,
  children: JSX.Element
): JSX.Element {
  return (
    <div
      onClick={() => p.onChange?.(!p.value)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: p.compact ? "0rem" : "3rem",
        minWidth: p.compact ? "0rem" : "3rem",
      }}
    >
      {children}
    </div>
  );
}
