import { Card, Row, ToggleButton } from "elbe-ui";
import { ThemeBit } from "./util/b_theme";

export function AccessibilityEdit() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(() => (
    <Card scheme="secondary" className="column">
      <div>explore the accessibility options</div>

      <_OptionsSelect />
    </Card>
  ));
}

function _OptionsSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((v) => (
    <Row wrap>
      <ToggleButton
        ariaLabel="high visibility"
        value={v.config.highVis ?? false}
        label="high visibility"
        onChange={(v) => themeBit.setConfig({ highVis: v })}
      />
      <ToggleButton
        ariaLabel="reduced motion"
        value={v.config.reducedMotion ?? false}
        label="reduced motion"
        onChange={(v) => themeBit.setConfig({ reducedMotion: v })}
      />
      <ToggleButton
        ariaLabel="larger text"
        value={(v?.config?.scale ?? 1) > 1}
        label="larger text"
        onChange={(v) => themeBit.setConfig({ scale: v ? 1.25 : 1 })}
      />
    </Row>
  ));
}
