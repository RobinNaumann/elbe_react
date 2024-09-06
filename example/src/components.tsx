import { useSignal } from "@preact/signals";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Column,
  ElbeDialog,
  Field,
  IconButton,
  Icons,
  Range,
  Select,
  showConfirmDialog,
  showToast,
  Text,
  ToggleButton,
} from "elbe-ui";
import { useState } from "preact/hooks";
import { ExampleGroup, ExampleSection, useConfigSignal } from "./util/util";

export function Home() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("heart");

  return (
    <div class="primary">
      <_HeroSection />
      <div class="base-limited">
        <Box mode="light" scheme="primary" padding={1}>
          <Column stretch gap={6}>
            <_InstallSection />
            <ExampleSection title="Components">
              <_BoxGroup />
              <_CardGroup />
              <_IconGroup />
              <_IconButtonGroup />
              <_ButtonGroup />
              <_TextInputGroup />
              <_ToggleButtonGroup />
              <_SelectGroup />
              <_RangeGroup />
              <_CheckBoxGroup />
              <_BadgeGroup />
              <_TooltipGroup />
            </ExampleSection>
            <ExampleSection title="Dialogs">
              <_ConfirmDialog />
              <_DialogGroup />
              <_ToastGroup />
            </ExampleSection>

            <div style="height: 10rem" />
          </Column>
        </Box>
      </div>
    </div>
  );
}

function _InstallSection({}) {
  return (
    <ExampleSection title="install">
      <div class="column cross-stretch gap-half">
        <div>
          you can install elbe in React using the npm package{" "}
          <Text.code v="elbe-ui" />
        </div>
        <div>
          then, in your main .scss/.sass file, import the styles with your
          definitions:
        </div>
        <Card colorScheme="secondary" class="code">
          <span>@use "elbe-ui/elbe.scss" with (</span>
          <br />
          <span> $c-accent: #5e1e9a,</span>
          <br />
          <span style="opacity: .5"> //$g-radius: 0,</span>
          <br />
          <span style="opacity: .5"> //$t-font-body: "Comic Sans MS",</span>
          <br />
          <span style="opacity: .5"> //...</span>
          <br />
          <span>);</span>
        </Card>
        <div> you can now use elbe components in your React app! 🎉</div>
      </div>
    </ExampleSection>
  );
}

function _HeroSection({}) {
  return (
    <Box mode="light" scheme="secondary" padding={1}>
      <div class="column cross-center main-center" style="height: 15rem;">
        <Text.h1 v="elbe" />
        <div>a cross-platform UI framework for React & Flutter</div>
      </div>
    </Box>
  );
}

function _TextInputGroup() {
  return (
    <ExampleGroup
      title="Text Input"
      description="this is some input for text"
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
      code={`
<Box scheme="primary">...</Box>`}
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
      code={`
<Box colorScheme="primary">...</Box>`}
    >
      {["primary", "secondary", "inverse"].map((v) => (
        <Card colorScheme={v as any}>{v}</Card>
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
      code={`
<Icons.Leaf />`}
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
      code={`
<IconButton.action icon={Icons.leaf} onTap={...} />`}
    >
      {["major", "minor", "action", "integrated"].map((v) => (
        <IconButton
          colorManner={v as any}
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
      code={`<Button.action icon={Icons.leaf} message="hey" onTap={...} />`}
    >
      {["major", "minor", "action", "integrated"].map((v) => (
        <Button
          colorManner={v as any}
          icon={iconSig.signal.value && Icons.Leaf}
          message={v}
          onTap={
            enabledSig.signal.value && (() => showToast("button was tapped"))
          }
        />
      ))}
    </ExampleGroup>
  );
}

function _ToggleButtonGroup() {
  const [val, setVal] = useState("leaf");
  const enabledSig = useConfigSignal("enabled", true);
  const iconSig = useConfigSignal("icon", true);

  return (
    <ExampleGroup
      title="Toggle Button"
      description="value selection button"
      classes="row wrap"
      config={[enabledSig, iconSig]}
      code={`
<ToggleButton
  onSelect={enabledSig.signal.value ? (key) => setVal(key) : null}
  value={val}
  items={[
    {
      icon: iconSig.signal.value ? Icons.Leaf : null,
      label: "leaf",
      key: "leaf",
    },
    {
      icon: iconSig.signal.value ? Icons.TreePine : null,
      label: "pine tree",
      key: "pine",}]}/>`}
    >
      <ToggleButton
        items={[
          {
            icon: iconSig.signal.value ? Icons.Leaf : null,
            label: "leaf",
            key: "leaf",
          },
          {
            icon: iconSig.signal.value ? Icons.TreePine : null,
            label: "pine tree",
            key: "pine",
          },
          {
            icon: iconSig.signal.value ? Icons.TreePalm : null,
            label: "palm tree",
            key: "palm",
          },
        ]}
        onSelect={enabledSig.signal.value ? (key) => setVal(key) : null}
        value={val}
      />
    </ExampleGroup>
  );
}

function _SelectGroup() {
  return (
    <ExampleGroup
      title="Toggle Button"
      description="drop down menu for value selection"
      classes="row wrap"
      code={`
 <Select
  onChange={() => {}}
  options={[{ key: "leaf", label: "leaf" }]}/>`}
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
      code={`<Badge.error message="2">hello</Badge.error>`}
    >
      <Badge hidden={!showSig.signal.value} colorStyle="error" message="">
        <IconButton.minor icon={Icons.TreePalm} onTap={() => {}} />
      </Badge>
      <Badge hidden={!showSig.signal.value} colorStyle="success" message="2">
        <Button.minor
          message="hey"
          icon={Icons.TreeDeciduous}
          onTap={() => {}}
        />
      </Badge>
      <Badge hidden={!showSig.signal.value} colorStyle="warning" message="9+">
        <Button.action message="plants" onTap={() => {}} />
      </Badge>
      <Badge hidden={!showSig.signal.value} colorStyle="info" message="info">
        <IconButton.major icon={Icons.Leaf} onTap={() => {}} />
      </Badge>
    </ExampleGroup>
  );
}

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
}

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
        message="show confirm dialog"
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
      title="Confirm Dialog"
      description="show a custom dialog"
      code={`
<ElbeDialog title="custom dialog"
  open={...} onClose={() => ...}>
  ...
</ElbeDialog>`}
    >
      <Button.minor
        message="open custom dialog"
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
        message="open custom dialog"
        onTap={async () => showToast("this is a toast")}
      />
    </ExampleGroup>
  );
}
