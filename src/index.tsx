import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { observer, Provider, useLocalObservable } from "mobx-react";
import { AppStore } from "./stores/AppStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const store = new AppStore();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
