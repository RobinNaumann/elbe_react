import { CheckIcon, XIcon } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { ActionElbeProps, applyProps } from "../../..";
import { useApp } from "../../app/app_ctxt";

export type BooleanInputProps = {
  value: boolean;
  label?: string;
  compact?: boolean;
  onChange?: ((checked: boolean) => void) | null;
};

export function Switch(p: BooleanInputProps & ActionElbeProps) {
  const { appConfig, setAppView } = useApp();
  const { theme } = appConfig.themeContext.useTheme();

  return _InputSpacer(
    p,
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
        ["bordered card accent"],
        {
          minHeight: 0,
          minWidth: 0,
          filter: p.onChange ? "" : "grayscale(1)",
          opacity: p.onChange ? "" : "0.5",
          height: "1.8rem",
          width: "2.7rem",
          position: "relative",
          padding: 0,

          borderColor: "var(--c-context-front)",
          backgroundColor: p.value
            ? "var(--c-context-front)"
            : "var(--c-context-back)",
          display: "flex",
          alignItems: "center",
          transition: theme.motion.reduced ? "none" : "background-color 0.25s",
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
          transition: theme.motion.reduced ? "none" : "left 0.25s",
        }}
      >
        {p.value ? (
          <CheckIcon
            color="var(--c-context-back)"
            //width=".8rem"
            //height=".8rem"
            absoluteStrokeWidth={false}
            strokeWidth="0.3rem"
          />
        ) : (
          <XIcon
            color="var(--c-context-front)"
            //width=".8rem"
            //height=".8rem"
            absoluteStrokeWidth={false}
            strokeWidth="0.3rem"
          />
        )}
      </div>
    </button>
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
