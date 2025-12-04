import { CheckIcon } from "lucide-react";
import { ColorSelection, Row } from "../../..";
import { Card } from "../base/card";
import { Spaced } from "../layout/spaced";
import { Button } from "./button";
import { Icon, type IconChild } from "./icon_button";

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
  kind?: ColorSelection.Kinds;
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
      //TODO: fix duplication of row/column classes
      className={`${column ? "column" : "row"} gap-none`}
    >
      {items.map((e, i) => (
        <Button
          key={i}
          ariaLabel={e.ariaLabel ?? e.label ?? null}
          manner={e.value === value ? "major" : "flat"}
          kind={kind}
          onTap={onChange && (() => onChange(e.value))}
          className={`sharp ${column ? "main-between gap-double" : ""}`}
        >
          <Row gap={0.5}>
            <Icon icon={Icon} />
            {e.label && <span>{e.label}</span>}
          </Row>

          {column &&
            (e.value === value ? <CheckIcon /> : <Spaced amount={1.5} />)}
        </Button>
      ))}
    </Card>
  );
}
