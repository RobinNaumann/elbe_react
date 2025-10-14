import { ChooseButton, cKinds, cManners, Scroll, tVariants } from "elbe-ui";
import { useState } from "react";
import { ExampleSection } from "../util/section";

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
      <_TypeDemo />
    </ExampleSection>
  );
}

function _ColorDemo() {
  const [mode, setMode] = useState("primary");
  return (
    <div className={`column`}>
      <div className="row gap-none rounded">
        <ChooseButton
          items={[
            { value: "primary", label: "primary" },
            { value: "secondary", label: "secondary" },
            { value: "inverse", label: "inverse" },
          ]}
          onChange={(v) => setMode(v)}
          value={mode}
        />
      </div>
      <Scroll.horizontal className={`${mode} card column`} innerClass="column">
        {cKinds.map((s, i) => (
          <div key={i} className="row">
            <div className="card" style={{ width: "8rem" }}>
              {s}
            </div>
            {cManners
              .filter((v) => v !== "plain")
              .map(
                (v, i) =>
                  (s !== "plain" || v === "flat") && (
                    <div key={i} className={`${v} ${s} card column b action`}>
                      {v}
                    </div>
                  )
              )}
          </div>
        ))}
      </Scroll.horizontal>
    </div>
  );
}

function _TypeDemo() {
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
}
