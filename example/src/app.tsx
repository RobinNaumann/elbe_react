import { ElbeApp, makeThemeContext, Route } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
//import "elbe-ui/dist/elbe.css";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

const _themeContext = makeThemeContext({ seed: {} });

// eslint-disable-next-line react-refresh/only-export-components
export const { useTheme, WithTheme } = _themeContext;

export function App() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(
    (ui) => (
      <ElbeApp
        themeSeed={ui.seed}
        themeContext={_themeContext}
        view={{
          footer: null,
          globalActions: [],
          icons: {},
          menuOpen: false,
        }}
      >
        <Route path="/">
          <Home />
        </Route>
      </ElbeApp>
    ),
    undefined,
    () => null
  );
}
