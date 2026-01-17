import { applyProps, clamp, ElbeProps } from "../..";
import { useApp } from "../app/app_ctxt";

/** * A progress bar component that visually represents a value within a specified range.
 *
 * **Properties:**
 * - `value` (number): The current value of the progress bar.
 * - `max` (number): The maximum value of the progress bar. Default is 100.
 * - `manner` ("flat" | "plain"): The visual style of the progress bar.
 */
export function ProgressBar({
  value,
  max = 100,
  manner = "flat",
  ...elbe
}: {
  value: number;
  max?: number;
  manner: "flat" | "plain";
} & ElbeProps) {
  const { _appThemeContext } = useApp({ useFallback: true });
  const theme = _appThemeContext.useTheme().useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          manner: manner,
        },
      },
    }),
    [manner]
  );
  return (
    <div
      {...applyProps(
        "progress_bar",
        {
          role: "progressbar",
          ...elbe,
        },
        [],
        {
          width: "100%",
          height: "0.5rem",

          borderRadius: theme.theme.geometry.radius + "rem",
          border: "none",
        }
      )}
    >
      <div
        style={{
          width: `${clamp((value / max) * 100, 0, 100)}%`,
          height: "100%",
          backgroundColor: theme.theme.color.currentColor.front.asCss(),
          transition: theme.theme.motion.reduced ? "none" : "width 0.25s",
          borderRadius: theme.theme.geometry.radius + "rem",
        }}
      />
    </div>
  );
}
