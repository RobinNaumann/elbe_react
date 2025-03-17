import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { IconButton, Icons, Row, Text } from "../../..";

export type HeaderParams = {
  title?: string;
  back?: null | "close" | "back" | JSX.Element;
  actions?: any;
  _absolute?: boolean;
};

/**
 * Header is a layout component that provides a header for a page.
 * It is used to create a consistent header for pages.
 * @param back - The back button type. If null, no back button is shown. If "close", a close button is shown. If "back", a back button is shown.
 * @param title - The title of the page.
 * @param actions - The actions to show on the right side of the header.
 * @param children - The children to show in the header. If children are provided, the title is ignored.
 */
export function Header({
  back,
  title,
  actions,
  _absolute,
  children,
  height = 4,
}: HeaderParams & { children?: any; height?: number }) {
  // if the icon is a type of back, we have to hide it if there is no history
  if (
    typeof back === "string" &&
    ["back", "close"].includes(back) &&
    history.length == 0
  ) {
    back = null;
  }
  const goBack = () => history.go(-1);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const _handle = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", _handle);
    return () => {
      window.removeEventListener("scroll", _handle);
    };
  }, []);

  return (
    <div>
      <div style={{ height: `${height}rem` }}></div>
      <div
        class="header"
        style={{
          height: `${height}rem`,
          borderColor: isScrolled
            ? "color-mix(in srgb, var(--c-context-border) 40%, transparent)"
            : "transparent",

          position: _absolute ? "absolute" : "fixed",
        }}
      >
        <div class="flex-1">
          {back ? (
            typeof back !== "string" ? (
              back
            ) : (
              <IconButton.plain
                icon={back === "back" ? Icons.ArrowLeft : Icons.X}
                onTap={goBack}
              />
            )
          ) : null}
        </div>
        {children ? children : <Text.h5 v={title} />}
        <Row class="flex-1" gap={0.5} main="end">
          {actions}
        </Row>
      </div>
    </div>
  );
}
