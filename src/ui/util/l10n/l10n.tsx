import React from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { ElbeChildren } from "../types";
import { Maybe } from "../util";
import {
  _bestMatch,
  _L10nContext,
  _L10nData,
  _L10nSelection,
  _L10nState,
  _LocaleID,
  _LocaleIDEasy,
  _useL10n,
} from "./_l10n_util";

export type L10nInlinePlain = { [key: _LocaleIDEasy]: string };

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
  if (Object.keys(fallback).length === 0) {
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
    const [locale, setLocale] = useState<_L10nSelection>({
      locale: p.initialLocale ?? navigator.language,
      easy: p.initialEasyLang ?? false,
    });
    const [currentLang, setCurrentLang] = useState<T>(fallbackValue);

    useEffect(() => {
      const match = _bestMatch(locale, Object.keys(supportedLocales));
      setCurrentLang({
        ...fallbackValue,
        ...(supportedLocales[match ?? ""] ?? {}),
      } as any);
    }, [locale]);

    return (
      <_L10nContext.Provider
        value={{
          ...locale,
          c: currentLang,
          setLocale: (l) => setLocale({ ...locale, locale: l }),
          setEasyLang: (e) => setLocale({ ...locale, easy: e }),
          inline: _l10nInlineResolver(locale),
        }}
      >
        {p.children}
      </_L10nContext.Provider>
    );
  };

  return { L10n, useL10n };
}

function _l10nInlineResolver(locale: _L10nSelection) {
  return (value: Maybe<L10nInlinePlain | string>): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    const locales = Object.keys(value);
    const bestMatch = _bestMatch(locale, locales);

    const anyEnglish = locales.find((l) => l.startsWith("en"))?.[0] ?? "en";

    return value[bestMatch ?? anyEnglish] ?? value[locales[0]] ?? "";
  };
}
