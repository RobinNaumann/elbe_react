import { CheckIcon } from "lucide-react";
import type { ElbeColorKinds } from "../../theme/colors";
import { Card } from "../base/card";
import { Spaced } from "../layout/spaced";
import { Button } from "./button";
import type { IconChild } from "./icon_button";

export interface ChooseItem<T> {
  value: T;
  label?: string;
  icon?: IconChild;
  ariaLabel?: string;
}

export function ChooseButton<T>({
  items,
  value,
  onChange,
  kind,
  column = false,
}: {
  items: ChooseItem<T>[];
  value: T;
  onChange?: (v: T) => void;
  kind?: ElbeColorKinds;
  column?: boolean;
}) {
  return (
    <Card
      kind="accent"
      manner="major"
      padding={0}
      overflow="hidden"
      role="radiogroup"
      disabled={!onChange}
      class={`${column ? "column" : "row"} gap-none`}
    >
      {items.map((e) => (
        <Button
          ariaLabel={e.ariaLabel ?? e.label ?? null}
          manner={e.value === value ? "major" : "flat"}
          kind={kind}
          onTap={onChange && (() => onChange(e.value))}
          class={`sharp ${column ? "main-between gap-double" : ""}`}
        >
          <div class="row gap-half">
            {typeof e.icon === "function" ? e.icon({}) : e.icon}
            {e.label && <span>{e.label}</span>}
          </div>
          {column &&
            (e.value === value ? <CheckIcon /> : <Spaced amount={1.5} />)}
        </Button>
      ))}
    </Card>
  );
}
