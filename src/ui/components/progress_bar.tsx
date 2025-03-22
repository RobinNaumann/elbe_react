import { applyProps, clamp, ElbeProps } from "../..";

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
  return (
    <div
      {...applyProps("progress_bar", elbe, [plain ? "plain" : "accent minor"], {
        width: "100%",
        height: "0.5rem",
        borderRadius: "1rem",
        border: "none",
      })}
    >
      <div
        style={{
          width: `${clamp((value / max) * 100, 0, 100)}%`,
          height: "100%",
          backgroundColor: "var(--c-context-front)",
          transition: "width 0.25s",
          borderRadius: "1rem",
        }}
      />
    </div>
  );
}
