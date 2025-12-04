import { applyProps, clamp, ElbeProps } from "../..";
import { useApp } from "../app/app_ctxt";

export function ProgressBar({
  value,
  max = 100,
  plain,
  ...elbe
}: {
  value: number;
  max?: number;
  plain?: boolean;
} & ElbeProps) {
  const { appConfig } = useApp();
  const { theme } = appConfig.themeContext.useTheme();
  return (
    <div
      {...applyProps(
        "progress_bar",
        {
          role: "progressbar",
          ...elbe,
        },
        [plain ? "plain" : "accent minor"],
        {
          width: "100%",
          height: "0.5rem",

          borderRadius: theme.geometry.radius + "rem",
          border: "none",
        }
      )}
    >
      <div
        style={{
          width: `${clamp((value / max) * 100, 0, 100)}%`,
          height: "100%",
          backgroundColor: "var(--c-context-front)",
          transition: theme.motion.reduced ? "none" : "width 0.25s",
          borderRadius: theme.geometry.radius + "rem",
        }}
      />
    </div>
  );
}
