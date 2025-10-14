import {
  AppBase,
  Button,
  Card,
  Column,
  Footer,
  Header,
  IconButton,
  Icons,
  MenuRoute,
  Page,
  showToast,
  useAppBase,
  type ElbeColorSchemes,
} from "elbe-ui";
import {
  ChevronLeft,
  LogOut,
  SproutIcon,
  TreePalm,
  TreePine,
} from "lucide-react";
import { L10n, useL10n } from "../l10n";
export function AppDemo(p: { goBack: () => void }) {
  return (
    <L10n>
      <AppBase
        endLogo="./assets/elbe_dark.png"
        endLogoDark="./assets/elbe_light.png"
        globalActions={[
          <Button.plain
            ariaLabel="back to demo"
            onTap={() => p.goBack()}
            label="back to demo"
            icon={LogOut}
          />,
        ]}
      >
        <MenuRoute label="Home" icon={TreePine} path="/">
          <_Home />
        </MenuRoute>
        <MenuRoute label="Second" icon={SproutIcon} path="/second">
          <_SecondPage />
        </MenuRoute>
        <MenuRoute disabled label="Third" icon={TreePalm} path="/third">
          none
        </MenuRoute>
        <MenuRoute
          label="Settings"
          icon={Icons.Settings}
          bottom
          path="/settings"
        >
          <_SettingsPage />
        </MenuRoute>
      </AppBase>
    </L10n>
  );
}

function _Home() {
  const l10n = useL10n();
  return (
    <>
      <Header
        title={l10n.c.good_morning}
        actions={[
          <Button.major
            ariaLabel="a demo tree icon"
            onTap={() => l10n.setLocale("de_DE")}
            label="tree"
            icon={TreePine}
          />,
          <Button.plain
            ariaLabel="a demo sprout icon"
            onTap={() => showToast("sprout")}
            label="sprout"
            icon={SproutIcon}
          />,
        ]}
      />
      <Column
        style={{
          margin: " 1rem",
        }}
      >
        {[
          "secondary",
          "primary",
          "secondary",
          "primary",
          "secondary",
          "primary",
          "secondary",
          "primary",
          "secondary",
          "primary",
          "secondary",
        ].map((c) => (
          <Card
            scheme={c as ElbeColorSchemes}
            bordered
            className="centered"
            style={{
              height: "100px",
              backgroundColor: c,
            }}
          />
        ))}
      </Column>
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
    </>
  );
}

function _SecondPage() {
  const appBase = useAppBase();
  return (
    <Page
      title="Second"
      leading={
        <IconButton.plain
          ariaLabel="back"
          onTap={() => appBase.router.go("/", 1)}
          icon={ChevronLeft}
        />
      }
    >
      hello
    </Page>
  );
}

function _SettingsPage() {
  return (
    <>
      <Page
        title="Settings on this page"
        centerTitle
        actions={[
          <Button.major
            ariaLabel="a demo sprout icon"
            onTap={() => showToast("sprout")}
            label="sprout"
            icon={SproutIcon}
          />,
        ]}
      >
        hello
      </Page>
    </>
  );
}
