import { CheckIcon, XIcon } from "lucide-react";
import { ActionElbeProps, applyProps } from "../../..";
import { useThemeConfig } from "../../theme/theme_context";

export function Switch({
  value,
  label,
  onChange,
  ...elbe
}: {
  value: boolean;
  label?: string;
  onChange?: ((checked: boolean) => void) | null;
} & ActionElbeProps) {
  const tConfig = useThemeConfig();

  return (
    <button
      onClick={() => onChange?.(!value)}
      {...applyProps("switch", elbe, ["bordered card accent"], {
        minHeight: 0,
        minWidth: 0,
        filter: onChange ? "" : "grayscale(1)",
        opacity: onChange ? "" : "0.5",
        height: "1.8rem",
        width: "2.7rem",
        position: "relative",
        padding: "0rem",
        borderColor: "var(--c-context-front)",
        backgroundColor: value
          ? "var(--c-context-front)"
          : "var(--c-context-back)",
        display: "flex",
        alignItems: "center",
        transition: tConfig.reducedMotion ? "none" : "background-color 0.25s",
      })}
    >
      <div
        style={{
          position: "absolute",
          left: value ? "1.2rem" : "0.4rem",
          height: ".8rem",
          width: ".8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: tConfig.reducedMotion ? "none" : "left 0.25s",
        }}
      >
        {value ? (
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
