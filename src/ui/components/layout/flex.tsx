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
} & ElbeProps;

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
}: FlexProps) {
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
}: FlexProps & { wrap?: boolean }) {
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
      {...applyProps(
        "flex",
        elbe,
        [
          row ? "row" : "column",
          wraps && "wrap",
          p.noScrollbar && "no-scrollbar",
        ],
        {
          justifyContent: p.main,
          alignItems: p.cross,
          gap: `${p.gap}rem`,
          overflowX: !row ? undefined : p.scroll ? "auto" : undefined,
          overflowY: row ? undefined : p.scroll ? "auto" : undefined,
          flex: p.flex ?? p.scroll ? 1 : undefined,
        }
      )}
    >
      {p.children}
    </div>
  );
}
