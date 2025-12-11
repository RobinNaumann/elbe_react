import { CheckIcon } from "lucide-react";
import { ColorSelection, FlexLayout, Row, Text } from "../../..";
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
  sharp?: boolean;
}) {
  return (
    <Card
      kind="accent"
      manner="major"
      padding={0}
      overflow="hidden"
      role="radiogroup"
      bordered
      onTap={onChange ? undefined : null}
      style={{
        maxWidth: "fit-content",
      }}
    >
      <FlexLayout direction={column ? "column" : "row"} cross="stretch" gap={0}>
        {items.map((e, i) => (
          <Button
            key={i}
            ariaLabel={e.ariaLabel ?? e.label ?? null}
            manner={e.value === value ? "major" : "flat"}
            kind={kind}
            onTap={onChange && (() => onChange(e.value))}
            sharp
            contentAlign="space-between"
            gap={column ? 2 : undefined}
          >
            <Row gap={0.5}>
              {e.icon && <Icon icon={e.icon} />}
              {e.label && <Text bold v={e.label} />}
            </Row>

            {column &&
              (e.value === value ? <CheckIcon /> : <Spaced amount={1.5} />)}
          </Button>
        ))}
      </FlexLayout>
    </Card>
  );
}
