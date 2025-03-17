import type React from "preact/compat";
import { showToast } from "./toast";

export type ElbeChild = React.ReactNode;
export type ElbeChildren = ElbeChild[] | ElbeChild;

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
