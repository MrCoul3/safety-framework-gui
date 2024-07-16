import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Provider } from "mobx-react";
import { AppStore } from "./stores/AppStore";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const store = new AppStore();

/** логи отключены в продакшн */

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.debug = () => {};
}

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
