import { ElbeTheme, Route } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
import "elbe-ui/dist/elbe.css";
import { AppDemo } from "./app_demo";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

export function App() {
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(
    (v) => (
      <ElbeTheme seed={v.seed} {...v.config}>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/app" nest>
          <AppDemo goBack={() => window.history.back()} />
        </Route>
      </ElbeTheme>
    ),
    undefined,
    () => null
  );
}
