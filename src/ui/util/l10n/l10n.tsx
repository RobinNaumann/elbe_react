import { createContext } from "preact";
import React from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import { ElbeChildren } from "../types";

type _LocaleID = `${string}_${string}` | `${string}`;
type _LocaleIDEasy = `${string}_${string}_easy` | _LocaleID;
type _L10nData = { [key: string]: any };

export interface _L10nState<T extends _L10nData> {
  /** the current locale */
  c: T;
  locale: string;
  easyLang: boolean;
  setLocale: (locale: string) => void;
  setEasyLang: (easyLang: boolean) => void;
}

const _L10nContext = createContext<_L10nState<any> | null>(null);

function _useL10n<T extends _L10nData>(): _L10nState<T> {
  const ctx = useContext(_L10nContext);
  if (!ctx) throw new Error("useL10n must be used within a L10n");
  return ctx;
}

type _L10nProps = {
  children: ElbeChildren;
  initialLocale?: _LocaleID;
  initialEasyLang?: boolean;
};

/**
 * L10nBase is a function that creates a localization context provider and a hook to use the localization context.
 * @param fallback this is the fallback locale, which is used if no other locale is found. It is the basis for the locale type and must thus be complete.
 * @param supported this is a list of supported locales. It is a map of locale IDs to partial localization data. The keys are the locale IDs, and the values are the localization data.
 * @returns an object with the L10n component and the useL10n hook.
 */
export function makeL10n<T extends _L10nData>(
  fallback: { [locale: _LocaleIDEasy]: T },
  supported: {
    [locale: _LocaleIDEasy]: Partial<T>;
  }
): {
  L10n: React.FunctionComponent<_L10nProps>;
  useL10n: () => _L10nState<T>;
} {
  if (Object.keys(supported).length === 0) {
    throw new Error("L10nBase: No fallback locales provided");
  }
  const fallbackLocale = Object.keys(fallback)[0];
  const fallbackValue = fallback[fallbackLocale];

  const supportedLocales: { [locale: _LocaleIDEasy]: Partial<T> } = {
    ...supported,
    ...fallback,
  };

  const useL10n = _useL10n<T>;

  const L10n = (p: _L10nProps) => {
    const [loc, setLoc] = useState(p.initialLocale ?? navigator.language);
    const [easy, setEasy] = useState(p.initialEasyLang ?? false);
    const [currentLang, setCurrentLang] = useState<T>(fallbackValue);

    useEffect(() => {
      const match = _bestMatch(loc, easy, Object.keys(supportedLocales));
      setCurrentLang({
        ...fallbackValue,
        ...(supportedLocales[match ?? ""] ?? {}),
      } as any);
    }, [loc, easy]);

    return (
      <_L10nContext.Provider
        value={{
          c: currentLang,
          locale: loc,
          easyLang: easy,
          setLocale: (l) => setLoc(l),
          setEasyLang: (e) => setEasy(e),
        }}
      >
        {p.children}
      </_L10nContext.Provider>
    );
  };

  return { L10n, useL10n };
}

type _Locale = {
  full: string;
  lang: string;
  region: string | null;
  easy: boolean;
};

function _locale(l: string): _Locale {
  const parts = l.split("_");

  const easy = parts.length > 2 && parts[2] === "easy";
  const region = parts.length > 1 ? parts[1].toLowerCase() : null;
  const lang = parts[0].toLowerCase();
  return { full: l, lang, region, easy };
}

function _bestMatch(
  locale: string,
  easy: boolean,
  locales: _LocaleIDEasy[]
): _LocaleIDEasy | null {
  const loc = _locale(locale.replaceAll("-", "_"));

  const asLocales = locales.map((l) => _locale(l));

  // filter by language
  const langMatch = asLocales.filter((l) => loc.lang === l.lang);

  // filter by easy
  const easyMatch = langMatch.filter((l) => l.easy === easy);

  // filter by region
  const regionMatch = easyMatch.filter((l) => l.region === loc.region);

  if (regionMatch.length > 0) return regionMatch[0].full;
  if (easyMatch.length > 0) return easyMatch[0].full;
  if (langMatch.length > 0) return langMatch[0].full;
  return null;
}
