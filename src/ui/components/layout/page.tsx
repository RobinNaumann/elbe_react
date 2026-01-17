import { Column } from "../../..";
import { useApp } from "../../app/app_ctxt";
import { ElbeChild, ElbeChildren } from "../../util/types";
import { Box } from "../base/box";
import { Header, HeaderProps } from "./header";

type ContentBaseProps = {
  padding?: number;
  narrow?: boolean;
  noScroll?: boolean;
  scheme?: string;
};

function _hasMoreThan(p: { [key: string]: any }, expected: string[]) {
  return Object.keys(p).findIndex((k) => !expected.includes(k)) !== -1;
}

/**
 * A component that represents a full page layout with a header and footer.
 * It accepts header properties, content, and a footer element. All of these
 * (except the children) are optional.
 *
 * ### Properties:
 * - `narrow` will limit the width of the content to `900px`, and center it.
 * - `padding` will add padding around the content, defaulting to `1rem`.
 * - `leading` can be used to add a back or close button to the header. Setting it
 *   "back" or "close" will automatically show the button if there is history to go back to.
 * - `title` sets the title of the page in the header.
 * - `centerTitle` will center the title in the header.
 * - `actions` can be used to add action buttons to the header.
 * - `scheme` sets the color scheme of the page.
 * - `footer` can be used to set a custom footer element. If not provided, the app's default
 *   footer will be used. If set to `null`, no footer will be rendered.
 */
export function Page(
  p: HeaderProps &
    ContentBaseProps & { children?: ElbeChildren; footer?: ElbeChild | null }
) {
  const appConfig = useApp({ useFallback: true });

  const hasHeader = _hasMoreThan(p, [
    "children",
    "footer",
    "padding",
    "narrow",
    "noScroll",
    "scheme",
  ]);

  return (
    <Box
      scheme={p.scheme ?? "primary"}
      typeLabel="page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: "100vh",
        height: p.noScroll ? "100vh" : "auto",
      }}
    >
      {hasHeader && <Header {...p} />}
      <_ContentBase
        padding={p.padding}
        narrow={p.narrow}
        children={p.children}
      />
      {p.footer === null ? null : p.footer ?? appConfig.appConfig.footer}
    </Box>
  );
}

function _ContentBase(
  p: ContentBaseProps & {
    children: ElbeChildren;
  }
) {
  return (
    <Column
      style={{
        flex: 1,
        minHeight: 0,
        padding: p.padding ? `${p.padding}rem` : "1rem",
        width: p.narrow ? "min(100%, 900px)" : "auto",
        margin: p.narrow ? "0 auto" : "0",
      }}
    >
      {p.children}
    </Column>
  );
}
