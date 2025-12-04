import { createContext, useContext, useMemo } from "react";
import { ElbeChildren } from "../..";
import { deepMerge, dictMap, throwError, tryOrNull } from "../util/util";
import {
  elbeCoreThemes,
  ElbeThemeConfig,
  ElbeThemeContextData,
  ElbeThemeData,
  ElbeThemeDefinitions,
  ElbeThemeSeed,
} from "./theme";

export function makeThemeContext<T extends ElbeThemeData = {}>(p: {
  definitions?: T;
  config?: Partial<ElbeThemeConfig<T>>;
  seed?: Partial<ElbeThemeSeed<T>>;
}) {
  const allDefinitions: ElbeThemeDefinitions<T> = {
    ...elbeCoreThemes,
    ...(p.definitions ?? ({} as any)),
  };

  const config = _configFromSeed(
    {
      ...elbeCoreThemes,
      ...(p.definitions ?? ({} as any)),
    },
    p.config ?? {},
    p.seed ?? {}
  );

  const ElbeThemeContext = createContext<ElbeThemeContextData<T>>(
    _computeContext(allDefinitions, config)
  );

  function useMaybeTheme(): ElbeThemeContextData<T> | null {
    return tryOrNull(() => useContext(ElbeThemeContext));
  }

  function useTheme(): ElbeThemeContextData<T> {
    return useMaybeTheme() ?? throwError("No theme data");
  }

  function WithTheme(p: {
    children: ElbeChildren;
    theme?: ElbeThemeContextData<T>;
    seed?: Partial<ElbeThemeSeed<T>>;
    themeConfig?: ElbeThemeConfig<T> | null;
  }) {
    const theme = useTheme();

    const newTheme = useMemo(() => {
      if (p.seed) {
        const newConfig = _configFromSeed(
          allDefinitions,
          {}, //p.themeConfig ?? theme.themeConfig,
          p.seed
        );
        return _computeContext(allDefinitions, newConfig);
      }

      return (
        p.theme ??
        _computeContext(allDefinitions, p.themeConfig ?? theme.themeConfig)
      );
    }, [allDefinitions, p.theme, p.themeConfig, theme.themeConfig, p.seed]);

    const css = useMemo(() => {
      let css: React.CSSProperties = {};
      for (let key in newTheme.themeDefinitions) {
        const def = newTheme.themeDefinitions[key];
        const subCss = def.asCss(newTheme.theme[key] ?? {});
        css = { ...css, ...subCss };
      }
      return css;
    }, [newTheme]);
    return (
      <ElbeThemeContext.Provider value={newTheme}>
        <div
          style={{
            display: "contents",
            ...css,
          }}
        >
          {p.children}
        </div>
      </ElbeThemeContext.Provider>
    );
  }

  return {
    useTheme,
    WithTheme,
  };
}

export type ElbeThemeContext = ReturnType<typeof makeThemeContext>;

function _configFromSeed<T extends ElbeThemeData>(
  defs: ElbeThemeDefinitions<T>,
  config: Partial<ElbeThemeConfig<T>>,
  seed: Partial<ElbeThemeSeed<T>>
): ElbeThemeConfig<T> {
  const conf: any = {};

  for (let key in defs) {
    if (key === "with") continue;
    //if (key! in seed) continue;
    const fullSeed = deepMerge(defs[key].seed, seed?.[key] ?? {});
    console.log("THEME SEED FOR", key, fullSeed);
    conf[key] = {
      ...defs[key].fromSeed(fullSeed as any),
      ...(config?.[key] ?? {}),
    };
  }
  return conf;
}

function _with<T extends ElbeThemeData>(
  definitions: ElbeThemeDefinitions<T>,
  config: ElbeThemeConfig<T>,
  worker: (data: ElbeThemeConfig<T>) => Partial<ElbeThemeConfig<T>>
): ElbeThemeContextData<T> {
  const partConf = worker({ ...config });
  const newConf = deepMerge(config, partConf);
  return _computeContext<T>(definitions, newConf);
}

function _computeContext<T extends ElbeThemeData>(
  definitions: ElbeThemeDefinitions<T>,
  config: ElbeThemeConfig<T>
): ElbeThemeContextData<T> {
  return {
    themeDefinitions: definitions,
    themeConfig: config,
    theme: dictMap(config, (v, k) => definitions[k].compute(v)),
    with: (worker: any, dependencies: any[]) =>
      useMemo(() => {
        return _with<T>(definitions, config, worker);
      }, [...dependencies, config]),
  };
}
