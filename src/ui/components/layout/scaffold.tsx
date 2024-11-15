import { useEffect, useState } from "preact/hooks";
import { Icons, Text, type ElbeColorSchemes } from "../../..";
import { IconButton } from "../button/icon_button";
import { Column, Row } from "./flex";

type HeaderParams = {
  title?: string;
  back: null | "close" | "back";
  actions?: any;
  limitedHeight?: number;
};

/**
 * Header is a layout component that provides a header for a page.
 * It is used to create a consistent header for pages.
 * @param back - The back button type. If null, no back button is shown. If "close", a close button is shown. If "back", a back button is shown.
 * @param title - The title of the page.
 * @param actions - The actions to show on the right side of the header.
 */
export function Header({ back, title, actions, limitedHeight }: HeaderParams) {
  if (history.length == 0) back = null;
  const goBack = () => history.go(-1);

  const [isScrolledTop, setIsScrolled] = useState(false);

  useEffect(() => {
    const _handle = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", _handle);
    return () => {
      window.removeEventListener("scroll", _handle);
    };
  }, []);

  return (
    <div>
      <div style="height: 4.5rem"></div>
      <div
        class="header"
        style={{
          borderColor: isScrolledTop ? "" : "transparent",
          position: limitedHeight ? "absolute" : "fixed",
        }}
      >
        <div class="flex-1">
          {back ? (
            <IconButton.plain
              icon={back === "back" ? Icons.ArrowLeft : Icons.X}
              onTap={goBack}
            />
          ) : null}
        </div>
        <Text.h4 v={title} />
        <Row class="flex-1" gap={0.5} main="end">
          {actions}
        </Row>
      </div>
    </div>
  );
}

/**
 * Scaffold is a layout component that provides a header and a content area.
 * It is used to create a consistent layout for pages.
 */
export function Scaffold({
  children,
  limited = false,
  gap = 1,
  padded = true,
  scheme,
  ...header
}: {
  limited?: boolean;
  children: any;
  gap?: number;
  padded?: boolean;
  scheme?: ElbeColorSchemes;
} & HeaderParams) {
  return (
    <Column
      cross="stretch"
      gap={0}
      class={`${scheme ?? "primary"}`}
      style={{
        overflowY: header.limitedHeight ? "scroll" : null,
        maxHeight: header.limitedHeight ? `${header.limitedHeight}rem` : null,
        //height: header.limitToParent ? "100px" : null,
      }}
    >
      <Header {...header} />

      <div class={`${padded ? "padded" : ""} ${limited ? "base-limited" : ""}`}>
        <Column cross="stretch" gap={gap ?? 1}>
          {children}
        </Column>
      </div>
    </Column>
  );
}
