import { Column } from "../../..";
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
 */
export function Page(
  p: HeaderProps &
    ContentBaseProps & { children?: ElbeChildren; footer?: ElbeChild }
) {
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
      {p.footer}
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
