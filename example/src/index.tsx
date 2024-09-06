import { render } from "preact";

import { Home } from "./components.js";
import "./style.scss";

//import "elbe-ui/elbe.scss";

export function App() {
  return <Home />;
}

render(<App />, document.getElementById("app"));
