import { useSignal } from "@preact/signals";
import {
  Button,
  Card,
  ChooseButton,
  ElbeDialog,
  Icons,
  LayerColor,
  lColor,
  Range,
  Text,
  ToggleButton,
} from "elbe-ui";
import { ThemeBit } from "./util/b_theme";

export function ThemeEdit() {
  const openSig = useSignal(false);
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((v) => (
    <Card scheme="secondary" class="column">
      <div>
        Edit the theme in real time. There are even more options in the code
      </div>

      <_AccentSelect />
      <_TypeSelect />
      <_RoundSelect />
      <Button.flat
        ariaLabel="view seed"
        icon={Icons.Sprout}
        label="view seed"
        onTap={() => (openSig.value = true)}
      />
      <ElbeDialog
        title="Theme Seed"
        open={openSig.value}
        onClose={() => (openSig.value = false)}
      >
        <div class="card inverse code">{JSON.stringify(v.seed, null, 2)}</div>
      </ElbeDialog>
    </Card>
  ));
}

const labelStyle = {
  width: "6rem",
  minWidth: "6rem",
  height: "3rem",
  alignContent: "center",
};

function _RoundSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((d) => (
    <div class="column">
      <Text.h5 v="geometry" />
      <div class="row">
        <Text v="roundness" style={labelStyle} />

        <Range
          ariaLabel="set roundness"
          style={{ flex: 1 }}
          value={d.seed?.geometry?.radius ?? 0}
          onChange={(v) =>
            themeBit.setSeed({
              geometry: {
                ...d.seed.geometry,
                radius: v,
              },
            })
          }
          max={2}
          step={0.1}
        />
      </div>
      <div class="row">
        <Text v="border width" style={labelStyle} />
        <Range
          ariaLabel="set border width"
          style={{ flex: 1 }}
          value={d.seed?.geometry?.borderWidth ?? 0}
          onChange={(v) =>
            themeBit.setSeed({
              geometry: {
                ...d.seed.geometry,
                borderWidth: v,
              },
            })
          }
          max={0.25}
          step={0.05}
        />
      </div>
    </div>
  ));
}

function _TypeSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((v) => (
    <div class="column">
      <Text.h5 v="typography" />
      <div class="row">
        <Text v="title font" style={labelStyle} />
        <div
          class="row main-start"
          style={{ overflowX: "auto", flex: 1, padding: ".25rem 0" }}
        >
          <div class="row main-start" style={{ minWidth: "max-content" }}>
            {[
              "Calistoga",
              "Inter",
              "Delius",
              "Space Mono",
              "Atkinson Hyperlegible",
            ].map((f) => (
              <ToggleButton
                ariaLabel={`set ${f} as title font`}
                label={f}
                style={{ fontFamily: f }}
                value={f === v.seed?.type?.heading?.family[0]}
                onChange={() =>
                  themeBit.setSeed({
                    type: {
                      ...v.seed.type,
                      heading: {
                        bold: true,
                        family: [f, "Arial", "sans-serif"],
                        size: 2.2,
                      },
                    },
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ));
}

function _AccentSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((d) => (
    <div class="column" style="gap: 1.2rem">
      <Text.h5 v="color" />
      <div class="row">
        <Text v="mode" style={labelStyle} />

        <ChooseButton<boolean>
          items={
            [
              { value: false, label: "light", icon: Icons.Sun },
              { value: true, label: "dark", icon: Icons.Moon },
            ] as const
          }
          value={d.config.dark}
          onChange={(v) => themeBit.setConfig({ dark: v })}
        />
      </div>

      <div class="row">
        <Text v="accent" style={labelStyle} />

        <div class="row main-start" style={{ overflowX: "auto", flex: 1 }}>
          <div class="row main-start" style={{ minWidth: "max-content" }}>
            {[
              "#3c77f6ff",
              "#04395eff",
              "#38a3a5ff",
              "#70a288ff",
              "#d5896fff",
              "#f77f00ff",
              "#d62828ff",
            ].map((c) => (
              <div
                onClick={() =>
                  themeBit.setSeed({
                    ...d.seed,
                    color: { accent: LayerColor.fromHex(c) },
                  })
                }
                class="column"
                style={{
                  backgroundColor: c,
                  padding: ".5rem",
                  borderRadius: "3rem",
                  color: "white",
                }}
              >
                {c === lColor(d.seed?.color?.accent)?.hex ? (
                  <Icons.Check />
                ) : (
                  <Icons.None />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ));
}
