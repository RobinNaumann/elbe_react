import { useSignal } from "@preact/signals";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  ChooseButton,
  cManners,
  ElbeDialog,
  Field,
  IconButton,
  Icons,
  Range,
  Select,
  showConfirmDialog,
  showToast,
  Spinner,
  ToggleButton,
} from "elbe-ui";
import { useState } from "preact/hooks";
import { ExampleGroup, ExampleSection, useConfigSignal } from "../util/section";

export function ComponentsSection() {
  return (
    <>
      {" "}
      <ExampleSection title="Components" anchor="components">
        <_BoxGroup />
        <_CardGroup />
        <_IconGroup />
        <_IconButtonGroup />
        <_ButtonGroup />
        <_ToggleButtonGroup />
        <_ChooseButtonGroup />
        <_SelectGroup />
        <_RangeGroup />
        <_BadgeGroup />
        <_SpinnerGroup />
        <_CheckBoxGroup />
        <_TextInputGroup />
      </ExampleSection>
      <ExampleSection title="Modals" anchor="modals">
        <_DialogGroup />
        <_ConfirmDialog />
        <_ToastGroup />
      </ExampleSection>
    </>
  );
}

function _TextInputGroup() {
  return (
    <ExampleGroup
      title="Text Input"
      description="use these to get text input from the user. Where possible, they use system dialogs."
      classes="row wrap"
      code={`
<Field.text
  hint="your name" 
  value=""
  onInput={(value) => console.log(value)} />
  
<Field.multiLine hint="message" value="" />`}
    >
      <Field.text
        hint="your name"
        value=""
        onInput={(value) => console.log(value)}
      />
      <Field.password
        hint="password"
        tooltip="heyoo"
        value=""
        onInput={(value) => console.log(value)}
      />
      <Field.date
        hint="birthday"
        value=""
        onInput={(value) => console.log(value)}
      />
      <Field.multiLine hint="message" value={""} />
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
  return (
    <ExampleGroup
      title="Card"
      description={"a container with border and padding"}
      classes="row wrap"
      code={`<Card scheme="primary">...</Card>`}
    >
      {["primary", "secondary", "inverse"].map((v) => (
        <Card scheme={v as any}>{v}</Card>
      ))}
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

  return (
    <ExampleGroup
      title="Range Select"
      description="a slider for selecting a value"
      classes="column cross-stretch"
      config={[enabledSig]}
      code={`<Checkbox value={val} label="agree" onChange={(v) => ...} />`}
    >
      <Checkbox
        value={val}
        label="agree"
        onChange={enabledSig.signal.value ? (v) => setVal(!val) : null}
      />
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
      <Badge.error hidden={!showSig.signal.value} label="">
        <IconButton.minor icon={Icons.TreePalm} onTap={() => {}} />
      </Badge.error>
      <Badge.success hidden={!showSig.signal.value} label="2">
        <Button.minor label="hey" icon={Icons.TreeDeciduous} onTap={() => {}} />
      </Badge.success>
      <Badge.warning hidden={!showSig.signal.value} label="9+">
        <Button.plain label="plants" onTap={() => {}} />
      </Badge.warning>
      <Badge.info hidden={!showSig.signal.value} label="info">
        <IconButton.major icon={Icons.Leaf} onTap={() => {}} />
      </Badge.info>
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
        label="show toast"
        onTap={async () => showToast("this is a toast")}
      />
    </ExampleGroup>
  );
}
