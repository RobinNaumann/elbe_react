import { createContext, useContext } from "preact/compat";
import { Maybe } from "../util";
import { L10nInlinePlain } from "./l10n";

export type _LocaleID = `${string}_${string}` | `${string}`;
export type _LocaleIDEasy = `${string}_${string}_easy` | _LocaleID;
export type _L10nData = { [key: string]: any };

export function _bestMatch(
  selection: _L10nSelection,
  locales: _LocaleIDEasy[]
): _LocaleIDEasy | null {
  if (locales.length === 0) return null;
  const loc = _locale(selection.locale.replaceAll("-", "_"));

  const asLocales = locales.map((l) => _locale(l));

  // filter by language
  const langMatch = asLocales.filter((l) => loc.lang === l.lang);

  // filter by easy
  const easyMatch = langMatch.filter((l) => l.easy === selection.easy);

  // filter by region
  const regionMatch = easyMatch.filter((l) => l.region === loc.region);

  if (regionMatch.length > 0) return regionMatch[0].full;
  if (easyMatch.length > 0) return easyMatch[0].full;
  if (langMatch.length > 0) return langMatch[0].full;
  return null;
}

type _Locale = {
  full: string;
  lang: string;
  region: string | null;
  easy: boolean;
};

export function _locale(l: string): _Locale {
  const parts = l.split("_");

  const easy = parts.length > 2 && parts[2] === "easy";
  const region = parts.length > 1 ? parts[1].toLowerCase() : null;
  const lang = parts[0].toLowerCase();
  return { full: l, lang, region, easy };
}

export interface _L10nSelection {
  locale: string;
  easy: boolean;
}

export interface _L10nState<T extends _L10nData> extends _L10nSelection {
  /** the current locale */
  c: T;
  setLocale: (locale: string) => void;
  setEasyLang: (easyLang: boolean) => void;
  inline: (value: Maybe<L10nInlinePlain | string>) => string;
}

export const _L10nContext = createContext<_L10nState<any> | null>(null);

export function _maybeL10n<T extends _L10nData>(): _L10nState<T> | null {
  const ctx = useContext(_L10nContext);
  if (!ctx) return null;
  return ctx as _L10nState<T>;
}

export function _useL10n<T extends _L10nData>(): _L10nState<T> {
  const ctx = useContext(_L10nContext);
  if (!ctx) throw new Error("useL10n must be used within a L10n");
  return ctx;
}
