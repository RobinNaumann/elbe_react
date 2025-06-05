import { ElbeTheme, Route, wouter } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
import "elbe-ui/dist/elbe.css";
import { render } from "preact";
import { useHashLocation } from "wouter/use-hash-location";
import { AppDemo } from "./app_demo";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

function App() {
  const [loc, navigate] = wouter.useLocation();
  const themeBit = ThemeBit.use();
  return themeBit.mapUI(
    (v) => (
      <ElbeTheme seed={v.seed} {...v.config}>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/app" nest>
          <AppDemo goBack={() => navigate("/")} />
        </Route>
      </ElbeTheme>
    ),
    undefined,
    () => null
  );
}

render(
  <ThemeBit.Provider>
    {" "}
    <wouter.Router hook={useHashLocation}>
      <App />
    </wouter.Router>
  </ThemeBit.Provider>,
  document.getElementById("app")
);
