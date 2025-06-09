import { useEffect, useState } from "preact/hooks";
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

/**
 * A component that represents a full page layout with a header and footer.
 * It accepts header properties, content, and a footer element. All of these
 * (except the children) are optional.
 *
 * ### Properties:
 * - `narrow` will limit the width of the content to `900px`, and center it.
 * - `padding` will add padding around the content, defaulting to `1rem`.
 */
export function Page(
  p: HeaderProps &
    ContentBaseProps & { children?: ElbeChildren; footer?: ElbeChild }
) {
  const [hasHeader, setHasHeader] = useState(false);
  useEffect(() => {
    const headerProps = { ...p };
    delete headerProps.children;
    delete headerProps.footer;
    delete headerProps.padding;
    delete headerProps.narrow;
    delete headerProps.noScroll;
    setHasHeader(Object.keys(headerProps).length > 0);
  });

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
