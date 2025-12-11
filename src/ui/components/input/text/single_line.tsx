import {
  ColorSelection,
  IconButton,
  IconChild,
  Row,
  Spaced,
} from "../../../..";

type _InputMsg = {
  kind: ColorSelection.KindsAlert;
  msg: string;
};

export type SLInputFieldProps = {
  leading?: IconChild;
  onLeadingTap?: () => void;
  trailing?: IconChild;
  onTrailingTap?: () => void;
  onInput?: (value: string) => void;
  value: string;
  hint?: string;
  message?: _InputMsg | null;
};

export function _SingleLineField(
  p: SLInputFieldProps & {
    inputType: string;
  }
) {
  return (
    <Row gap={0}>
      <_Supplement
        kind={p.message?.kind}
        icon={p.leading}
        onMessage={!!p.message}
        onEnabled={!!p.onInput}
        onTap={p.onLeadingTap}
      />
      <input
        type={p.inputType}
        style={{
          width: "100%",
          height: "3rem",
          flex: 1,
          border: "none",
          outline: "none",
          background: "none",
        }}
        size={5}
        placeholder={p.hint}
        value={p.value}
        onInput={(e) => p.onInput && p.onInput(e.currentTarget.value)}
        readOnly={p.onInput ? false : true}
      />
      <_Supplement
        kind={p.message?.kind}
        trailing
        icon={p.trailing}
        onMessage={!!p.message}
        onEnabled={!!p.onInput}
        onTap={p.onTrailingTap}
      />
    </Row>
  );
}

function _Supplement(p: {
  kind?: ColorSelection.KindsAlert;
  trailing?: boolean;
  icon?: IconChild;
  onMessage: boolean;
  onEnabled: boolean;
  onTap?: () => void;
}) {
  if (!p.icon) return <Spaced width={0.75} />;
  return (
    <IconButton
      kind={p.kind}
      manner={p.onMessage ? "minor" : p.kind ? "flat" : "plain"}
      ariaLabel={p.trailing ? "trailing icon" : "leading icon"}
      icon={p.icon}
      style={{
        borderRadius: 0,
        transition: "none",
        backgroundColor: p.onEnabled ? undefined : "transparent",
      }}
      onTap={p.onTap ? () => p.onTap?.() : undefined}
    />
  );
}
