import { applyProps, type ElbeProps } from "./box";

export type FlexProps = {
  children: any;
  gap?: number;
  // shorthand for cross="stretch"
  stretch?: boolean;
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
  cross,
  stretch = false,
  children,
  ...p
}: FlexProps) {
  return _Flex(false, { gap, main, cross, stretch, children }, p);
}

export function Row({
  gap = 1,
  main = "start",
  cross,
  stretch = false,
  children,
  ...p
}: FlexProps) {
  return _Flex(true, { gap, main, cross, stretch, children }, p);
}

function _Flex(row: boolean, p: FlexProps, elbe: ElbeProps) {
  return (
    <div
      {...applyProps(elbe, row ? "row" : "column", {
        justifyContent: p.main,
        alignItems: p.cross || (p.stretch ? "stretch" : "center"),
        gap: `${p.gap}rem`,
      })}
    >
      {p.children}
    </div>
  );
}
