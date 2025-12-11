import {
  Card,
  ChooseButton,
  Column,
  elbeThemeVariants,
  Row,
  Scroll,
  Text,
  type ColorSelection,
} from "elbe-ui";
import { useState } from "react";
import type { ElbeTypeVariants } from "../../../dist/ui/theme/subthemes/_theme_type";
import { ExampleSection } from "../util/section";
import { cKinds, cManners } from "../util/util";

export function ColorsSection() {
  return (
    <ExampleSection title="Color Theme" anchor="color">
      <_ColorDemo />
    </ExampleSection>
  );
}

export function TypographySection() {
  return (
    <ExampleSection title="Typography" anchor="typography">
      <Column>
        {elbeThemeVariants.map((v: ElbeTypeVariants) => (
          <Text variant={v} v={`This is ${v} text`} align="center" />
        ))}
      </Column>
    </ExampleSection>
  );
}

function _ColorDemo() {
  const [mode, setMode] = useState<ColorSelection.Schemes>("primary");
  const [state, setState] = useState<ColorSelection.States>("neutral");

  return (
    <Column>
      <Column>
        <ChooseButton
          items={[
            { value: "primary", label: "primary" },
            { value: "secondary", label: "secondary" },
            { value: "inverse", label: "inverse" },
          ]}
          onChange={(v) => setMode(v as ColorSelection.Schemes)}
          value={mode}
        />
        <ChooseButton
          items={[
            { value: "neutral", label: "neutral" },
            { value: "hover", label: "hover" },
            { value: "active", label: "active" },
            { value: "disabled", label: "disabled" },
          ]}
          onChange={(v) => setState(v as ColorSelection.States)}
          value={state}
        />
      </Column>
      <Card scheme={mode}>
        <Scroll.horizontal noScrollbars>
          <Column>
            {cKinds.map((s, i) => (
              <Row key={i}>
                <Card style={{ width: "8rem" }}>{s}</Card>
                {cManners.map((m, i) => (
                  <Card
                    key={i}
                    kind={s as ColorSelection.Kinds}
                    manner={m as ColorSelection.Manners}
                    style={{ width: "6rem", textAlign: "center" }}
                    state={state}
                    bordered
                  >
                    {m}
                  </Card>
                ))}
              </Row>
            ))}
          </Column>
        </Scroll.horizontal>
      </Card>
    </Column>
  );
}

/*function _TypeDemo() {
  return (
    <>
      <div className="card">
        {tVariants.map((v, i) => (
          <div key={i} style={{ marginBottom: ".5rem" }} className={v}>
            {v} text
          </div>
        ))}
      </div>
    </>
  );
}*/
