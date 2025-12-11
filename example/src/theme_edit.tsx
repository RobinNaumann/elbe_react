import {
  Button,
  Card,
  ChooseButton,
  colors,
  Column,
  ElbeDialog,
  Icons,
  LayerColor,
  Range,
  Row,
  Text,
  ToggleButton,
} from "elbe-ui";
import { useState } from "react";
import { ThemeBit } from "./util/b_theme";

export function ThemeEdit() {
  const [open, setOpen] = useState(false);
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((v) => (
    <Card scheme="secondary">
      <Column>
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
          onTap={() => setOpen(true)}
        />
        <ElbeDialog
          title="Theme Seed"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="card inverse code">
            {JSON.stringify(v.seed, null, 2)}
          </div>
        </ElbeDialog>
      </Column>
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
    <Column>
      <Text.h5 v="geometry" />
      <Row>
        <Text v="roundness" style={labelStyle} />

        <Range
          ariaLabel="set roundness"
          style={{ flex: 1 }}
          value={d.seed?.geometry?.radius ?? 0}
          onChange={(v) =>
            themeBit.setSeed(() => ({
              geometry: {
                ...d.seed.geometry,
                radius: v,
              },
            }))
          }
          max={2}
          step={0.1}
        />
      </Row>
      <Row>
        <Text v="border width" style={labelStyle} />
        <Range
          ariaLabel="set border width"
          style={{ flex: 1 }}
          value={d.seed?.geometry?.borderWidth ?? 0}
          onChange={(v) =>
            themeBit.setSeed(() => ({
              geometry: {
                ...d.seed.geometry,
                borderWidth: v,
              },
            }))
          }
          max={0.25}
          step={0.05}
        />
      </Row>
    </Column>
  ));
}

function _TypeSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((v) => (
    <Column>
      <Text.h5 v="typography" />
      <Row>
        <Text v="title font" style={labelStyle} />
        <Row style={{ overflowX: "auto", flex: 1, padding: ".25rem 0" }}>
          <Row style={{ minWidth: "max-content" }}>
            {[
              "Calistoga",
              "Inter",
              "Delius",
              "Space Mono",
              "Atkinson Hyperlegible",
            ].map((f, i) => (
              <ToggleButton
                key={i}
                ariaLabel={`set ${f} as title font`}
                label={f}
                style={{ fontFamily: f }}
                value={f === v.seed?.type?.heading?.family[0]}
                onChange={() =>
                  themeBit.setSeed((v) => ({
                    type: {
                      ...v.type,
                      heading: {
                        bold: true,
                        family: [f, "Arial", "sans-serif"],
                        size: 2.2,
                      },
                    },
                  }))
                }
              />
            ))}
          </Row>
        </Row>
      </Row>
    </Column>
  ));
}

function _AccentSelect() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI((d) => (
    <Column gap={1.2}>
      <Text.h5 v="color" />
      <Row>
        <Text v="mode" style={labelStyle} />

        <ChooseButton<boolean>
          items={
            [
              { value: false, label: "light", icon: Icons.Sun },
              { value: true, label: "dark", icon: Icons.Moon },
            ] as const
          }
          value={d.seed.color.selection?.mode === "dark"}
          onChange={(m) => {
            themeBit.setSeed((v) => ({
              color: {
                ...v.color,
                selection: v.color.selection
                  ? {
                      ...v.color.selection!,
                      mode: m ? "dark" : "light",
                    }
                  : undefined,
              },
            }));
          }}
        />
      </Row>

      <Row>
        <Text v="accent" style={labelStyle} />

        <Row flex scroll>
          <Row style={{ minWidth: "max-content" }}>
            {[
              colors.accent.blue.hex(),
              "#04395eff",
              "#38a3a5ff",
              "#70a288ff",
              "#d5896fff",
              "#f77f00ff",
              "#d62828ff",
            ].map((c, i) => (
              <div
                key={i}
                onClick={() =>
                  themeBit.setSeed((v) => ({
                    color: {
                      ...v.color,
                      accent: LayerColor.fromBack(c),
                    },
                  }))
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: c,
                  padding: ".5rem",
                  borderRadius: "3rem",
                  color: "white",
                }}
              >
                {c ===
                LayerColor.fromBack(
                  d.seed?.color?.accent ?? "#000000"
                )?.hex() ? (
                  <Icons.Check />
                ) : (
                  <Icons.None />
                )}
              </div>
            ))}
          </Row>
        </Row>
      </Row>
    </Column>
  ));
}
