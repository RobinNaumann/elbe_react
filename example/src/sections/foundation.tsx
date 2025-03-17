import { IconButton, Icons, Scaffold } from "elbe-ui";
import { ExampleGroup, ExampleSection } from "../util/section";

export function FoundationSection({}) {
  return (
    <ExampleSection title="Foundation" anchor="foundation">
      <_ScaffoldGroup />
    </ExampleSection>
  );
}

function _ScaffoldGroup({}) {
  return (
    <ExampleGroup
      title="Scaffold"
      description="Scaffold is a layout component that provides a header and a content area. It is used to create a consistent layout for pages."
      classes="column"
      code={`TODO`}
    >
      <div
        class="rounded"
        style={{
          border: "1px solid var(--c-context-border)",
          position: "relative",
        }}
      >
        <Scaffold
          title="Title"
          back="close"
          scheme="primary"
          height={20}
          padded={false}
          actions={[
            <IconButton.plain icon={Icons.ShoppingBag} onTap={() => {}} />,
            <IconButton.plain icon={Icons.LogOut} onTap={() => {}} />,
          ]}
        >
          <img src="./assets/example_hamburg.jpg" />
          <div class="padded" style="margin-bottom: 2rem">
            other content
          </div>
        </Scaffold>
      </div>
    </ExampleGroup>
  );
}
