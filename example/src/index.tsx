import { ElbeTheme } from "elbe-ui";
import "elbe-ui/dist/elbe.css";
import { render } from "preact";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

function App() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <ElbeTheme seed={v.seed} dark={v.dark}>
      <Home />
    </ElbeTheme>
  ));
}

render(
  <ThemeBit.Provide>
    <App />
  </ThemeBit.Provide>,
  document.getElementById("app")
);
