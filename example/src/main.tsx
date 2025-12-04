import { Wouter } from "elbe-ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { ThemeBit } from "./util/b_theme";

createRoot(document.getElementById("elbe-root")!).render(
  <StrictMode>
    <ThemeBit.Provider>
      <Wouter.Router>
        <App />
      </Wouter.Router>
    </ThemeBit.Provider>
  </StrictMode>
);
