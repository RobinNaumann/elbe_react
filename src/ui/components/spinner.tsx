import { useComputed, useSignal } from "@preact/signals";
import { Component } from "preact";
import { useEffect } from "preact/hooks";
import { useThemeConfig } from "../theme/theme_context";

function _toPath(
  c: [number, number][],
  yFac: number,
  yOffset: number = 0,
  clamp: [number, number] = [0, 1],
  xFac: number = 1
) {
  return c
    .filter((p) => p[0] >= clamp[0] && p[0] <= clamp[1])
    .map(
      (p, i) =>
        (i === 0 ? "M" : "L") +
        (((p[0] - 0.5) * xFac + 0.5) * 100).toFixed(2) +
        "," +
        (p[1] * yFac + yOffset).toFixed(2)
    )
    .join(" ");
}

export type SpinnerProps = {
  padding?: number;
};

export class Spinner extends Component<
  { manner?: "flat" | "plain" } & SpinnerProps
> {
  static flat = (p: SpinnerProps) =>
    new Spinner({ manner: "flat", ...p }).render();
  static plain = (p: SpinnerProps) =>
    new Spinner({ manner: "plain", ...p }).render();

  render() {
    const tConfig = useThemeConfig();
    const flat = (this.props.manner ?? "flat") === "flat";
    const xSig = useSignal(0);

    useEffect(() => {
      if (tConfig.reducedMotion) return;
      const interval = setInterval(() => {
        xSig.value = (xSig.value + 2) % 100;
      }, 16);
      return () => clearInterval(interval);
    });

    const path = useComputed(() => {
      const x = xSig.value;

      const path: [number, number][] = [];
      for (let i = 0; i <= 1; i += 0.01) {
        const pos = (i * 1 + x * 0.01) * Math.PI * 2; // angle = 0 -> 2π
        const y = Math.sin(pos);
        path.push([i, y]);
      }
      return path;
    });

    return (
      <div
        class={`${flat ? "accent flat" : "plain"}`}
        style={{
          padding: `${this.props.padding ?? 1}rem`,
        }}
      >
        <svg style="width: 40px; height: 40px" viewBox={`-10 -10 120 120`}>
          {[
            _toPath(path.value, 13, 20, [0.4, 0.8], 1),
            _toPath(path.value, 10, 50),
            _toPath(path.value, 11, 80, [0.2, 0.6], 1),
          ].map((p) => (
            <path
              d={p}
              fill="none"
              stroke="currentcolor"
              stroke-width="10"
              stroke-linecap="round"
            />
          ))}
        </svg>
      </div>
    );
  }
}
