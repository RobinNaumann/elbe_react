import { ToDo } from "elbe-ui";
import { ExampleGroup, ExampleSection } from "../util/section";

export function UtilSection({}) {
  return (
    <ExampleSection title="Utilities" anchor="utilities">
      <_ToDoGroup />
      <_PlaceholderGroup />
    </ExampleSection>
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
