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
        //onChange={(v) => themeBit.setConfig({ highVis: v })}
      />
      <ToggleButton
        ariaLabel="reduced motion"
        value={theme.motion.reduced ?? false}
        label="reduced motion"
        //onChange={(v) => themeBit.setConfig({ reducedMotion: v })}
      />
      <ToggleButton
        ariaLabel="larger text"
        value={(theme.geometry.size ?? 1) > 1}
        label="larger text"
        //onChange={(v) => themeBit.setConfig({ scale: v ? 1.25 : 1 })}
      />
    </Row>
  ));
}
