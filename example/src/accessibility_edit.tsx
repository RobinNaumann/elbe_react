import { Card, Column, Row, ToggleButton } from "elbe-ui";
import { useTheme } from "./app";
import { ThemeBit } from "./util/b_theme";

export function AccessibilityEdit() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(() => (
    <Card scheme="secondary">
      <Column>
        <div>explore the accessibility options</div>

        <_OptionsSelect />
      </Column>
    </Card>
  ));
}

function _OptionsSelect() {
  const { theme } = useTheme();
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(() => (
    <Row wrap>
      <ToggleButton
        ariaLabel="high visibility"
        value={theme.color.isContrast ?? false}
        label="high visibility"
        onChange={(v) =>
          themeBit.setSeed((t) => ({
            color: {
              ...t.color,
              selection: t.color.selection
                ? {
                    ...t.color.selection!,
                    contrast: v ? "highvis" : "normal",
                  }
                : undefined,
            },
          }))
        }
      />
      <ToggleButton
        ariaLabel="reduced motion"
        value={theme.motion.reduced ?? false}
        label="reduced motion"
        onChange={(v) =>
          themeBit.setSeed((t) => ({
            motion: {
              ...t.motion,
              reduced: v,
            },
          }))
        }
      />
      <ToggleButton
        ariaLabel="larger text"
        value={(theme.geometry.size ?? 1) > 16}
        label="larger text"
        onChange={(v) =>
          themeBit.setSeed((t) => ({
            geometry: {
              ...t.geometry,
              size: v ? 20 : 16,
            },
          }))
        }
      />
    </Row>
  ));
}
