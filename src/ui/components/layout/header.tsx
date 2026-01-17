import { ChevronLeft, MenuIcon, XIcon } from "lucide-react";
import { useMemo } from "react";
import {
  Card,
  ColorSelection,
  ElbeChild,
  IconButton,
  metaTagContent,
  remSize,
  Text,
  useLayoutMode,
  useSiteScroll,
} from "../../..";
import { useApp } from "../../app/app_ctxt";
import { _Toolbar } from "./toolbar";

/**
 * props for the Header component. Provide logos to the application.
 *
 * You can provide either a custom ElbeChild component or use the AssetLogo component to display an image logo.
 */
export type HeaderLogos = {
  logo?: ElbeChild;
  endLogo?: ElbeChild;
};

export type HeaderProps = HeaderLogos & {
  leading?: ElbeChild | "back" | "close";
  title: string | ElbeChild;
  centerTitle?: boolean;
  actions?: ElbeChild[];
  scheme?: ColorSelection.Schemes;
};

export function Header(p: HeaderProps) {
  const gap = 1;
  const { _appThemeContext, appConfig, menu } = useApp({ useFallback: true });
  const { theme } = _appThemeContext.useTheme();
  const layoutMode = useLayoutMode();
  const scroll = useSiteScroll();

  return (
    <Card
      typeLabel="elbe_header"
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
        borderBottomColor:
          theme.color.isContrast || scroll
            ? theme.color.currentColor.border
                .withAlpha(theme.color.isContrast ? 1 : 0.25)
                .asCss()
            : "transparent",
        borderBottomWidth: theme.geometry.borderWidth + "rem",
        gap: `${gap}rem`,
        zIndex: 80,
      }}
    >
      <_LeadingIcon
        leading={p.leading ?? null}
        isWide={layoutMode.isWide}
        gap={gap}
      />

      {!layoutMode.isMobile && (
        <_Logo logo={p.logo ?? appConfig?.branding?.logo} />
      )}

      <_HeaderTitle title={p.title} center={p.centerTitle ?? false} />
      <_Toolbar
        actions={[...(p.actions ?? []), ...(appConfig?.globalActions ?? [])]}
      />
      {layoutMode.isWide && (
        <_Logo logo={p.endLogo ?? appConfig?.branding?.endLogo} rMargin={0.5} />
      )}
    </Card>
  );
}

function _LeadingIcon(p: {
  leading: ElbeChild | "back" | "close";
  isWide: boolean;
  gap: number;
}) {
  const { router, menu } = useApp({ useFallback: true });
  const canGoBack = (router.history?.length ?? 0) < 2;
  // if leading is custom component, just return it
  if (p.leading && typeof p.leading !== "string") return p.leading;

  // if you can go back and leading is "back" or "close", show it
  if ((p.leading === "back" || p.leading === "close") && canGoBack) {
    return <BackButton close={p.leading === "close"} />;
  }

  // if the layout is not wide and there is a menu, show menu button
  if (!p.isWide && menu) {
    return (
      <IconButton.plain
        ariaLabel="open/close menu"
        onTap={() => menu!.setOpen(!menu?.isOpen)}
        icon={MenuIcon}
      />
    );
  }
  // return a spacer so content is not squeezed to the left if there is no icon
  return (
    <div
      style={{
        marginRight: `-${p.gap}rem`,
        width: ".5rem",
      }}
    />
  );
}
/**
 * Component to display an image logo from asset files.
 *
 * Props:
 * - src: string - The source path for the light theme logo image.
 * - srcDark?: string - Optional source path for the dark theme logo image.
 * - onTap?: () => void - Optional callback function to be called when the logo is clicked.
 * - height?: remSize - Optional height of the logo in rem units (default is 1.25rem).
 *
 * Example usage:
 * ```tsx
 * <AssetLogo
 *   src="/assets/logo_light.png"
 *   srcDark="/assets/logo_dark.png"
 *   onTap={() => window.open("https://example.com", "_blank")}
 *   height={2}
 * />
 * ```
 */
export function AssetLogo(p: {
  src: string;
  srcDark?: string;
  onTap?: () => void;
  height?: remSize;
}) {
  const { _appThemeContext } = useApp({ useFallback: true });
  const { theme } = _appThemeContext.useTheme();
  const trueSrc = getTrueSrc(
    theme.color.isDark && p.srcDark ? p.srcDark : p.src
  );

  return (
    <img
      src={trueSrc}
      onClick={(e) => {
        p.onTap?.();
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        cursor: p.onTap ? "pointer" : "default",
        height: `${p.height ?? 1.25}rem`,
      }}
    />
  );
}

export function _Logo(p: {
  flex?: boolean;
  logo: ElbeChild;
  lMargin?: number;
  rMargin?: number;
}) {
  return !p.logo ? null : (
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
      {p.logo}
    </div>
  );
}

export function BackButton(p: { close?: boolean }) {
  const { router } = useApp({ useFallback: true });
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

function getTrueSrc(src: string): string {
  const _basePath = metaTagContent("basepath") ?? "/";

  return src.startsWith("./") && typeof window !== "undefined"
    ? window.location.origin + _basePath + src.slice(2)
    : src;
}
