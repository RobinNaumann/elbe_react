import { useEffect, useState } from "react";
import { int } from "../..";
import { showToast } from "./toast/toast_legacy";

export type Maybe<T> = T | null | undefined;
export type PromiseOr<T> = Promise<T> | T;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function classString(
  classes: (string | false | null | undefined)[]
): string {
  return classes.filter((c) => c).join(" ");
}

/**
 * use the web share api if available, otherwise copy the data to the clipboard
 * @param data the data you want to share
 * @param toastMsg the message to show in the toast if the share api is not available
 */
export function share(
  data: { title: string; text?: string; url: string },
  toastMsg = "copied to clipboard. Share it with others."
) {
  const msg = `${data.title}\n${data.text ?? ""}\n\n${data.url}`;

  if (navigator.share) {
    navigator.share(data).catch(() => copyToClipboard(msg, toastMsg));
  } else {
    copyToClipboard(msg, toastMsg);
  }
}

/**
 * copy the text to the clipboard
 * @param text the text to copy to the clipboard
 * @param toastMsg the message to show in the toast
 */
export function copyToClipboard(
  text: string,
  toastMsg = "copied to clipboard"
) {
  navigator.clipboard.writeText(text);
  if (toastMsg) showToast(toastMsg);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function randomAlphaNum(length: int, prefix = ""): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = prefix;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export type LayoutModes = "mobile" | "narrow" | "wide";

export type LayoutModeInfo = {
  mode: LayoutModes;
  screenWidth: number;
  screenHeight: number;
  isMobile: boolean;
  isNarrow: boolean;
  isWide: boolean;
};

function _layoutMode() {
  const w = window.innerWidth;
  if (w < 700) return "mobile";
  if (w < 1100) return "narrow";
  return "wide";
}

function _layoutModeInfo(): LayoutModeInfo {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const mode = _layoutMode();
  return {
    mode,
    screenWidth: w,
    screenHeight: h,
    isMobile: mode === "mobile",
    isNarrow: mode === "narrow",
    isWide: mode === "wide",
  };
}

/**
 * check the current layout mode based on the window width.
 * This will return an object with the current mode and screen dimensions.
 * @returns a LayoutModeInfo object
 */
export function useLayoutMode(): LayoutModeInfo {
  const [mode, setMode] = useState<LayoutModeInfo>(_layoutModeInfo());
  useEffect(() => {
    const onResize = () => setMode(_layoutModeInfo());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
  return mode;
}

export function useSiteScroll() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scroll;
}

export function deepMerge<T extends Dict<any>>(
  original: T,
  toMerge: Partial<T>
): T {
  const output: Dict<any> = {};

  function isPlainObject(v: any) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  for (const key of new Set(
    Object.keys(toMerge ?? {}).concat(Object.keys(original ?? {}))
  )) {
    const a = original?.[key];
    const b = toMerge?.[key];

    // both present
    if (b !== undefined && a !== undefined) {
      // handle arrays explicitly to avoid converting them into objects
      if (Array.isArray(a) || Array.isArray(b)) {
        if (Array.isArray(a) && Array.isArray(b)) {
          const max = Math.max(a.length, b.length);
          const arr: any[] = [];
          for (let i = 0; i < max; i++) {
            if (i in b) {
              if (isPlainObject(a[i]) && isPlainObject(b[i])) {
                arr[i] = deepMerge(a[i], b[i]);
              } else {
                arr[i] = b[i];
              }
            } else {
              arr[i] = a[i];
            }
          }
          output[key] = arr;
        } else {
          // one of them is an array, prefer the `toMerge` value if present
          output[key] = b ?? a;
        }
      } else if (isPlainObject(a) && isPlainObject(b)) {
        output[key] = deepMerge(a, b);
      } else {
        output[key] = b ?? a;
      }
    } else {
      output[key] = b ?? a;
    }
  }

  return output as T;
}

export function throwError(message: string): never {
  throw new Error(message);
}

export function tryOrNull<T>(w: () => T | null): T | null {
  try {
    return w()!;
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export function omit<T extends Dict<any>>(obj: T, ...keys: string[]): T {
  const res: T = { ...obj };
  for (const key of keys) {
    if (key in obj) delete res[key];
  }
  return res;
}

export function dictMap<T extends Dict<any>, U extends Dict<any>>(
  obj: T,
  f: (v: T[keyof T], k: keyof T) => U[keyof U] | undefined
): U {
  const res: any = {};
  for (const key in obj) {
    const v = f(obj[key], key);
    if (v !== undefined) res[key] = v;
  }
  return res;
}

export function dictWithoutUndefined<T extends Dict<any>>(
  obj?: T
): { [key in keyof T]: Exclude<T[key], undefined> } {
  if (!obj) return {} as any;
  const res: any = {};
  for (const key in obj) {
    const v = obj[key];
    if (v !== undefined) res[key] = v;
  }
  return res;
}
