import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MultisigContextProvider } from "./context/MultisigContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme appearance="dark">
      <MultisigContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </MultisigContextProvider>
    </Theme>
  </StrictMode>
);
