import { ElbeTheme } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
import { createHashHistory } from "history";
import { render } from "preact";
import Router, { Route } from "preact-router";
import { AppDemo } from "./app_demo";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

function App() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <ElbeTheme seed={v.seed} {...v.config}>
      <Router history={createHashHistory() as any}>
        <Route path="/" component={Home} />
        <Route path="/app" component={AppDemo} />
      </Router>
    </ElbeTheme>
  ));
}

render(
  <ThemeBit.Provide>
    <App />
  </ThemeBit.Provide>,
  document.getElementById("app")
);
