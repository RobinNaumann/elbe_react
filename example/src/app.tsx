import { ElbeApp, makeThemeContext, Route } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
//import "elbe-ui/dist/elbe.css";
import { useMemo } from "react";
import { AppDemo } from "./app_demo";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

const _themeContext = makeThemeContext({ seed: {} });

// eslint-disable-next-line react-refresh/only-export-components
export const { useTheme, WithTheme } = _themeContext;

export function App() {
  const basePath = useMemo(
    () =>
      document
        .querySelector('meta[name="basepath"]')
        ?.getAttribute("content") ?? undefined,
    []
  );

  const themeBit = ThemeBit.use();
  return themeBit.mapUI(
    (ui) => (
      <ElbeApp
        title="elbe Example"
        themeSeed={ui.seed}
        themeContext={_themeContext}
        routerConfig={{ basePath: basePath }}
      >
        <Route path="/">
          <Home />
        </Route>
        <Route nest path="/app">
          <AppDemo
            goBack={() => {
              window.history.pushState({}, "", "/");
            }}
          />
        </Route>
      </ElbeApp>
    ),
    undefined,
    () => null
  );
}
