import {
  Badge,
  Banner,
  Box,
  Button,
  Card,
  Checkbox,
  ChooseButton,
  Column,
  Dialog,
  Draggable,
  Field,
  FileInput,
  IconButton,
  Icons,
  Link,
  ProgressBar,
  Range,
  Row,
  SectionCard,
  Select,
  Spinner,
  Switch,
  Table,
  Text,
  ToggleButton,
  useDialogs,
  useToast,
  type ColorSelection,
} from "elbe-ui";

import { useEffect, useState } from "react";
import { ExampleGroup, ExampleSection, useConfigSignal } from "../util/section";
import { cManners } from "../util/util";

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
        <_DraggableGroup />
        <_CheckBoxGroup />
        <_SwitchGroup />
        <_TextInputGroup />
        <_FileInputGroup />
      </ExampleSection>
      <ExampleSection title="Modals" anchor="modals">
        <_DialogGroup />
        <_ConfirmDialog />
        <_ToastGroup />
        <_TooltipGroup />
      </ExampleSection>
      <ExampleSection title="Layout" anchor="layout">
        <_RowColGroup />
        <_RowColGroup column />
        <_SectionCardGroup />
        <_TableGroup />
      </ExampleSection>
    </>
  );
}

function _FileInputGroup() {
  const { showToast } = useToast();
  //const enabledSig = useConfigSignal("enabled", true);
  const onlyImagesSig = useConfigSignal("only images", true);

  return (
    <ExampleGroup
      title="File Input"
      description="a file input component"
      classes="column cross-stretch"
      config={[onlyImagesSig]}
      code={`<FileInput
  label="Select File"
  accept={[".png", ".jpg"]}
  onInput={({blob, filename}) => ...} />`}
    >
      <FileInput
        label="Select File"
        clearable
        accept={onlyImagesSig.signal.value ? [".png", ".jpg"] : []}
        onInput={({ filename }) =>
          showToast(`selected file: ${filename ?? "none"}`)
        }
      />
    </ExampleGroup>
  );
}

function _DraggableGroup() {
  const { showToast } = useToast();
  const enabledSig = useConfigSignal("enabled", true);
  const snapToGridSig = useConfigSignal("snap to grid", false);
  const [position, setPosition] = useState({ x: 1, y: 2 });

  return (
    <ExampleGroup
      title="Draggable"
      description="a draggable component wrapper"
      config={[enabledSig, snapToGridSig]}
      code={`<Draggable 
        disabled={false}
        gridSize={1}
        bounds={{ x: [1, 15], y: [1, 7] }}
        onMove={(p) => ...}
        > ... </Draggable>`}
    >
      <Card
        scheme="secondary"
        overflow="hidden"
        style={{
          position: "relative",
          width: "20rem",
          height: "10rem",
        }}
      >
        <Draggable
          position={position}
          gridSize={snapToGridSig.signal.value ? 2 : undefined}
          onMove={enabledSig.signal.value ? (p) => setPosition(p) : undefined}
          onMoveDone={() => showToast("drag completed")}
          bounds={{ x: [1, 15], y: [1, 7] }}
          disabled={!enabledSig.signal.value}
        >
          <b style={{ textWrap: "nowrap" }}>drag me!</b>
        </Draggable>
      </Card>
    </ExampleGroup>
  );
}

function _TextInputGroup() {
  const { showToast } = useToast();

  const flatSig = useConfigSignal("flat", false);
  const enabledSig = useConfigSignal("enabled", true);
  const msgSig = useConfigSignal("message", false);
  const hideLabelSig = useConfigSignal("hide label", false);
  const flexSig = useConfigSignal("flex", false);
  const [date, setDate] = useState(Date.now());
  const [val, setVal] = useState("");

  return (
    <ExampleGroup
      title="Text Input"
      description="use these to get text input from the user. Where possible, they use system dialogs."
      classes={!flexSig.signal.value ? "row wrap cross-start" : "column"}
      config={[flatSig, enabledSig, msgSig, hideLabelSig, flexSig]}
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
        value={val}
        flex={flexSig.signal.value}
        leading={Icons.User}
        trailing={Icons.Leaf}
        manner={flatSig.signal.value ? "flat" : "plain"}
        onTrailingTap={() => showToast("trailing icon click")}
        onInput={enabledSig.signal.value ? setVal : undefined}
        infoMessage={msgSig.signal.value ? "this is an info" : undefined}
      />
      <Field.password
        ariaLabel="enter a password"
        label="password"
        hideLabel={hideLabelSig.signal.value}
        flex={flexSig.signal.value}
        hint="your password"
        tooltip="heyoo"
        value={val}
        manner={flatSig.signal.value ? "flat" : "plain"}
        onInput={enabledSig.signal.value ? setVal : undefined}
        warningMessage={msgSig.signal.value ? "this is a warning" : undefined}
      />
      <Field.date
        ariaLabel="birthday"
        hideLabel={hideLabelSig.signal.value}
        label="birthday"
        value={date}
        flex={flexSig.signal.value}
        manner={flatSig.signal.value ? "flat" : "plain"}
        onInput={enabledSig.signal.value ? setDate : undefined}
        errorMessage={msgSig.signal.value ? "this is an error" : undefined}
      />
      <Field.multiLine
        ariaLabel="enter a message"
        label="message"
        hideLabel={hideLabelSig.signal.value}
        hint="message"
        value={val}
        flex={flexSig.signal.value}
        manner={flatSig.signal.value ? "flat" : "plain"}
        successMessage={msgSig.signal.value ? "this is a success" : undefined}
        onInput={enabledSig.signal.value ? setVal : undefined}
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
      {["primary", "secondary", "inverse"].map((v, i) => (
        <Box key={i} scheme={v as ColorSelection.Schemes} padding={0.5}>
          {v}
        </Box>
      ))}
    </ExampleGroup>
  );
}

function _CardGroup() {
  const borderedSig = useConfigSignal("bordered", true);
  const elevatedSig = useConfigSignal("elevated", false);

  return (
    <ExampleGroup
      title="Card"
      description={"a container with border and padding"}
      classes="row wrap"
      code={`<Card scheme="primary">...</Card>`}
      config={[borderedSig, elevatedSig]}
    >
      {["primary", "secondary", "inverse"].map((v, i) => (
        <Card
          key={i}
          scheme={v as ColorSelection.Schemes}
          bordered={borderedSig.signal.value}
          elevated={elevatedSig.signal.value}
        >
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
  const { showToast } = useToast();
  const enabledSig = useConfigSignal("enabled", true);

  return (
    <ExampleGroup
      title="Icon Button"
      description="a button with one icon child"
      classes="row wrap"
      config={[enabledSig]}
      code={`<IconButton.minor icon={Icons.leaf} onTap={...} />`}
    >
      {cManners.map((v, i) => (
        <IconButton
          key={i}
          ariaLabel="icon button"
          manner={v as ColorSelection.Manners}
          icon={Icons.Leaf}
          onTap={
            enabledSig.signal.value
              ? () => showToast("button was tapped")
              : undefined
          }
        />
      ))}
    </ExampleGroup>
  );
}

function _ButtonGroup() {
  const { showToast } = useToast();
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
      {cManners.map((v, i) => (
        <Button
          key={i}
          ariaLabel="a button"
          manner={v as ColorSelection.Manners}
          icon={iconSig.signal.value && Icons.Leaf}
          label={v}
          onTap={
            enabledSig.signal.value
              ? () => showToast("button was tapped")
              : undefined
          }
        />
      ))}
    </ExampleGroup>
  );
}

function _ToggleButtonGroup() {
  const iconSig = useConfigSignal("icon", true);
  const enabledSig = useConfigSignal("enabled", true);
  const [sel, setSel] = useState(false);

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
        onChange={enabledSig.signal.value ? (v) => setSel(v) : undefined}
        value={sel}
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
        onChange={enabledSig.signal.value ? (key) => setVal(key) : undefined}
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
      {["flat", "plain"].map((m, i) => (
        <ProgressBar
          key={i}
          value={(loadVal + (m === "flat" ? 0 : 30)) % 110}
          max={100}
          manner={m as "flat" | "plain"}
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
      {["flat", "plain"].map((m, i) => (
        <Spinner key={i} manner={m as "plain" | "flat" | undefined} />
      ))}
    </ExampleGroup>
  );
}

function _SelectGroup() {
  const flatSig = useConfigSignal("flat", false);
  const enabledSig = useConfigSignal("enabled", true);
  const hideLabelSig = useConfigSignal("hide label", false);
  const flexSig = useConfigSignal("flex", false);
  const [val, setVal] = useState("leaf");
  return (
    <ExampleGroup
      title="Select"
      description="drop down menu for value selection"
      config={[flatSig, enabledSig, hideLabelSig, flexSig]}
      classes="row wrap"
      code={`
 <Select
  onChange={(v) => ...}
  options={[{ key: "leaf", label: "leaf" }]}
/>`}
    >
      <Select
        label="Hello"
        ariaLabel="select"
        value={val}
        onChange={enabledSig.signal.value ? (v) => setVal(v) : undefined}
        hideLabel={hideLabelSig.signal.value}
        flex={flexSig.signal.value}
        manner={flatSig.signal.value ? "flat" : "plain"}
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
  const flatSig = useConfigSignal("flat", true);
  const enabledSig = useConfigSignal("enabled", true);
  const compactSig = useConfigSignal("compact", false);

  return (
    <ExampleGroup
      title="Checkbox"
      description="a toggle for a boolean value"
      classes="row wrap"
      config={[flatSig, enabledSig, compactSig]}
      code={`<Checkbox value={val} label="agree" onChange={(v) => ...} />`}
    >
      <Checkbox
        ariaLabel="checkbox"
        manner={flatSig.signal.value ? "flat" : "plain"}
        value={val}
        compact={compactSig.signal.value}
        label="agree"
        onChange={enabledSig.signal.value ? () => setVal(!val) : null}
      />
    </ExampleGroup>
  );
}

function _SwitchGroup() {
  const [val, setVal] = useState(false);
  const flatSig = useConfigSignal("flat", true);
  const enabledSig = useConfigSignal("enabled", true);
  const compactSig = useConfigSignal("compact", false);

  return (
    <ExampleGroup
      title="Switch"
      description="an alternative toggle for a boolean value"
      classes="row wrap"
      config={[flatSig, enabledSig, compactSig]}
      code={`<Switch value={val} onChange={(v) => ...} />`}
    >
      <Switch
        ariaLabel="switch"
        manner={flatSig.signal.value ? "flat" : "plain"}
        value={val}
        compact={compactSig.signal.value}
        onChange={enabledSig.signal.value ? () => setVal(!val) : null}
      />
    </ExampleGroup>
  );
}

function _BannerGroup() {
  const { showToast } = useToast();
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
      {["info", "warning", "error", "success"].map((v, i) => (
        <Banner
          key={i}
          kind={v as ColorSelection.KindsAlert}
          manner={minorSig.signal.value ? "minor" : "major"}
          onDismiss={
            dismissSig.signal.value
              ? () => {
                  showToast("you can act on dismiss", {
                    kind: v as ColorSelection.KindsAlert,
                  });
                }
              : undefined
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
  const mannerSig = useConfigSignal("flat", true);
  const enabledSig = useConfigSignal("enabled", true);
  const boldSig = useConfigSignal("bold", false);
  const underlineSig = useConfigSignal("underline", false);
  const externalSig = useConfigSignal("external", true);
  return (
    <ExampleGroup
      title="Link"
      description="a convenience wrapper for 'a'"
      classes="column"
      config={[mannerSig, enabledSig, boldSig, underlineSig, externalSig]}
      code={`<Link href="https://robbb.in" label="this" external />`}
    >
      <span>
        Hello,{" "}
        <Link
          underline={underlineSig.signal.value}
          manner={mannerSig.signal.value ? "flat" : "plain"}
          bold={boldSig.signal.value}
          href={enabledSig.signal.value ? "https://robbb.in" : undefined}
          label="this"
          external={externalSig.signal.value}
        />{" "}
        is a link. This{" "}
        <Link
          underline={underlineSig.signal.value}
          manner={mannerSig.signal.value ? "major" : "minor"}
          bold={boldSig.signal.value}
          href={enabledSig.signal.value ? "https://robbb.in" : undefined}
          label="link"
          external={externalSig.signal.value}
        />{" "}
        is very pronounced.
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
  const { showConfirmDialog, showAlertDialog } = useDialogs();
  const { showToast } = useToast();

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
            kind: "error",
            title: "are you sure?",
            message: "this is a message",
          });
          showToast(`you selected: ${res}`);
        }}
      />
      <Button.minor
        ariaLabel="alert dialog"
        label="show alert dialog"
        onTap={async () => {
          await showAlertDialog({
            kind: "info",
            title: "info",
            message: "this is a message",
          });
          showToast(`dialog closed`);
        }}
      />
    </ExampleGroup>
  );
}

function _TableGroup() {
  const stickyHeaderSig = useConfigSignal("sticky header", true);
  const fixedHeightSig = useConfigSignal("fixed height", true);

  return (
    <ExampleGroup
      title="Table"
      description="a table component for displaying tabular data"
      config={[stickyHeaderSig, fixedHeightSig]}
      code={`
<Table columns={[{ key: "name", label: "Name" }]} data={[{ name: "Robin" }]} />`}
    >
      <Table
        height={fixedHeightSig.signal.value ? 10 : undefined}
        stickyHeader={stickyHeaderSig.signal.value}
        columns={[
          { key: "name", label: "Name" },
          { key: "age", label: "Age" },
        ]}
        entries={[
          { name: "Robin", age: 99 },
          { name: "Alice", age: 25 },
          { name: "Bob", age: 28 },
          { name: "Charlie", age: 32 },
          { name: "Diana", age: 45 },
          { name: "Eve", age: 29 },
          { name: "Frank", age: 33 },
          { name: "Grace", age: 27 },
        ]}
      />
    </ExampleGroup>
  );
}

function _DialogGroup() {
  const [open, setOpen] = useState(false);
  return (
    <ExampleGroup
      title="Dialog"
      description="show a custom dialog"
      code={`
<Dialog title="custom dialog"
  open={...} onClose={() => ...}>
  ...
</Dialog>`}
    >
      <Button.minor
        ariaLabel="dialog"
        label="show dialog"
        onTap={async () => setOpen(true)}
      />
      <Dialog title="custom dialog" open={open} onClose={() => setOpen(false)}>
        <div className="column cross-center">
          <Icons.Leaf />
          <div>hello</div>
        </div>
      </Dialog>
    </ExampleGroup>
  );
}

function _ToastGroup() {
  const { showToast } = useToast();

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
      <Button.minor
        ariaLabel="fancy toast"
        label="show fancy toast"
        onTap={async () =>
          showToast("this is a fancy toast for 10 seconds", {
            kind: "success",
            icon: Icons.Leaf,
            dismissible: true,
            duration: 10000,
          })
        }
      />
    </ExampleGroup>
  );
}

function _TooltipGroup() {
  return (
    <ExampleGroup
      title="Tooltip"
      description="most widgets come with a tooltip property. Use it to show a message on hover."
      code={`<Card tooltip="this is a tooltip">...</Card>`}
    >
      <Card scheme="secondary" tooltip="this is a tooltip">
        hover here
      </Card>
    </ExampleGroup>
  );
}

function _SectionCardGroup() {
  const borderedSig = useConfigSignal("bordered", true);
  const collabsableSig = useConfigSignal("collapsable", false);

  return (
    <ExampleGroup
      title="Section Card"
      description="a card with header for sectioning content. They can also provide Markdown hints."
      config={[borderedSig, collabsableSig]}
      code={`
<SectionCard title="section title" hint="you can also use **Markdown** here"
  bordered={true} collapsable={false}>
  ...
</SectionCard>`}
    >
      <Column style={{ width: "100%" }}>
        <SectionCard
          bordered={borderedSig.signal.value}
          collapsed={collabsableSig.signal.value ? false : undefined}
          title="An Example Section"
          hint={"you can also use **Markdown** here"}
        >
          <Icons.Leaf />
          <div>section content</div>
        </SectionCard>
      </Column>
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
        className={wrapSig.signal.value ? "wrap" : ""}
        flex
        style={{
          //width: "100%",
          minHeight: column ? "21rem" : "auto",
        }}
      >
        {["one", "two", "three", "four", "five", "six"].map((v, i) => (
          <Box.secondary key={i} padding={0.5}>
            item {v}
          </Box.secondary>
        ))}
      </RowCol>
    </ExampleGroup>
  );
}
