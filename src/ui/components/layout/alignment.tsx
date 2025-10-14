import { ElbeChildren } from "../../util/types";
import { Column } from "./flex";

export type Alignment =
  | "start_start"
  | "start_center"
  | "start_end"
  | "center_start"
  | "center"
  | "center_end"
  | "end_start"
  | "end_center"
  | "end_end";

export function Align({
  alignment = "center",
  height,
  width,
  size,
  class: className,
  children,
}: {
  alignment?: Alignment;
  height?: string | number;
  width?: string | number;
  size?: string | number;
  class?: string;
  children: ElbeChildren;
}) {
  const [main, cross] = alignment.split("_");

  if (typeof height === "number") height = `${height}rem`;
  if (typeof width === "number") width = `${width}rem`;
  if (typeof size === "number") size = `${size}rem`;

  return (
    <Column
      className={className}
      cross={(cross as any) ?? "center"}
      style={{ height: height ?? size, width: width ?? size }}
      main={(main as any) ?? "center"}
    >
      {children}
    </Column>
  );
}
