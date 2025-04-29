import { ChevronLeft, MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "preact/hooks";
import {
  Card,
  ElbeChild,
  IconButton,
  Text,
  useLayoutMode,
  useSiteScroll,
  useTheme,
  useThemeConfig,
} from "../../..";
import { maybeAppBase } from "./ctx_app_base";
import { _Toolbar } from "./toolbar";

const _backBtn = <BackButton onTap={() => history.go(-1)} />;
const _closeBtn = <CloseButton onTap={() => history.go(-1)} />;

export type HeaderLogos = {
  logo?: string | ElbeChild;
  logoDark?: string | ElbeChild;
  endLogo?: string | ElbeChild;
  endLogoDark?: string | ElbeChild;
};

export function Header(
  p: HeaderLogos & {
    leading?: ElbeChild | "back" | "close";
    title: string | ElbeChild;
    centerTitle?: boolean;
    actions?: ElbeChild[];
  }
) {
  const appBase = maybeAppBase();
  const layoutMode = useLayoutMode();
  const scroll = useSiteScroll();
  const tConfig = useThemeConfig();
  const theme = useTheme();
  return (
    <Card
      padding={0}
      scheme="primary"
      bordered
      frosted={!tConfig.highVis}
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
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderColor: tConfig.highVis || scroll ? null : "transparent",
        gap: "1rem",
        zIndex: 80,
      }}
    >
      {p.leading && p.leading !== "back" && p.leading !== "close"
        ? p.leading
        : appBase &&
          layoutMode != "wide" && (
            <IconButton.plain
              ariaLabel="open/close menu"
              onTap={() => appBase.setMenuOpen(!appBase.menuOpen)}
              icon={MenuIcon}
            />
          )}
      {p.leading === "back" && _backBtn}
      {p.leading === "close" && _closeBtn}
      <_Logo
        logo={p.logo ?? appBase?.icons.logo}
        logoDark={p.logoDark ?? appBase?.icons.logoDark}
        lMargin={0.5}
      />
      {typeof p.title === "string" ? (
        <Text.h3
          style={{
            marginLeft: !appBase || layoutMode === "wide" ? ".5rem" : 0,
          }}
          align={p.centerTitle ? "center" : "start"}
          flex={1}
          v={p.title}
        />
      ) : (
        <div style={{ flex: 1 }}>{p.title}</div>
      )}
      <_Toolbar
        actions={[...(p.actions ?? []), ...(appBase?.globalActions ?? [])]}
      />
      {layoutMode === "wide" && (
        <_Logo
          logo={p.endLogo ?? appBase?.icons.endLogo}
          logoDark={p.endLogoDark ?? appBase?.icons.endLogoDark}
          rMargin={0.5}
        />
      )}
    </Card>
  );
}

function _Logo(p: {
  logo: string | ElbeChild;
  logoDark?: string | ElbeChild | null;
  lMargin?: number;
  rMargin?: number;
}) {
  const tConfig = useThemeConfig();
  const [logo, setLogo] = useState(p.logo);
  useEffect(
    () => setLogo(tConfig.dark ? p.logoDark ?? p.logo : p.logo),
    [tConfig]
  );

  return !logo ? null : (
    <div
      style={{
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
        p.logo
      )}
    </div>
  );
}

export function BackButton(p: { onTap: () => void }) {
  return (
    <IconButton.plain ariaLabel="go back" onTap={p.onTap} icon={ChevronLeft} />
  );
}

export function CloseButton(p: { onTap: () => void }) {
  return <IconButton.plain ariaLabel="close" onTap={p.onTap} icon={XIcon} />;
}
