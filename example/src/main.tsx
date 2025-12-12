import { renderElbe, Wouter } from "elbe-ui";
import { StrictMode } from "react";
import { App } from "./app";
import { ThemeBit } from "./util/b_theme";

renderElbe(
  <StrictMode>
    <ThemeBit.Provider>
      <Wouter.Router>
        <App />
      </Wouter.Router>
    </ThemeBit.Provider>
  </StrictMode>
);
