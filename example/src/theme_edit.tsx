import { useSignal } from "@preact/signals";
import {
  Button,
  Card,
  ChooseButton,
  ElbeDialog,
  Icons,
  LayerColor,
  Range,
  Text,
} from "elbe-ui";
import { ThemeBit } from "./util/b_theme";

export function ThemeEdit() {
  const openSig = useSignal(false);
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <Card scheme="secondary" class="column">
      <div>
        Edit the theme in real time. There are even more options in the code
      </div>
      <_AccentSelect />
      <_TypeSelect />
      <_RoundSelect />
      <Button.flat
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
  return themeBit.onData((v) => (
    <div class="column">
      <Text.h5 v="geometry" />
      <div class="row">
        <Text v="roundness" style={labelStyle} />

        <Range
          style={{ flex: 1 }}
          value={v.seed?.geometry?.radius ?? 0}
          onChange={(v) => themeBit.ctrl.setGeometry({ radius: v })}
          max={2}
          step={0.1}
        />
      </div>
      <div class="row">
        <Text v="border width" style={labelStyle} />
        <Range
          style={{ flex: 1 }}
          value={v.seed?.geometry?.borderWidth ?? 0}
          onChange={(v) => themeBit.ctrl.setGeometry({ borderWidth: v })}
          max={0.25}
          step={0.05}
        />
      </div>
    </div>
  ));
}

function _TypeSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <div class="column">
      <Text.h5 v="typography" />
      <div class="row">
        <Text v="title font" style={labelStyle} />
        <div class="row main-start" style={{ overflowX: "auto", flex: 1 }}>
          <div class="row main-start" style={{ minWidth: "max-content" }}>
            {[
              "Calistoga",
              "Inter",
              "Delius",
              "Space Mono",
              "Atkinson Hyperlegible",
            ].map((f) => (
              <Button
                label={f}
                style={{ fontFamily: f }}
                manner={
                  f === v.seed?.type?.heading?.family[0] ? "minor" : "flat"
                }
                onTap={() =>
                  themeBit.ctrl.setType({
                    heading: {
                      bold: true,
                      family: [f, "Arial", "sans-serif"],
                      size: 2.2,
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
  return themeBit.onData((v) => (
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
          value={v.dark}
          onChange={(v) => themeBit.ctrl.setDark(v)}
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
                  themeBit.ctrl.setColor({ accent: LayerColor.fromHex(c) })
                }
                class="column"
                style={{
                  backgroundColor: c,
                  padding: ".5rem",
                  borderRadius: "3rem",
                  color: "white",
                }}
              >
                {c === v.seed?.color?.accent?.hex ? (
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
