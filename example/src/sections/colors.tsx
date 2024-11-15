import { useSignal } from "@preact/signals";
import { ChooseButton, cKinds, cManners, Scroll, tVariants } from "elbe-ui";
import { ExampleSection } from "../util/section";

export function ColorsSection({}) {
  return (
    <ExampleSection title="Color Theme" anchor="color">
      <_ColorDemo />
    </ExampleSection>
  );
}

export function TypographySection({}) {
  return (
    <ExampleSection title="Typography" anchor="typography">
      <_TypeDemo />
    </ExampleSection>
  );
}

function _ColorDemo({}) {
  const modeSig = useSignal("primary");
  return (
    <div class={`column`}>
      <div class="row gap-none rounded">
        <ChooseButton
          items={[
            { value: "primary", label: "primary" },
            { value: "secondary", label: "secondary" },
            { value: "inverse", label: "inverse" },
          ]}
          onChange={(v) => (modeSig.value = v)}
          value={modeSig.value}
        />
      </div>
      <Scroll.horizontal
        class={`${modeSig.value} card column`}
        innerClass="column"
      >
        {cKinds.map((s) => (
          <div class="row">
            <div class="card" style="width: 8rem">
              {s}
            </div>
            {cManners
              .filter((v) => v !== "plain")
              .map(
                (v) =>
                  (s !== "plain" || v === "flat") && (
                    <div class={`${v} ${s} card column b action`}>{v}</div>
                  )
              )}
          </div>
        ))}
      </Scroll.horizontal>
    </div>
  );
}

function _TypeDemo({}) {
  return (
    <>
      <div class="card">
        {tVariants.map((v) => (
          <div style={{ marginBottom: ".5rem" }} class={v}>
            {v} text
          </div>
        ))}
      </div>
    </>
  );
}
