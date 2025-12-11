import { useState } from "react";
import { useApp } from "../../app/app_ctxt";
import { ColorSelection } from "../../theme/subthemes/color/colors/colors";
import { ElbeThemeContextData } from "../../theme/theme";
import { ElbeChildren } from "../../util/types";

export function WithStateTheme(p: {
  theme: ElbeThemeContextData<{}>;
  manner?: Exclude<ColorSelection.Manners, "major" | "minor">;
  disabled?: boolean;
  children: ElbeChildren;
}) {
  const { appConfig } = useApp();
  const [elState, setElState] = useState<ColorSelection.States>("neutral");
  if (!p.theme) {
    console.error("WithStateTheme: No theme provided");
  }
  const theme = p.theme.useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          manner: p.manner ?? color.selection.manner,
          state: p.disabled ? "disabled" : elState,
        },
      },
    }),
    [p.theme, elState, p.disabled, p.manner]
  );

  return (
    <appConfig.themeContext.WithTheme theme={theme}>
      <div
        onMouseEnter={(e) => {
          e.stopPropagation();
          setElState("hover");
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setElState("neutral");
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setElState("active");
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          setElState("hover");
        }}
        style={{
          display: "contents",
          pointerEvents: p.disabled ? "none" : undefined,
          cursor: p.disabled ? "not-allowed" : "pointer",
        }} // preserves layout
      >
        {p.children}
      </div>
    </appConfig.themeContext.WithTheme>
  );
}
