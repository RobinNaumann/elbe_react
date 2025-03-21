import { Box, Button, Column, Icons, scrollToId, Text } from "elbe-ui";
import { ColorsSection, TypographySection } from "./sections/colors";
import { ComponentsSection } from "./sections/component";
import { FoundationSection } from "./sections/foundation";
import { UtilSection } from "./sections/utils";
import { ThemeEdit } from "./theme_edit";
import { ExampleSection } from "./util/section";

export function Home() {
  return (
    <div class="primary">
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
      <div class="base-limited" style="border: none">
        <Box mode="light" scheme="primary" padding={1}>
          <Column gap={6}>
            <div />
            <_InstallSection />
            <_OverviewSection />
            <ThemeEdit />
            <ComponentsSection />
            <FoundationSection />
            <ColorsSection />
            <TypographySection />
            <UtilSection />
            <div style="height: 10rem" />
          </Column>
        </Box>
      </div>
    </div>
  );
}

function _InstallSection({}) {
  return (
    <ExampleSection title="install" anchor="install">
      <Column>
        <div>you can install elbe in React/Preact using the npm package</div>
        <div
          class="card secondary code"
          style="padding: .75rem; margin-bottom: .5rem"
        >
          npm i <b>elbe-ui</b>
        </div>
        <div>import the CSS</div>
        <div
          class="card secondary code"
          style="padding: .75rem; margin-bottom: .5rem"
        >
          import "elbe-ui/dist/elbe.css";
        </div>
        <div>
          add the <b>elbe</b> class to your app's base in the index.html
        </div>
        <div
          class="card secondary code"
          style="padding: .75rem;margin-bottom: .5rem"
        >
          {'<div id="app" '}
          <b>class="elbe"</b>
          {"></div>"}
        </div>
        <div>
          wrap your App into <b>ElbeTheme</b>
        </div>
        <div
          class="card secondary code"
          style="padding: .75rem;margin-bottom: .5rem"
        >
          {"<ElbeTheme> ... </ElbeTheme>"}
        </div>
      </Column>
    </ExampleSection>
  );
}

function _OverviewSection({}) {
  return (
    <div class="column cross-stretch">
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
    </div>
  );
}

function _HeroSection({}) {
  return (
    <Box mode="light" scheme="secondary" padding={1}>
      <div class="column cross-center main-center" style="height: 15rem;">
        <Text.h1 v="elbe" />
        <div>a cross-platform UI framework for React & Flutter</div>
        <Button.minor
          ariaLabel="go to the Flutter Demo"
          label="Flutter Demo"
          icon={Icons.ExternalLink}
          onTap={() => window.open("https://robbb.in/elbe_flutter", "_blank")}
        />
      </div>
    </Box>
  );
}
