import { ElbeApp, makeThemeContext, metaTagContent, Route } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
//import "elbe-ui/dist/elbe.css";
import { AppDemo } from "./app_demo";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

const _themeContext = makeThemeContext({ seed: {} });
const _basePath = metaTagContent("basepath") ?? "/";

// eslint-disable-next-line react-refresh/only-export-components
export const { useTheme, WithTheme } = _themeContext;

export function App() {
  const themeBit = ThemeBit.use();

  return themeBit.mapUI(
    (ui) => (
      <ElbeApp
        title="elbe Example"
        themeSeed={ui.seed}
        themeContext={_themeContext}
        routerConfig={{ basePath: _basePath }}
        globalActions={
          [
            /*<Button.major
            ariaLabel="toogle dark mode"
            label="dark"
            icon={Icons.Moon}
            onTap={() => setDarkMode(!darkMode)}
          />*/
          ]
        }
      >
        <Route path="/">
          <Home />
        </Route>
        <Route nest path="/app">
          <AppDemo
            goBack={() => {
              window.history.pushState({}, "", _basePath);
            }}
          />
        </Route>
      </ElbeApp>
    ),
    undefined,
    () => <button onClick={() => themeBit.reload()}>Load Theme</button>
  );
}
