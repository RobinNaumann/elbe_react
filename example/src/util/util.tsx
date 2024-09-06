import { Signal, useSignal } from "@preact/signals";
import { Button, FlexSpace, IconButton, Row, Text } from "elbe-ui";
import { icons } from "lucide-react";
import { useState } from "preact/hooks";

export function useConfigSignal(
  label,
  initial: boolean
): {
  label: string;
  signal: Signal<boolean>;
} {
  const signal = useSignal(initial);
  return { label, signal };
}

export function ExampleSection({ title, children }) {
  return (
    <div class="column cross-stretch" style="gap: 1.5rem">
      <Text.h2 v={title} />
      <div class="column cross-stretch" style="gap: 3rem">
        {children}
      </div>
    </div>
  );
}

export function ExampleGroup({
  title,
  description,
  code,
  children,
  classes,
  config,
}: {
  title: string;
  description: string;
  code: string;
  children: any;
  classes?: string;
  config?: {
    label: string;
    signal: Signal<boolean>;
  }[];
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div class="column cross-stretch">
      <Row>
        <Text.h3 v={title} />
        <FlexSpace />
        {code && (
          <IconButton.integrated
            icon={icons.Code}
            onTap={() => setShowCode(!showCode)}
          />
        )}
      </Row>

      <span style="text-align: start; margin-top: -1rem; white-space: pre-wrap">
        {description?.trim()}
      </span>
      {showCode && (
        <div class="inverse code" style="overflow: auto;">
          {code?.trim()}
        </div>
      )}
      {config && (
        <div
          class="card secondary row wrap gap-0"
          style="padding: 0; overflow: hidden;"
        >
          {config.map((c) =>
            Button.action({
              icon: c.signal.value ? icons.CircleCheckBig : icons.Circle,
              message: c.label,
              onTap: () => (c.signal.value = !c.signal.value),
            })
          )}
        </div>
      )}
      <div class={classes || "row"}>{children}</div>
    </div>
  );
}
