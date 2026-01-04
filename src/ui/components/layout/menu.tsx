import { MenuIcon } from "lucide-react";
import { useMemo } from "react";
import {
  _Logo,
  elevatedBackdropStyle,
  MenuItem,
  useLayoutMode,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { Card } from "../base/card";
import { Button } from "../button/button";
import { Column } from "./flex";

type _TopBot = {
  top: MenuItem[];
  bottom: MenuItem[];
};

export function Menu(p: { items: MenuItem[] }) {
  const { _appThemeContext, menu } = useApp();
  const { theme } = _appThemeContext.useTheme();
  const layoutMode = useLayoutMode();

  const isWideOrOpen = useMemo(() => {
    return menu?.isOpen || layoutMode.isWide;
  }, [menu?.isOpen, layoutMode.isWide]);

  const menuWidth = useMemo(
    () =>
      menu?.isOpen
        ? layoutMode.isMobile
          ? "100%"
          : `17rem`
        : layoutMode.isWide
        ? `${3 + theme.geometry.borderWidth * 2}rem`
        : "0",
    [menu?.isOpen, layoutMode.mode, theme.geometry.borderWidth]
  );

  const topBot = useMemo<_TopBot>(() => {
    let topBot: _TopBot = { top: [], bottom: [] };
    for (let i of p.items) {
      if (i.bottom) topBot.bottom.push(i);
      else topBot.top.push(i);
    }
    return topBot;
  }, [p.items]);

  if (!menu) return null;

  return (
    <>
      {layoutMode.isWide && (
        <div
          key="menu_wide_spaceholder"
          style={{
            width: menuWidth,
            minWidth: menuWidth,
            marginRight: ".5rem",
          }}
        />
      )}

      <div
        onClick={() => menu.setOpen(false)}
        style={{
          zIndex: 100,

          position: "fixed",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          ...elevatedBackdropStyle(layoutMode.isNarrow && menu?.isOpen, theme, {
            width: "100%",
            height: "100%",
          }),
        }}
      />
      <_Menu topBot={topBot} wideOrOpen={isWideOrOpen} menuWidth={menuWidth} />
    </>
  );
}

function _Menu(p: { topBot: _TopBot; wideOrOpen: boolean; menuWidth: string }) {
  const { _appThemeContext, menu, appConfig } = useApp();
  const { theme } = _appThemeContext.useTheme();
  const layoutMode = useLayoutMode();

  if (!menu) return null;

  return (
    <Card
      onTap={() => {
        if (layoutMode.isWide) return;
        menu.setOpen(false);
      }}
      sharp={theme.menu.sharp || !layoutMode.isWide}
      bordered
      scheme={theme.menu.scheme}
      padding={0}
      elevated={theme.menu.elevated || (layoutMode.isNarrow && menu?.isOpen)}
      overflow="hidden"
      style={{
        zIndex: 101,
        position: "fixed",
        left: 0,
        top: 0,
        height: layoutMode.isWide ? "calc(100vh - 1rem)" : "100vh",
        margin: layoutMode.isWide ? ".5rem" : 0,
        padding: layoutMode.isWide || !menu.isOpen ? 0 : ".5rem",
        borderWidth:
          !layoutMode.isWide && !menu.isOpen
            ? 0
            : theme.geometry.borderWidth + "rem",
        borderColor: theme.color.isContrast ? undefined : "transparent",
        width: p.menuWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "stretch",

        gap: "1rem",
        transition: theme.motion.reduced ? "none" : "width 200ms ease-in-out",
      }}
    >
      {p.wideOrOpen && (
        <>
          <Button.plain
            sharp={layoutMode.isWide}
            contentAlign="start"
            ariaLabel="open/close menu"
            onTap={() => menu.setOpen(!menu.isOpen)}
            icon={MenuIcon}
            style={{
              marginBottom: ".5rem",
            }}
          >
            {!layoutMode.isWide && (
              <_Logo
                logo={appConfig.icons?.logo}
                logoDark={appConfig.icons?.logoDark}
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
            {p.topBot.top.map((i, index) => (
              <_MenuItemView key={index} item={i} />
            ))}
          </Column>
          {p.topBot.bottom.map((i, index) => (
            <_MenuItemView key={index} item={i} />
          ))}
        </>
      )}
    </Card>
  );
}

function _MenuItemView({ item }: { item: MenuItem }) {
  const { menu, router } = useApp();

  if (!menu) return null;

  return (
    <Button
      //sharp
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
      style={{
        transition: "background-color 200ms ease-in-out",
      }}
      label={menu.isOpen ? item.label : undefined}
      icon={item.icon}
      onTap={item.disabled ? undefined : () => router.go(item.path, "all")}
    />
  );
}
