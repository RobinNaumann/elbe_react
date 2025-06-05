import { Button, Footer, Header, IconButton, Icons, wouter } from "elbe-ui";
import { ExampleGroup, ExampleSection } from "../util/section";

export function FoundationSection({}) {
  return (
    <ExampleSection title="Foundation" anchor="foundation">
      <_AppBaseGroup />
      <_HeaderGroup />
      <_FooterGroup />
    </ExampleSection>
  );
}

function _HeaderGroup({}) {
  return (
    <ExampleGroup
      title="Header"
      description="a layout component that provides a title and an optional back button and actions."
      classes="column"
      code={`<Header title="Title" leading="close" actions={[]}/>`}
    >
      <div
        class="rounded"
        style={{
          overflow: "hidden",
          border: "1px solid var(--c-context-border)",
          position: "relative",
        }}
      >
        <Header
          title="Title"
          leading="close"
          actions={[
            <IconButton.plain
              ariaLabel={null}
              icon={Icons.ShoppingBag}
              onTap={() => {}}
            />,
            <IconButton.plain
              ariaLabel={null}
              icon={Icons.LogOut}
              onTap={() => {}}
            />,
          ]}
        />
      </div>
    </ExampleGroup>
  );
}

function _FooterGroup({}) {
  return (
    <ExampleGroup
      title="Footer"
      description="show links and legal information"
      classes="column"
      code={`<Footer/>`}
    >
      <div
        class="rounded"
        style={{
          overflow: "hidden",
          border: "1px solid var(--c-context-border)",
          position: "relative",
        }}
      >
        <Footer
          left={[
            { label: "banana", href: "#" },
            { label: "apple", href: "#" },
          ]}
          right={[{ label: "orange", href: "#" }]}
          legal={{ label: "legal info", href: "#" }}
          copyright="© 2025 elbe"
          version="v1.2.3"
        />
      </div>
    </ExampleGroup>
  );
}

/*function _ScaffoldGroup({}) {
  return (
    <ExampleGroup
      title="Scaffold"
      description="Scaffold is a layout component that provides a header and a content area. It is used to create a consistent layout for pages."
      classes="column"
      code={`<Scaffold/>`}
    >
      <div
        class="rounded"
        style={{
          overflow: "hidden",
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
            <IconButton.plain
              ariaLabel={null}
              icon={Icons.ShoppingBag}
              onTap={() => {}}
            />,
            <IconButton.plain
              ariaLabel={null}
              icon={Icons.LogOut}
              onTap={() => {}}
            />,
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
}*/

function _AppBaseGroup({}) {
  const [loc, navigate] = wouter.useLocation();

  return (
    <ExampleGroup
      title="App Base"
      description="a base for more complex apps"
      classes="column"
      code={`<AppBase
        menu={[...]}
        />`}
    >
      <Button.minor
        ariaLabel="open demo"
        onTap={() => navigate("/app")}
        label="open demo"
      />
    </ExampleGroup>
  );
}
