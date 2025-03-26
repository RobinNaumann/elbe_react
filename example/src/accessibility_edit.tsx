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
        value={v.highVis}
        label="high visibility"
        onChange={(v) => themeBit.ctrl.setHighVis(v)}
      />
      <ToggleButton
        ariaLabel="reduced motion"
        value={v.reducedMotion}
        label="reduced motion"
        onChange={(v) => themeBit.ctrl.setReducedMotion(v)}
      />
    </Row>
  ));
}
