import React from "react";
import { createRoot } from "react-dom/client";
import { apps, contexts } from "@neoco/neoco-backoffice";
import reportWebVitals from "./reportWebVitals";
import { headers } from "./pages";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <contexts.AuthProvider>
      <contexts.ConfigProvider>
        <apps.App
          headers={headers}
          config={{ router: { basename: "/neoadmin-demo" } }}
        />
      </contexts.ConfigProvider>
    </contexts.AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
