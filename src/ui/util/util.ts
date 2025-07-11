import { useEffect, useState } from "preact/compat";
import { int, showToast } from "../..";

export type Maybe<T> = T | null | undefined;
export type PromiseOr<T> = Promise<T> | T;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function classString(
  classes: (string | false | null | undefined)[]
): string {
  console.log(classes);
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
