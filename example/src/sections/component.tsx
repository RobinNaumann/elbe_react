import { useSignal } from "@preact/signals";
import {
  Badge,
  Banner,
  Box,
  Button,
  Card,
  Checkbox,
  ChooseButton,
  cManners,
  Column,
  ElbeDialog,
  Field,
  IconButton,
  Icons,
  Link,
  ProgressBar,
  Range,
  Row,
  Select,
  showConfirmDialog,
  showToast,
  Spinner,
  Switch,
  Text,
  ToggleButton,
} from "elbe-ui";
import { useEffect, useState } from "preact/hooks";

import { ExampleGroup, ExampleSection, useConfigSignal } from "../util/section";

export function ComponentsSection() {
  return (
    <>
      <ExampleSection title="Components" anchor="components">
        <_BoxGroup />
        <_CardGroup />
        <_TextGroup />
        <_IconGroup />
        <_IconButtonGroup />
        <_ButtonGroup />
        <_ToggleButtonGroup />
        <_ChooseButtonGroup />
        <_SelectGroup />
        <_RangeGroup />
        <_HRGroup />
        <_LinkGroup />
        <_BadgeGroup />
        <_BannerGroup />
        <_SpinnerGroup />
        <_ProgressBarGroup />
        <_CheckBoxGroup />
        <_SwitchGroup />
        <_TextInputGroup />
      </ExampleSection>
      <ExampleSection title="Modals" anchor="modals">
        <_DialogGroup />
        <_ConfirmDialog />
        <_ToastGroup />
      </ExampleSection>
      <ExampleSection title="Layout" anchor="layout">
        <_RowColGroup />
        <_RowColGroup column />
      </ExampleSection>
    </>
  );
}

function _TextInputGroup() {
  const disabledSig = useConfigSignal("disabled", false);
  const msgSig = useConfigSignal("message", false);
  const hideLabelSig = useConfigSignal("hide label", false);
  const flexSig = useConfigSignal("flex", false);

  return (
    <ExampleGroup
      title="Text Input"
      description="use these to get text input from the user. Where possible, they use system dialogs."
      classes={!flexSig.signal.value ? "row wrap cross-start" : "column"}
      config={[disabledSig, msgSig, hideLabelSig, flexSig]}
      code={`
<Field.text
  hint="your name" 
  value=""
  onInput={(value) => console.log(value)} />
  
<Field.multiLine hint="message" value="" />`}
    >
      <Field.text
        ariaLabel="name"
        hint="your name"
        label="name"
        hideLabel={hideLabelSig.signal.value}
        value=""
        flex={flexSig.signal.value}
        leading={Icons.User}
        trailing={Icons.Leaf}
        onTrailingTap={() => showToast("trailing icon click")}
        onInput={disabledSig.signal.value ? null : () => {}}
        infoMessage={msgSig.signal.value ? "this is an info" : undefined}
      />
      <Field.password
        label="password"
        hideLabel={hideLabelSig.signal.value}
        flex={flexSig.signal.value}
        hint="your password"
        tooltip="heyoo"
        value=""
        onInput={disabledSig.signal.value ? null : () => {}}
        warningMessage={msgSig.signal.value ? "this is a warning" : undefined}
      />
      <Field.date
        ariaLabel="birthday"
        hideLabel={hideLabelSig.signal.value}
        label="birthday"
        value=""
        flex={flexSig.signal.value}
        onInput={disabledSig.signal.value ? null : () => {}}
        errorMessage={msgSig.signal.value ? "this is an error" : undefined}
      />
      <Field.multiLine
        label="message"
        hideLabel={hideLabelSig.signal.value}
        hint="message"
        value=""
        flex={flexSig.signal.value}
        successMessage={msgSig.signal.value ? "this is a success" : undefined}
        onInput={disabledSig.signal.value ? null : () => {}}
      />
    </ExampleGroup>
  );
}

function _BoxGroup() {
  return (
    <ExampleGroup
      title="Box"
      description={"the basis for all components. Also selects a color scheme."}
      classes="row wrap"
      code={`<Box.secondary>...</Box.secondary>`}
    >
      {["primary", "secondary", "inverse"].map((v) => (
        <Box scheme={v as any} padding={0.5}>
          {v}
        </Box>
      ))}
    </ExampleGroup>
  );
}

function _CardGroup() {
  const borderedSig = useConfigSignal("bordered", true);

  return (
    <ExampleGroup
      title="Card"
      description={"a container with border and padding"}
      classes="row wrap"
      code={`<Card scheme="primary">...</Card>`}
      config={[borderedSig]}
    >
      {["primary", "secondary", "inverse"].map((v) => (
        <Card scheme={v as any} bordered={borderedSig.signal.value}>
          {v}
        </Card>
      ))}
    </ExampleGroup>
  );
}

function _TextGroup() {
  return (
    <ExampleGroup
      title="Text"
      description="texts with predefined styles"
      classes="row wrap"
      code={`<Text.h6 v="a small title"/>\n<Text.code> hello </Text.code>`}
    >
      <Text.h6 v="a small title" />
      <Text.code>some code</Text.code>
    </ExampleGroup>
  );
}

function _IconGroup() {
  return (
    <ExampleGroup
      title="Icon"
      description={"a collection of icon widgets"}
      classes="row wrap"
      code={`<Icons.Leaf />`}
    >
      <Icons.Leaf />
      <Icons.TreePine />
      <Icons.TreePalm />
    </ExampleGroup>
  );
}

function _IconButtonGroup() {
  const enabledSig = useConfigSignal("enabled", true);

  return (
    <ExampleGroup
      title="Icon Button"
      description="a button with one icon child"
      classes="row wrap"
      config={[enabledSig]}
      code={`<IconButton.minor icon={Icons.leaf} onTap={...} />`}
    >
      {cManners.map((v) => (
        <IconButton
          ariaLabel="icon button"
          manner={v}
          icon={Icons.Leaf}
          onTap={
            enabledSig.signal.value && (() => showToast("button was tapped"))
          }
        />
      ))}
    </ExampleGroup>
  );
}

function _ButtonGroup() {
  const enabledSig = useConfigSignal("enabled", true);
  const iconSig = useConfigSignal("icon", true);

  return (
    <ExampleGroup
      title="Button"
      description="a versatile button with different styles"
      classes="row wrap"
      config={[enabledSig, iconSig]}
      code={`<Button.minor icon={Icons.leaf} label="hey" onTap={...} />`}
    >
      {cManners.map((v) => (
        <Button
          ariaLabel="a button"
          manner={v}
          icon={iconSig.signal.value && Icons.Leaf}
          label={v}
          onTap={
            enabledSig.signal.value && (() => showToast("button was tapped"))
          }
        />
      ))}
    </ExampleGroup>
  );
}

function _ToggleButtonGroup() {
  const iconSig = useConfigSignal("icon", true);
  const enabledSig = useConfigSignal("enabled", true);
  const selSig = useSignal(true);

  return (
    <ExampleGroup
      title="Toggle Button"
      description="a button that toggles a value"
      classes="row wrap"
      config={[enabledSig, iconSig]}
      code={`
<ToggleButton
  icon={Icons.Leaf}
  label="foliage"
  value={true}
  onChange={...}
/>
        `}
    >
      <ToggleButton
        ariaLabel="a toggle button"
        icon={iconSig.signal.value ? Icons.Leaf : null}
        label="foliage"
        onChange={enabledSig.signal.value ? (v) => (selSig.value = v) : null}
        value={selSig.value}
      />
    </ExampleGroup>
  );
}

function _ChooseButtonGroup() {
  const [val, setVal] = useState("leaf");
  const enabledSig = useConfigSignal("enabled", true);
  const iconSig = useConfigSignal("icon", true);
  const columnSig = useConfigSignal("column", false);

  return (
    <ExampleGroup
      title="Choose Button"
      description="value selection button"
      classes="row wrap"
      config={[enabledSig, iconSig, columnSig]}
      code={`
<ChooseButton      
  items={[
    {value: "leaf", label: "leaf", icon: Icons.Leaf},
    {value: "pine", label: "pine"},
  ]}
  value={"leaf"}
  onChange={...}
  column={true}
/>`}
    >
      <ChooseButton
        column={columnSig.signal.value}
        items={[
          {
            icon: iconSig.signal.value ? Icons.Leaf : null,
            label: "leaf",
            value: "leaf",
          },
          {
            icon: iconSig.signal.value ? Icons.TreePine : null,
            label: "pine tree",
            value: "pine",
          },
          {
            icon: iconSig.signal.value ? Icons.TreePalm : null,
            label: "palm tree",
            value: "palm",
          },
        ]}
        onChange={enabledSig.signal.value ? (key) => setVal(key) : null}
        value={val}
      />
    </ExampleGroup>
  );
}

function _ProgressBarGroup() {
  const [loadVal, setLoadVal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadVal((v) => (v + 10) % 110);
    }, 1000);
    return () => clearInterval(interval);
  }, [loadVal]);

  return (
    <ExampleGroup
      title="Progress Bar"
      description="a component for showing active progress"
      classes="column cross-stretch gap-double"
      code={`<ProgressBar value={5} max={100} plain />`}
    >
      {[false, true].map((m) => (
        <ProgressBar
          value={(loadVal + (m ? 0 : 30)) % 110}
          max={100}
          plain={m}
        />
      ))}
    </ExampleGroup>
  );
}

function _SpinnerGroup() {
  return (
    <ExampleGroup
      title="Spinner"
      description="a component for showing active progress"
      classes="row wrap"
      code={`<Spinner.flat />`}
    >
      {["flat", "plain"].map((m) => (
        <Spinner manner={m as any} />
      ))}
    </ExampleGroup>
  );
}

function _SelectGroup() {
  return (
    <ExampleGroup
      title="Select"
      description="drop down menu for value selection"
      classes="row wrap"
      code={`
 <Select
  onChange={(v) => ...}
  options={[{ key: "leaf", label: "leaf" }]}
/>`}
    >
      <div />
      <Select
        ariaLabel="select"
        onChange={(v) => showToast(`selected ${v}`)}
        options={[
          { key: "leaf", label: "leaf" },
          { key: "pine", label: "pine tree" },
          { key: "palm", label: "palm tree" },
        ]}
      />
    </ExampleGroup>
  );
}

function _RangeGroup() {
  const [val, setVal] = useState(0);
  const enabledSig = useConfigSignal("enabled", true);

  return (
    <ExampleGroup
      title="Range Select"
      description="a slider for selecting a value"
      classes="column cross-stretch"
      config={[enabledSig]}
      code={`<Range value={val} onChange={(v) => ...} />`}
    >
      <Range
        ariaLabel="range"
        value={val}
        onChange={enabledSig.signal.value ? (v) => setVal(v) : null}
      />
      <div>current value: {val}</div>
    </ExampleGroup>
  );
}

function _CheckBoxGroup() {
  const [val, setVal] = useState(false);
  const enabledSig = useConfigSignal("enabled", true);
  const compactSig = useConfigSignal("compact", false);

  return (
    <ExampleGroup
      title="Checkbox"
      description="a toggle for a boolean value"
      classes="row wrap"
      config={[enabledSig, compactSig]}
      code={`<Checkbox value={val} label="agree" onChange={(v) => ...} />`}
    >
      <Checkbox
        ariaLabel="checkbox"
        value={val}
        compact={compactSig.signal.value}
        label="agree"
        onChange={enabledSig.signal.value ? (v) => setVal(!val) : null}
      />
    </ExampleGroup>
  );
}

function _SwitchGroup() {
  const [val, setVal] = useState(false);
  const enabledSig = useConfigSignal("enabled", true);

  const compactSig = useConfigSignal("compact", false);

  return (
    <ExampleGroup
      title="Switch"
      description="an alternative toggle for a boolean value"
      classes="row wrap"
      config={[enabledSig, compactSig]}
      code={`<Switch value={val} onChange={(v) => ...} />`}
    >
      <Switch
        ariaLabel="switch"
        value={val}
        compact={compactSig.signal.value}
        onChange={enabledSig.signal.value ? (v) => setVal(!val) : null}
      />
    </ExampleGroup>
  );
}

function _BannerGroup() {
  const minorSig = useConfigSignal("minor", false);
  const titleSig = useConfigSignal("title", false);
  const dismissSig = useConfigSignal("dismissable", true);

  return (
    <ExampleGroup
      title="Banner"
      description="a banner for important messages"
      classes="column cross-stretch"
      config={[minorSig, titleSig, dismissSig]}
      code={`<Banner kind="info">hello</Banner>`}
    >
      {["info", "warning", "error", "success"].map((v) => (
        <Banner
          kind={v as any}
          manner={minorSig.signal.value ? "minor" : "major"}
          onDismiss={
            dismissSig.signal.value
              ? () => {
                  showToast("you can act on dismiss");
                }
              : null
          }
          title={titleSig.signal.value ? `a ${v} banner` : undefined}
        >
          this is a {v} banner
        </Banner>
      ))}
    </ExampleGroup>
  );
}

function _HRGroup() {
  return (
    <ExampleGroup
      title="Rule"
      description="a horizontal rule"
      classes="column"
      code={`<hr />`}
    >
      <hr />
    </ExampleGroup>
  );
}

function _LinkGroup() {
  const plainSig = useConfigSignal("plain", false);
  const boldSig = useConfigSignal("bold", false);
  const noIconSig = useConfigSignal("no icon", false);
  return (
    <ExampleGroup
      title="Link"
      description="a convenience wrapper for 'a'"
      classes="column"
      config={[plainSig, boldSig, noIconSig]}
      code={`<hr />`}
    >
      <span>
        Hello,{" "}
        <Link
          bold={boldSig.signal.value}
          plain={plainSig.signal.value}
          noIcon={noIconSig.signal.value}
          href="https://robbb.in"
          label="this"
          external
        />{" "}
        is a link.
      </span>
    </ExampleGroup>
  );
}

function _BadgeGroup() {
  const showSig = useConfigSignal("show", true);

  return (
    <ExampleGroup
      title="Badge"
      description="a small indicator for a value"
      classes="row wrap"
      config={[showSig]}
      code={`<Badge.error label="2">hello</Badge.error>`}
    >
      <Badge.info hidden={!showSig.signal.value} label="">
        <IconButton.minor
          ariaLabel={null}
          icon={Icons.TreePalm}
          onTap={() => {}}
        />
      </Badge.info>
      <Badge.warning hidden={!showSig.signal.value} label="2">
        <Button.minor
          ariaLabel={null}
          label="hey"
          icon={Icons.TreeDeciduous}
          onTap={() => {}}
        />
      </Badge.warning>
      <Badge.error hidden={!showSig.signal.value} label="9+">
        <Button.plain ariaLabel={null} label="plants" onTap={() => {}} />
      </Badge.error>
      <Badge.success hidden={!showSig.signal.value} label="done">
        <IconButton.major ariaLabel={null} icon={Icons.Leaf} onTap={() => {}} />
      </Badge.success>
    </ExampleGroup>
  );
}

/*
function _TooltipGroup() {
  return (
    <ExampleGroup
      title="Tooltip"
      description="most elbe widgets have a tooltip property"
      classes="row wrap"
      code={`<Button.minor message="hey" tooltip="this is a tooltip" onTap={...} />`}
    >
      <Button.minor
        icon={Icons.Mouse}
        message="hover here"
        tooltip="this is a tooltip"
        onTap={() => {}}
      />

      <Field.date
        hint="birthday"
        value=""
        tooltip="what is your birthday?"
        onInput={(value) => console.log(value)}
      />

      <Text tooltip="happy" v="I'm very" />
    </ExampleGroup>
  );
}*/

function _ConfirmDialog() {
  return (
    <ExampleGroup
      title="Confirm Dialog"
      description="await a user confirmation"
      code={`
const v:boolean = await showConfirmDialog({ 
  title: "are you sure?", 
  message: "this is a message" })`}
    >
      <Button.minor
        ariaLabel="confirm dialog"
        label="show confirm dialog"
        onTap={async () => {
          const res = await showConfirmDialog({
            title: "are you sure?",
            message: "this is a message",
          });
          console.log("result", res);
        }}
      />
    </ExampleGroup>
  );
}

function _DialogGroup() {
  const openSig = useSignal(false);
  return (
    <ExampleGroup
      title="Dialog"
      description="show a custom dialog"
      code={`
<ElbeDialog title="custom dialog"
  open={...} onClose={() => ...}>
  ...
</ElbeDialog>`}
    >
      <Button.minor
        ariaLabel="dialog"
        label="show dialog"
        onTap={async () => (openSig.value = true)}
      />
      <ElbeDialog
        title="custom dialog"
        open={openSig.value}
        onClose={() => (openSig.value = false)}
      >
        <div class="column cross-center">
          <Icons.Leaf />
          <div>hello</div>
        </div>
      </ElbeDialog>
    </ExampleGroup>
  );
}

function _ToastGroup() {
  return (
    <ExampleGroup
      title="Toast"
      description="show a quick message at the bottom of the screen"
      code={`showToast("hello")`}
    >
      <Button.minor
        ariaLabel="toast"
        label="show toast"
        onTap={async () => showToast("this is a toast")}
      />
    </ExampleGroup>
  );
}

function _RowColGroup({ column = false }: { column?: boolean }) {
  const betweenSig = useConfigSignal("space between", false);
  const gapSig = useConfigSignal("gap", true);
  const wrapSig = useConfigSignal("wraps", false);

  const RowCol = column ? Column : Row;
  const name = column ? "Column" : "Row";

  return (
    <ExampleGroup
      title={name}
      description={`a ${column ? "vertical" : "horizontal"} layout`}
      code={`<${name} main="${
        betweenSig.signal.value ? "space-between" : "start"
      }" gap={${gapSig.signal.value ? 1 : 0}}>...</${name}>`}
      config={[gapSig, betweenSig, ...(column ? [] : [wrapSig])]}
    >
      <RowCol
        main={betweenSig.signal.value ? "space-between" : "start"}
        gap={gapSig.signal.value ? 1 : 0}
        class={wrapSig.signal.value ? "wrap" : ""}
        flex
        style={{
          //width: "100%",
          minHeight: column ? "21rem" : "auto",
        }}
      >
        {["one", "two", "three", "four", "five", "six"].map((v) => (
          <Box.secondary padding={0.5}>item {v}</Box.secondary>
        ))}
      </RowCol>
    </ExampleGroup>
  );
}
