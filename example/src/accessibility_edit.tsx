import { useSignal } from "@preact/signals";
import { Card, Row, ToggleButton } from "elbe-ui";
import { ThemeBit } from "./util/b_theme";

export function AccessibilityEdit() {
  const openSig = useSignal(false);
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <Card scheme="secondary" class="column">
      <div>explore the accessibility options</div>

      <_OptionsSelect />
    </Card>
  ));
}

const labelStyle = {
  width: "6rem",
  minWidth: "6rem",
  height: "3rem",
  alignContent: "center",
};

function _OptionsSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <Row wrap>
      <ToggleButton
        ariaLabel="high visibility"
        value={v.config.highVis}
        label="high visibility"
        onChange={(v) => themeBit.ctrl.setConfig({ highVis: v })}
      />
      <ToggleButton
        ariaLabel="reduced motion"
        value={v.config.reducedMotion}
        label="reduced motion"
        onChange={(v) => themeBit.ctrl.setConfig({ reducedMotion: v })}
      />
      <ToggleButton
        ariaLabel="larger text"
        value={v.config.scale > 1}
        label="larger text"
        onChange={(v) => themeBit.ctrl.setConfig({ scale: v ? 1.25 : 1 })}
      />
    </Row>
  ));
}
