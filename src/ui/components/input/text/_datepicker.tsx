import { UnixMS } from "../../../..";

export function unixMsToDateInput(ms: UnixMS | string | null): string {
  if (ms === null) return "";
  if (typeof ms !== "number") ms = Number(ms);
  const date = new Date(ms);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dateInputToUnixMs(s: string): UnixMS | null {
  if (s === "") return null;
  return Date.parse(s);
}
