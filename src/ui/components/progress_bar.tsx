import { applyProps, clamp, ElbeProps, useTheme, useThemeConfig } from "../..";

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
  const tConfig = useThemeConfig();
  const theme = useTheme();
  return (
    <div
      {...applyProps("progress_bar", elbe, [plain ? "plain" : "accent minor"], {
        width: "100%",
        height: "0.5rem",
        borderRadius: theme.geometry.radius + "rem",
        border: "none",
      })}
    >
      <div
        style={{
          width: `${clamp((value / max) * 100, 0, 100)}%`,
          height: "100%",
          backgroundColor: "var(--c-context-front)",
          transition: tConfig.reducedMotion ? "none" : "width 0.25s",
          borderRadius: theme.geometry.radius + "rem",
        }}
      />
    </div>
  );
}
