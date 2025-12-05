import {
  Card,
  ChooseButton,
  Column,
  Row,
  Scroll,
  type ColorSelection,
} from "elbe-ui";
import { useState } from "react";
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
    <ExampleSection title="Typography" anchor="typography"></ExampleSection>
  );
}

function _ColorDemo() {
  const [mode, setMode] = useState<ColorSelection.Schemes>("primary");

  return (
    <Column>
      <Row gap={0}>
        <ChooseButton
          items={[
            { value: "primary", label: "primary" },
            { value: "secondary", label: "secondary" },
            { value: "inverse", label: "inverse" },
          ]}
          onChange={(v) => setMode(v as ColorSelection.Schemes)}
          value={mode}
        />
      </Row>
      <Card scheme={mode}>
        <Scroll.horizontal>
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
