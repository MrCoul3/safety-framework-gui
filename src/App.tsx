import React from "react";
import { AppContainer } from "./components/containers/AppContainer/AppContainer";
import { Provider } from "mobx-react";
import { AppStore } from "./stores/AppStore";
import { presetGpnDefault, Theme } from "@consta/uikit/Theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./locale";

export const App = () => (
  <Provider appStore={AppStore}>
    <Theme preset={presetGpnDefault}>
      <I18nextProvider i18n={i18n}>
        <AppContainer />
      </I18nextProvider>
    </Theme>
  </Provider>
);
