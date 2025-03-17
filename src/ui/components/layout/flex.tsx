import { applyProps, type ElbeProps } from "../base/box";

export type FlexProps = {
  children: any;
  gap?: number;
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
  return <div style="flex:1"></div>;
}

export function Column({
  gap = 1,
  main = "start",
  cross = "stretch",
  children,
  ...p
}: FlexProps) {
  return _Flex(false, { gap, main, cross, children }, p, false);
}

export function Row({
  gap = 1,
  main = "start",
  cross,
  wrap = false,
  children,
  ...p
}: FlexProps & { wrap?: boolean }) {
  return _Flex(true, { gap, main, cross, children }, p, wrap);
}

function _Flex(row: boolean, p: FlexProps, elbe: ElbeProps, wraps: boolean) {
  return (
    <div
      {...applyProps(elbe, [row ? "row" : "column", wraps && "wrap"], {
        justifyContent: p.main,
        alignItems: p.cross,
        gap: `${p.gap}rem`,
      })}
    >
      {p.children}
    </div>
  );
}
