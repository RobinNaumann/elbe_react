import { applyProps, Icons, type ElbeProps } from "../..";
import { _ElbeErr } from "../util/error_view";
import type { ElbeChild } from "../util/util";
import { Card } from "./card";
import { Column, FlexSpace } from "./flex";

export type ToggleButtonItem<T> = {
  icon?: (_: any) => ElbeChild;
  label: string;
  key: T;
};

export function ToggleButton<T>({
  items,
  onSelect,
  value,
  ...elbe
}: {
  items: ToggleButtonItem<T>[];

  onSelect: ((value: T) => void) | null;
  value: T;
} & ElbeProps) {
  return items.length < 1 ? (
    _ElbeErr("ToggleButton requires at least one item")
  ) : (
    <Card
      mode="light"
      colorScheme="primary"
      padding={0}
      {...applyProps(elbe, null, { overflow: "hidden", width: "100%" })}
    >
      <Column stretch gap={0}>
        {items.map((item) => (
          <Card
            onTap={onSelect ? () => onSelect(item.key) : undefined}
            class={`row b ${onSelect ? "pointer" : "disabled"}`}
            style={{ border: "none", borderRadius: 0, gap: ".75rem" }}
            colorStyle="accent"
            colorManner={value === item.key ? "minor" : "action"}
          >
            {item.icon?.({})}
            {item.label}
            <FlexSpace />
            {value === item.key && <Icons.Check />}
          </Card>
        ))}
      </Column>
    </Card>
  );
}
