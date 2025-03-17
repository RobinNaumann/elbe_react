import { classString, type ElbeColorSchemes } from "../../..";
import { Column } from "./flex";
import { Header, HeaderParams } from "./header";

/**
 * Scaffold is a layout component that provides a header and a content area.
 * It is used to create a consistent layout for pages.
 */
export function Scaffold({
  children,
  baseLimited = false,
  gap = 1,
  padded = true,
  scheme,
  scroll = false,
  height,
  ...header
}: {
  baseLimited?: boolean;
  children: any;
  gap?: number;
  padded?: boolean;
  scheme?: ElbeColorSchemes;
  scroll?: boolean;
  height?: number;
} & HeaderParams) {
  return (
    <Column
      cross="stretch"
      gap={0}
      typeLabel="Scaffold"
      class={`${scheme ?? "primary"}`}
      style={{
        overflowY: height ? "scroll" : null,
        height: height ? `${height}rem` : scroll ? null : "100vh",
        //height: header.limitToParent ? "100px" : null,
      }}
    >
      <Header {...header} _absolute={height ? true : false} />

      <div
        class={classString([
          !scroll && "flex-1",
          padded && "padded",
          baseLimited && "base-limited",
        ])}
      >
        <Column
          cross="stretch"
          style={{ height: scroll ? null : "100%" }}
          gap={gap ?? 1}
        >
          {children}
        </Column>
      </div>
    </Column>
  );
}
