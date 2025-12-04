import { applyProps, type ElbeProps } from "../base/box";

export type FlexProps = {
  children: any;
  gap?: number;
  scroll?: boolean;
  noScrollbar?: boolean;
  main?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  cross?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
};

export function FlexSpace({}) {
  return <div style={{ flex: 1 }}></div>;
}

export function Column({
  gap = 1,
  main = "start",
  cross = "stretch",
  children,
  noScrollbar = false,
  scroll = false,
  ...p
}: FlexProps & ElbeProps) {
  return _Flex(
    false,
    { gap, main, cross, scroll, noScrollbar, children },
    p,
    false
  );
}

export function Row({
  gap = 1,
  main = "start",
  cross,
  wrap = false,
  children,
  noScrollbar = false,
  scroll = false,
  ...p
}: FlexProps & ElbeProps & { wrap?: boolean }) {
  return _Flex(
    true,
    { gap, main, cross, scroll, noScrollbar, children },
    p,
    wrap
  );
}

function _Flex(row: boolean, p: FlexProps, elbe: ElbeProps, wraps: boolean) {
  return (
    <div
      {...applyProps("flex", elbe, [p.noScrollbar && "elbe_no-scrollbar"], {
        display: "flex",
        flexDirection: row ? "row" : "column",
        flexWrap: wraps ? "wrap" : "nowrap",
        justifyContent: p.main,
        alignItems: p.cross ?? (row ? "center" : "stretch"),
        gap: `${p.gap ?? 1}rem`,
        overflowX: !row ? undefined : p.scroll ? "auto" : undefined,
        overflowY: row ? undefined : p.scroll ? "auto" : undefined,
        flex: elbe.flex ?? p.scroll ? 1 : undefined,
      })}
    >
      {p.children}
    </div>
  );
}
