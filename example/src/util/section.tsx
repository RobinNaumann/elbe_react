import { Button, FlexSpace, Row, Text, type ElbeChildren } from "elbe-ui";
import { icons } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function useConfigSignal(
  label: string,
  initial: boolean
): {
  label: string;
  signal: {
    value: boolean;
    set: (v: boolean) => void;
  };
} {
  const [signal, setSignal] = useState(initial);
  return { label, signal: { value: signal, set: setSignal } };
}

export function ExampleSection({
  title,
  anchor,
  children,
}: {
  title: string;
  anchor: string;
  children?: ElbeChildren;
}) {
  return (
    <div className="column cross-stretch" style={{ gap: "1.5rem" }}>
      <Text.h2 v={title} id={anchor} />
      <div className="column cross-stretch" style={{ gap: "3rem" }}>
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
  children: ElbeChildren;
  classes?: string;
  config?: {
    label: string;
    signal: { value: boolean; set: (v: boolean) => void };
  }[];
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="column cross-stretch">
      <Row>
        <Text.h4 v={title} />
        <FlexSpace />
        {code && (
          <Button.plain
            ariaLabel={showCode ? "Hide Code" : "Show Code"}
            icon={icons.Code}
            onTap={() => setShowCode(!showCode)}
          />
        )}
      </Row>

      <span
        style={{
          textAlign: "start",
          marginTop: "-1rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {description?.trim()}
      </span>
      {showCode && (
        <div className="card inverse code" style={{ overflow: "auto" }}>
          {code?.trim()}
        </div>
      )}
      {config && (
        <div
          className="card secondary row wrap gap-0"
          style={{
            padding: 0,
            overflow: "visible",
          }}
        >
          {config.map((c, i) => (
            <Button.flat
              key={i}
              ariaLabel={c.label}
              icon={c.signal.value ? icons.CircleCheckBig : icons.Circle}
              label={c.label}
              onTap={() => c.signal.set(!c.signal.value)}
            />
          ))}
        </div>
      )}
      <div className={classes || "row"}>{children}</div>
    </div>
  );
}
