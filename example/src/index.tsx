import { ElbeTheme, Scaffold, ToDo } from "elbe-ui";
//import "elbe-ui/dist/elbe.css";
import { render } from "preact";
import { Home } from "./home";
import "./style.scss";
import { ThemeBit } from "./util/b_theme";

function App() {
  const themeBit = ThemeBit.use();
  return themeBit.onData((v) => (
    <ElbeTheme seed={v.seed} {...v.config}>
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

function _Scaffold({}) {
  return (
    <Scaffold back={null} title="hello">
      <span>
        hello <ToDo.Inline msg="hello" /> how
      </span>
      <ToDo.Block msg="hello this is how we are" />
      <ToDo.Placeholder flex />
    </Scaffold>
  );
}
