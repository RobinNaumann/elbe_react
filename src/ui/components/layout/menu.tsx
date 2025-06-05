import { MenuIcon } from "lucide-react";
import { useLocation } from "wouter";
import { MenuItem, useLayoutMode, useTheme, useThemeConfig } from "../../..";
import { Card, elevatedShadow } from "../base/card";
import { Button } from "../button/button";
import { useAppBase } from "./ctx_app_base";
import { Column } from "./flex";

export function Menu(p: { items: MenuItem[] }) {
  const layoutMode = useLayoutMode();
  const appBase = useAppBase();
  const tConfig = useThemeConfig();
  const theme = useTheme();

  const topBot: {
    top: MenuItem[];
    bottom: MenuItem[];
  } = { top: [], bottom: [] };
  for (let i of p.items) {
    if (i.bottom) topBot.bottom.push(i);
    else topBot.top.push(i);
  }

  const wideOrOpen = () => appBase.menuOpen || layoutMode == "wide";

  const menuWidth = () =>
    appBase.menuOpen
      ? layoutMode === "mobile"
        ? "100vw"
        : `${17 + theme.geometry.borderWidth}rem`
      : layoutMode === "wide"
      ? `${4 + theme.geometry.borderWidth}rem`
      : "0";

  return (
    <>
      {layoutMode == "wide" && (
        <div
          style={{
            width: menuWidth(),
          }}
        />
      )}
      <div
        onClick={() => appBase.setMenuOpen(false)}
        style={{
          zIndex: 100,

          position: "fixed",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          backgroundColor: "rgba(0,0,0,0)",
          transition: "background-color 200ms ease-in-out",
          ...(layoutMode === "narrow" && appBase.menuOpen
            ? {
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0,0,0,.2)",
                width: "100vw",
                height: "100vh",
              }
            : {}),
        }}
      />

      <Card
        onTap={() => {
          if (layoutMode == "wide") return;
          appBase.setMenuOpen(false);
        }}
        sharp={layoutMode == "mobile"}
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
          borderLeft: "none",
          borderTop: "none",
          borderBottom: "none",
          borderColor: tConfig.highVis ? null : "transparent",
          gap: "1rem",
          transition: tConfig.reducedMotion
            ? "none"
            : "width 200ms ease-in-out",

          ...(layoutMode === "narrow" && appBase.menuOpen
            ? {
                boxShadow: elevatedShadow,
              }
            : {}),
        }}
      >
        {wideOrOpen() && (
          <>
            <Button.plain
              contentAlign="start"
              ariaLabel="open/close menu"
              onTap={() => appBase.setMenuOpen(!appBase.menuOpen)}
              icon={MenuIcon}
              style={{
                marginBottom: ".5rem",
                borderRadius: "3rem",
              }}
            />
            <Column
              flex={1}
              scroll
              noScrollbar
              //style={{overflowY: "auto"}}
            >
              {topBot.top.map((i) => (
                <_MenuItemView item={i} />
              ))}
            </Column>
            {topBot.bottom.map((i) => (
              <_MenuItemView item={i} />
            ))}
          </>
        )}
      </Card>
    </>
  );
}

function _MenuItemView({ item }: { item: MenuItem }) {
  const [location, navigate] = useLocation();
  const appBase = useAppBase();

  return (
    <Button
      ariaLabel={item.label}
      contentAlign="start"
      manner={
        (item.path === "/" ? location === "/" : location.startsWith(item.path))
          ? "major"
          : "plain"
      }
      label={appBase.menuOpen ? item.label : undefined}
      icon={item.icon}
      onTap={item.disabled ? undefined : () => navigate(item.path)}
    />
  );
}
