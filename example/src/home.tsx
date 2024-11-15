import { Box, Button, Column, Icons, scrollToId, Text } from "elbe-ui";
import { ColorsSection, TypographySection } from "./sections/colors";
import { ComponentsSection } from "./sections/component";
import { FoundationSection } from "./sections/foundation";
import { ThemeEdit } from "./theme_edit";
import { ExampleSection } from "./util/section";

export function Home() {
  return (
    <div class="primary">
      <_HeroSection />
      <div class="base-limited" style="border: none">
        <Box mode="light" scheme="primary" padding={1}>
          <Column stretch gap={6}>
            <div />
            <_InstallSection />
            <_OverviewSection />
            <ThemeEdit />
            <ComponentsSection />
            <FoundationSection />
            <ColorsSection />
            <TypographySection />
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
      <div class="column cross-stretch">
        <div>you can install elbe in React/Preact using the npm package</div>
        <div class="card secondary code" style="padding: .75rem">
          npm i <b>elbe-ui</b>
        </div>
        <div>and import the CSS:</div>
        <div class="card secondary code" style="padding: .75rem">
          import "elbe-ui/dist/elbe.css";
        </div>
      </div>
    </ExampleSection>
  );
}

function _OverviewSection({}) {
  return (
    <div class="column cross-stretch">
      <Button.flat
        icon={Icons.Boxes}
        label="components"
        onTap={() => scrollToId("components")}
      />
      <Button.flat
        icon={Icons.SwatchBook}
        label="colors"
        onTap={() => scrollToId("color")}
      />
      <Button.flat
        icon={Icons.Type}
        label="typography"
        onTap={() => scrollToId("typography")}
      />
      <Button.flat
        icon={Icons.Layers2}
        label="modals"
        onTap={() => scrollToId("modals")}
      />
      <Button.flat
        icon={Icons.LayoutTemplate}
        label="layout"
        onTap={() => scrollToId("layout")}
      />
      <Button.flat
        icon={Icons.AppWindowMac}
        label="foundation"
        onTap={() => scrollToId("foundation")}
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
          label="Flutter Demo"
          icon={Icons.ExternalLink}
          onTap={() => window.open("https://robbb.in/elbe_flutter", "_blank")}
        />
      </div>
    </Box>
  );
}
