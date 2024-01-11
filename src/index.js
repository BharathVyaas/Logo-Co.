import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { UserAccountDetailsProvider } from "./context/UserAccountDetailsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserAccountDetailsProvider>
      <App />
    </UserAccountDetailsProvider>
  </BrowserRouter>
);
