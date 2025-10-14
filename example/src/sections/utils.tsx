import { Button, Column, Icons, Row, Text, ToDo, ToggleButton } from "elbe-ui";
import { Languages } from "lucide-react";
import { L10n, useL10n } from "../../l10n";
import { ExampleGroup, ExampleSection } from "../util/section";

export function UtilSection() {
  return (
    <ExampleSection title="Utilities" anchor="utilities">
      <_RouterGroup />
      <_L10nGroup />
      <_ToDoGroup />
      <_PlaceholderGroup />
    </ExampleSection>
  );
}

function _RouterGroup() {
  return (
    <ExampleGroup
      title="Routing"
      description="the package bundles the wouter library for routing. It is available under the Wouter prefix."
      code={`// check the docs of wouter for more details\n
Wouter                   // use any of the wouter exports
wouter_hash              // use the hash based location
Route, MenuRoute         // helper exports for defining a route
useAppBase().go("/path") // navigate within an AppBase component`}
    >
      <Button.minor
        ariaLabel="open wouter docs"
        label="open docs"
        icon={Icons.ExternalLink}
        onTap={() =>
          window.open("https://github.com/molefrog/wouter", "_blank")
        }
      />
    </ExampleGroup>
  );
}

function _L10nGroup() {
  return (
    <ExampleGroup
      title="L10n"
      description="a simple text localization system with first class support for easy language."
      code={`
const en_IE = {
  good_morning: "good morning",
  welcome: "welcome",
};

const de_DE_easy = {
  good_morning: "Hallo",
};

export const { L10n, useL10n } = makeL10n({ en_IE }, {de_DE_easy});

// then: 1. wrap your app in the L10n component
//       2. use l10n = useL10n() to get the current values 
//       3. use l10n.c.good_morning to get the localized string

        `}
    >
      <L10n>
        <_l10nDemo />
      </L10n>
    </ExampleGroup>
  );
}

function _l10nDemo() {
  const l10n = useL10n();

  return (
    <Column>
      <Row>
        <Button.minor
          ariaLabel="switch language"
          onTap={() =>
            l10n.setLocale(l10n.locale.startsWith("en") ? "de" : "en")
          }
          label="switch language"
          icon={Languages}
        />
        <ToggleButton
          ariaLabel="easy language"
          onChange={(v) => l10n.setEasyLang(v)}
          label="easy language"
          value={l10n.easy}
        />
      </Row>
      <Text v={l10n.c.good_morning} bold />
    </Column>
  );
}

function _ToDoGroup() {
  return (
    <ExampleGroup
      title="ToDo"
      description="display a message to remind you to do something"
      code={`<ToDo.Block msg="demo" />\n<ToDo.Inline msg="demo" />`}
    >
      <ToDo.Block msg="an example sized block todo" height={4} width={8} />
      <span>
        Todos can also <ToDo.Inline msg="be" /> inline{" "}
      </span>
    </ExampleGroup>
  );
}

function _PlaceholderGroup() {
  return (
    <ExampleGroup
      title="Placeholder"
      description="highlight missing content or a work in progress."
      code={`<ToDo.Placeholder width={10} />`}
    >
      <ToDo.Placeholder width={13} height={10} />
    </ExampleGroup>
  );
}
