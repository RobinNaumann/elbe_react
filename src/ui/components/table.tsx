import { applyProps, Column, ElbeChild, ElbeProps, Icons, Text } from "../..";
import { useApp } from "../app/app_ctxt";

export type TableData = { [key: string]: any }[];

export type TableColumn<T> = {
  key: string;
  label: string;
  format?: (d: T) => string;
  width?: number | string;
  flex?: number;
};

/**
 * A simple table component to display tabular data.
 *
 * **Properties:**
 * - `entries` (TableData): An array of data objects to be displayed in the table.
 * - `columns` (TableColumn<any>[]): An array of column definitions specifying how to display each column.
 * - `stickyHeader` (boolean | undefined): If true, the table header will remain visible while scrolling.
 * - `height` (number | undefined): The height of the table in rem units. If not provided, the table will adjust to its content height.
 * - `onRowTap` (function | undefined): Callback function that receives the row data and index when a row is clicked.
 * - `emptyView` (ElbeChild | undefined): A custom view to display when there are no entries in the table.
 *
 * **Usage:**
 * ```tsx
 * <Table
 *   entries={[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]}
 *   columns={[
 *     { key: "id", label: "ID" },
 *     { key: "name", label: "Name" }
 *   ]}
 *   stickyHeader
 *   height={20}
 *   onRowTap={(row, index) => console.log("Row tapped:", row, index)}
 *   emptyView={<div>No data available</div>}
 * />
 * ```
 */
export function Table(
  p: {
    entries: TableData;
    columns: TableColumn<any>[];
    stickyHeader?: boolean;
    height?: number;
    onRowTap?: (row: TableData[number], index: number) => void;
    emptyView?: ElbeChild;
  } & ElbeProps
) {
  const _app = useApp({ useFallback: true });
  const _appTheme = _app._appThemeContext.useTheme();

  const themeSec = _appTheme.useWith(
    ({ color }) => ({
      color: {
        ...color,
        selection: {
          ...color.selection,
          scheme: "secondary" as const,
        },
      },
    }),
    [_appTheme]
  );

  return (
    <table
      {...applyProps("table", p, "elbe_table", {
        flex: 1,
        flexBasis: 0,
        display: "block",
        overflow: "auto",
        borderStyle: "solid",
        borderWidth: _appTheme.theme.geometry.borderWidth + "rem",
        borderColor: themeSec.theme.color.currentColor.back.asCss(),
        backgroundColor: themeSec.theme.color.currentColor.back.asCss(),
        borderRadius: _appTheme.theme.geometry.radius + "rem",
        height: p.height ? p.height + "rem" : undefined,
      })}
    >
      <thead
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          ...(p.stickyHeader ? { position: "sticky", top: 0, zIndex: 1 } : {}),
        }}
      >
        <tr
          style={{
            backgroundColor: themeSec.theme.color.currentColor.back.asCss(),
          }}
        >
          {p.columns.map((col) => (
            <th
              key={col.key}
              style={{
                width: col.width ? `${col.width}rem` : undefined,
                flex: col.flex,
              }}
            >
              <Text bold v={col.label} />
            </th>
          ))}
        </tr>
      </thead>
      {p.entries?.length === 0 && p.emptyView ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {p.emptyView}
        </div>
      ) : (
        <tbody
          style={{
            backgroundColor: _appTheme.theme.color.currentColor.back.asCss(),
            borderBottomRightRadius: _appTheme.theme.geometry.radius + "rem",
            borderBottomLeftRadius: _appTheme.theme.geometry.radius + "rem",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {(p.entries ?? []).map((o, i) => (
            <tr key={o.id + "-" + i} onClick={() => p.onRowTap?.(o, i)}>
              {p.columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    width: col.width ? `${col.width}rem` : undefined,
                    flex: col.flex,
                  }}
                >
                  {(col.format ?? _safeAsString)((o as any)[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

function _safeAsString(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return v.toString();
  if (typeof v === "boolean") return v ? "true" : "false";
  if (v instanceof Date) return v.toISOString();
  return JSON.stringify(v);
}

export function SimpleEmptyView() {
  return (
    <Column gap={0.5} cross="center" style={{ padding: "1.5rem" }}>
      <Icons.Binoculars />
      <Text.h6 v="No data available" />
    </Column>
  );
}
