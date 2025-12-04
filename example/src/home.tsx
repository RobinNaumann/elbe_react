import {
  _WrittenIn,
  Box,
  Button,
  Card,
  Column,
  Footer,
  Icons,
  scrollToId,
  Text,
} from "elbe-ui";
import { AccessibilityEdit } from "./accessibility_edit";
import { ColorsSection, TypographySection } from "./sections/colors";
import { ComponentsSection } from "./sections/component";
import { FoundationSection } from "./sections/foundation";
import { UtilSection } from "./sections/utils";
import { ThemeEdit } from "./theme_edit";
import { ExampleSection } from "./util/section";

export function Home() {
  return (
    <Column>
      {/*<Header
        title="hello"
        actions={
          <>
            <IconButton icon={Icons.Github} onTap={() => {}} />
            <IconButton icon={Icons.Github} onTap={() => {}} />
            <IconButton icon={Icons.Github} onTap={() => {}} />
          </>
        }
      ></Header>*/}

      <_HeroSection />
      <div className="base-limited" style={{ border: "none" }}>
        <Box mode="light" scheme="primary" padding={1}>
          <Column gap={6}>
            <_InstallSection />
            <hr />
            <ThemeEdit />
            <AccessibilityEdit />
            <_OverviewSection />
            <ComponentsSection />
            <FoundationSection />
            <ColorsSection />
            <TypographySection />
            <UtilSection />
            <div style={{ height: "10rem" }} />
          </Column>
        </Box>
      </div>
      <Footer
        right={[
          <_WrittenIn key={"footer-written-in"} href="https://robbb.in" />,
        ]}
        legal={{
          label: "imprint/impressum",
          href: "https://robbb.in/impressum.html",
        }}
        left={[
          {
            label: "source code",
            href: "https://github.com/RobinNaumann/elbe_react",
          },
        ]}
        version="elbe v0.3.1"
      />
    </Column>
  );
}

function _InstallSection() {
  return (
    <ExampleSection title="install" anchor="install">
      <Column>
        <div>you can install elbe in React/Preact using the npm package</div>
        <div
          className="card secondary code"
          style={{ padding: ".75rem", marginBottom: ".5rem" }}
        >
          npm i <b>elbe-ui</b>
        </div>
        <div>
          wrap your App into <b>ElbeTheme</b>
        </div>
        <div
          className="card secondary code"
          style={{ padding: ".75rem", marginBottom: ".5rem" }}
        >
          {"<ElbeTheme> ... </ElbeTheme>"}
        </div>
      </Column>
    </ExampleSection>
  );
}

function _OverviewSection() {
  return (
    <Column>
      <Button.flat
        ariaLabel="view components"
        icon={Icons.Boxes}
        label="components"
        onTap={() => scrollToId("components")}
      />
      <Button.flat
        ariaLabel="view colors"
        icon={Icons.SwatchBook}
        label="colors"
        onTap={() => scrollToId("color")}
      />
      <Button.flat
        ariaLabel="view typography"
        icon={Icons.Type}
        label="typography"
        onTap={() => scrollToId("typography")}
      />
      <Button.flat
        ariaLabel="view modals"
        icon={Icons.Layers2}
        label="modals"
        onTap={() => scrollToId("modals")}
      />
      <Button.flat
        ariaLabel="view layout"
        icon={Icons.LayoutTemplate}
        label="layout"
        onTap={() => scrollToId("layout")}
      />
      <Button.flat
        ariaLabel="view foundation"
        icon={Icons.AppWindowMac}
        label="foundation"
        onTap={() => scrollToId("foundation")}
      />
      <Button.flat
        ariaLabel="view utilities"
        icon={Icons.Hammer}
        label="utilities"
        onTap={() => scrollToId("utilities")}
      />
    </Column>
  );
}

function _HeroSection() {
  return (
    <Card mode="light" scheme="secondary" padding={1} sharp>
      <Column cross="center" main="center" style={{ height: "15rem" }}>
        <Text.h1 v="elbe" />
        <div style={{ textAlign: "center" }}>
          an <b>accessibility first</b> cross-platform
          <br />
          UI framework for React & Flutter
        </div>
        <Button.minor
          ariaLabel="go to the Flutter Demo"
          label="Flutter Demo"
          icon={Icons.ExternalLink}
          onTap={() => window.open("https://robbb.in/elbe_flutter", "_blank")}
        />
      </Column>
    </Card>
  );
}
