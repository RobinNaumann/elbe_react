import { ChevronLeft, MenuIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Card,
  ColorSelection,
  ElbeChild,
  IconButton,
  Text,
  useLayoutMode,
  useSiteScroll,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { _Toolbar } from "./toolbar";

export type HeaderLogos = {
  logo?: string | ElbeChild;
  logoDark?: string | ElbeChild;
  endLogo?: string | ElbeChild;
  endLogoDark?: string | ElbeChild;
};

export type HeaderProps = HeaderLogos & {
  leading?: ElbeChild | "back" | "close";
  title: string | ElbeChild;
  centerTitle?: boolean;
  actions?: ElbeChild[];
  scheme?: ColorSelection.Schemes;
};

export function Header(p: HeaderProps) {
  const { _appThemeContext, appConfig, menu } = useApp();
  const { theme, useWith } = _appThemeContext.useTheme();
  const layoutMode = useLayoutMode();
  const scroll = useSiteScroll();
  const secTheme = useWith(
    (t) => ({
      color: {
        ...t.color,
        selection: {
          ...t.color.selection,
          scheme: "secondary",
          manner: "plain",
        },
      },
    }),
    [theme]
  );

  return (
    <Card
      padding={0}
      scheme={p.scheme ?? "primary"}
      manner={"plain"}
      frosted={!theme.color.isContrast}
      //elevated={!!scroll}
      bordered
      sharp
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,

        height: `${4 + theme.geometry.borderWidth}rem`,
        padding: ".5rem",
        display: "flex",
        alignItems: "center",
        borderTopStyle: "none",
        borderLeftStyle: "none",
        borderRightStyle: "none",
        borderColor:
          theme.color.isContrast || scroll
            ? theme.color.currentColor.border.withAlpha(0.25).asCss()
            : "transparent",
        borderWidth: theme.geometry.borderWidth + "rem",
        gap: "1rem",
        zIndex: 80,
      }}
    >
      {p.leading && p.leading !== "back" && p.leading !== "close"
        ? p.leading
        : !layoutMode.isWide &&
          menu && (
            <IconButton.plain
              ariaLabel="open/close menu"
              onTap={() => menu.setOpen(!menu.isOpen)}
              icon={MenuIcon}
            />
          )}

      {p.leading === "back" && <BackButton />}
      {p.leading === "close" && <BackButton close />}
      {!layoutMode.isMobile && (
        <_Logo
          logo={p.logo ?? appConfig?.icons?.logo}
          logoDark={p.logoDark ?? appConfig?.icons?.logoDark}
          lMargin={0.5}
        />
      )}
      {(!appConfig || layoutMode.isWide) && (
        <div style={{ margin: "-1rem", width: "1.5rem" }} />
      )}
      <_HeaderTitle title={p.title} center={p.centerTitle ?? false} />
      <_Toolbar
        actions={[...(p.actions ?? []), ...(appConfig?.globalActions ?? [])]}
      />
      {layoutMode.isWide && (
        <_Logo
          logo={p.endLogo ?? appConfig?.icons?.endLogo}
          logoDark={p.endLogoDark ?? appConfig?.icons?.endLogoDark}
          rMargin={0.5}
        />
      )}
    </Card>
  );
}

export function _Logo(p: {
  flex?: boolean;
  logo: string | ElbeChild;
  logoDark?: string | ElbeChild | null;
  lMargin?: number;
  rMargin?: number;
}) {
  const { _appThemeContext } = useApp();
  const { theme } = _appThemeContext.useTheme();
  const [logo, setLogo] = useState(p.logo);
  useMemo(
    () => setLogo(theme.color.isDark ? p.logoDark ?? p.logo : p.logo),
    [theme]
  );

  return !logo ? null : (
    <div
      style={{
        flex: p.flex ? 1 : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: `${p.lMargin ?? 0}rem`,
        marginRight: `${p.rMargin ?? 0}rem`,
      }}
    >
      {typeof logo === "string" ? (
        <img
          src={logo}
          style={{
            height: "1.25rem",
          }}
        />
      ) : (
        logo
      )}
    </div>
  );
}

export function BackButton(p: { close?: boolean }) {
  const { router } = useApp();
  const hidden = (router.history?.length ?? 0) < 2;
  return hidden ? null : (
    <IconButton.plain
      key="hello-back"
      ariaLabel={p.close ? "close" : "go back"}
      onTap={() => router.goBack()}
      icon={p.close ? XIcon : ChevronLeft}
    />
  );
}

export function _HeaderTitle(p: {
  title: string | ElbeChild;
  center: boolean;
}) {
  const layoutMode = useLayoutMode();

  const globalCenter = useMemo(() => {
    return !layoutMode.isMobile && p.center;
  }, [layoutMode]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: p.center ? "center" : "flex-start",
      }}
    >
      <div
        style={{
          transform: globalCenter
            ? "translateX(-50%) translateY(-50%)"
            : "none",
          // align to center of the screen:
          position: globalCenter ? "absolute" : "static",
          left: globalCenter ? "50%" : "0",
        }}
      >
        {typeof p.title === "string" ? (
          <Text.h3 align={p.center ? "center" : "start"} v={p.title} />
        ) : (
          p.title
        )}
      </div>
    </div>
  );
}
