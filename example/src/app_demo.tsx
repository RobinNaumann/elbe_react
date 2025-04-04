import {
  AppBase,
  Button,
  Card,
  Column,
  Footer,
  Header,
  IconButton,
  showToast,
} from "elbe-ui";
import {
  ChevronLeft,
  CogIcon,
  HomeIcon,
  LeafIcon,
  LogOut,
  SproutIcon,
  TreePine,
} from "lucide-react";
import { route } from "preact-router";

export function AppDemo() {
  return (
    <AppBase
      endLogo="./assets/elbe_dark.png"
      endLogoDark="./assets/elbe_light.png"
      menu={[
        {
          id: "home",
          label: "Home",
          icon: HomeIcon,
          component: <_Home />,
        },
        {
          id: "second",
          label: "Second",
          icon: LeafIcon,
          component: <_SecondPage />,
        },
        {
          id: "settings",
          label: "Settings",
          icon: CogIcon,
          bottom: true,
        },
      ]}
      globalActions={[
        <Button.plain
          ariaLabel="back to demo"
          onTap={() => route("/")}
          label="back to demo"
          icon={LogOut}
        />,
      ]}
    />
  );
}

function _Home({}) {
  return (
    <>
      <Header
        title="Home"
        actions={[
          <Button.major
            ariaLabel="a demo tree icon"
            onTap={() => showToast("tree")}
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
            scheme={c as any}
            bordered
            key={c}
            class="centered"
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

function _SecondPage({}) {
  return (
    <>
      <Header
        title="Second"
        leading={
          <IconButton.plain
            ariaLabel="back"
            onTap={() => showToast("back")}
            icon={ChevronLeft}
          />
        }
      />
    </>
  );
}
