import {
  applyProps,
  Card,
  ElbeAlertKinds,
  ElbeColorKinds,
  IconButton,
  IconChild,
  InputFieldProps,
  Row,
  Spaced,
} from "../../../..";

type _InputMsg = {
  kind: ElbeAlertKinds;
  msg: string;
};

export interface SLInputFieldProps extends InputFieldProps {
  leading?: IconChild;
  onLeadingTap?: () => void;
  trailing?: IconChild;
  onTrailingTap?: () => void;
}

export function _SingleLineField(p: {
  props: SLInputFieldProps;
  msg: _InputMsg | null;
  type: string;
  id: string;
}) {
  return (
    <Row gap={0}>
      <_Supplement
        kind={p.msg?.kind}
        icon={p.props.leading}
        onTap={p.props.onLeadingTap}
      />
      <input
        type={p.type}
        {...applyProps(
          "text_field",
          {
            ...p.props,
            id: p.id,
            ariaLabel: p.props.ariaLabel ?? p.props.label,
          },
          null,
          {
            width: "100%",
            height: "3rem",
            flex: 1,
            border: "none",
            outline: "none",
            background: "none",
          }
        )}
        size={5}
        placeholder={p.props.hint}
        value={p.props.value}
        onInput={(e) =>
          p.props.onInput && p.props.onInput(e.currentTarget.value)
        }
        readOnly={p.props.onInput ? false : true}
      />
      <_Supplement
        kind={p.msg?.kind}
        trailing
        icon={p.props.trailing}
        onTap={p.props.onTrailingTap}
      />
    </Row>
  );
}

function _Supplement(p: {
  kind?: ElbeColorKinds;
  trailing?: boolean;
  icon?: IconChild;
  onTap?: () => void;
}) {
  if (!p.icon) return <Spaced width={0.75} />;
  return (
    <Card
      sharp
      padding={0}
      style={{
        border: "none",
        background: p.onTap ? undefined : "transparent",
      }}
    >
      <IconButton
        kind={p.kind}
        manner={p.kind ? "minor" : "plain"}
        ariaLabel={p.trailing ? "trailing icon" : "leading icon"}
        icon={p.icon}
        style={{
          borderRadius: 0,
          background: p.onTap ? undefined : "transparent",
        }}
        onTap={(e) => {
          e.stopPropagation();
          p.onTap?.();
        }}
      />
    </Card>
  );
}
