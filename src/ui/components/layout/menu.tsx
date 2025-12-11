import { MenuIcon } from "lucide-react";
import { _Logo, MenuItem, useLayoutMode } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { Card, elevatedShadow } from "../base/card";
import { Button } from "../button/button";
import { Column } from "./flex";

export function Menu(p: { items: MenuItem[] }) {
  const { appConfig, setAppView } = useApp();
  const { theme } = appConfig.themeContext.useTheme();
  const layoutMode = useLayoutMode();

  const topBot: {
    top: MenuItem[];
    bottom: MenuItem[];
  } = { top: [], bottom: [] };
  for (let i of p.items) {
    if (i.bottom) topBot.bottom.push(i);
    else topBot.top.push(i);
  }

  const wideOrOpen = () => appConfig.view.menuOpen || layoutMode.isWide;

  const menuWidth = () =>
    appConfig.view.menuOpen
      ? layoutMode.isMobile
        ? "100%"
        : `${17 + theme.geometry.borderWidth}rem`
      : layoutMode.isWide
      ? `${4 + theme.geometry.borderWidth}rem`
      : "0";

  return (
    <>
      {layoutMode.isWide && (
        <div
          style={{
            width: menuWidth(),
            minWidth: menuWidth(),
          }}
        />
      )}
      <div
        onClick={() => setAppView((v) => ({ ...v, menuOpen: false }))}
        style={{
          zIndex: 100,

          position: "fixed",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          backgroundColor: "rgba(0,0,0,0)",
          transition: "background-color 200ms ease-in-out",
          ...(layoutMode.isNarrow && appConfig.view.menuOpen
            ? {
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0,0,0,.2)",
                width: "100%",
                height: "100%",
              }
            : {}),
        }}
      />

      <Card
        onTap={() => {
          if (layoutMode.isWide) return;
          setAppView((v) => ({ ...v, menuOpen: false }));
        }}
        sharp={layoutMode.isMobile}
        bordered
        scheme="primary"
        padding={wideOrOpen() ? 0.5 : 0}
        style={{
          zIndex: 101,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflow: "hidden",

          width: menuWidth(),
          display: "flex",
          //display: appBase.menuOpen || layoutMode == "wide" ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "stretch",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeftStyle: "none",
          borderTopStyle: "none",
          borderBottomStyle: "none",
          borderColor: theme.color.isContrast ? undefined : "transparent",
          gap: "1rem",
          transition: theme.motion.reduced ? "none" : "width 200ms ease-in-out",

          ...(layoutMode.isNarrow && appConfig.view.menuOpen
            ? {
                boxShadow: elevatedShadow(theme.color.isDark),
              }
            : {}),
        }}
      >
        {wideOrOpen() && (
          <>
            <Button.plain
              contentAlign="start"
              ariaLabel="open/close menu"
              onTap={() => setAppView((v) => ({ ...v, menuOpen: !v.menuOpen }))}
              icon={MenuIcon}
              style={{
                marginBottom: ".5rem",
                borderRadius: "3rem",
              }}
            >
              {!layoutMode.isWide && (
                <_Logo
                  logo={appConfig.view?.icons.logo}
                  logoDark={appConfig.view?.icons.logoDark}
                  lMargin={0.5}
                />
              )}
            </Button.plain>
            <Column
              flex={1}
              scroll
              noScrollbar
              //style={{overflowY: "auto"}}
            >
              {topBot.top.map((i, index) => (
                <_MenuItemView key={index} item={i} />
              ))}
            </Column>
            {topBot.bottom.map((i, index) => (
              <_MenuItemView key={index} item={i} />
            ))}
          </>
        )}
      </Card>
    </>
  );
}

function _MenuItemView({ item }: { item: MenuItem }) {
  const { appConfig, router } = useApp();

  return (
    <Button
      ariaLabel={item.label}
      contentAlign="start"
      manner={
        (
          item.path === "/"
            ? router.location === "/"
            : router.location.startsWith(item.path)
        )
          ? "major"
          : "plain"
      }
      label={appConfig.view.menuOpen ? item.label : undefined}
      icon={item.icon}
      onTap={item.disabled ? undefined : () => router.go(item.path, "all")}
    />
  );
}
