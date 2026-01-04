import {
  Button,
  Card,
  Column,
  ElbeApp,
  Footer,
  Header,
  IconButton,
  Icons,
  makeThemeContext,
  MenuRoute,
  Page,
  useToast,
  type ColorSelection,
} from "elbe-ui";
import { LogOut, SproutIcon, TreePalm, TreePine } from "lucide-react";
import { useApp } from "../../dist/ui/app/app_ctxt";
import { L10n, useL10n } from "../l10n";

const _themeContext = makeThemeContext({});

export function AppDemo(p: { goBack: () => void }) {
  return (
    <L10n>
      <ElbeApp
        themeContext={_themeContext}
        footer={
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
        }
        globalActions={[
          <Button.plain
            ariaLabel="back to demo"
            onTap={() => p.goBack()}
            label="back to demo"
            icon={LogOut}
          />,
        ]}
        icons={{
          endLogo: "./assets/elbe_dark.png",
          endLogoDark: "./assets/elbe_light.png",
        }}
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
      </ElbeApp>
    </L10n>
  );
}

function _Home() {
  const { showToast } = useToast();
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
        ].map((c, i) => (
          <Card
            key={i}
            scheme={c as ColorSelection.Schemes}
            bordered
            padding={3}
          />
        ))}
      </Column>
    </>
  );
}

function _SecondPage() {
  const { router } = useApp();
  return (
    <Page
      title="Second"
      leading={
        <IconButton.plain
          tooltip="go back to the first page"
          ariaLabel="back"
          onTap={() => router.go("/", 1)}
          icon={Icons.House}
        />
      }
    >
      hello
    </Page>
  );
}

function _SettingsPage() {
  const { showToast } = useToast();
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
