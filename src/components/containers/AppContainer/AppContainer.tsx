import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "locale";
import { observer } from "mobx-react";
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { Provider } from "mobx-react";
import { AppStore } from "stores/AppStore";
import { Responses404 } from "@consta/uikit/Responses404";

import { Route, Routes, useNavigate } from "react-router";
import { MainPage } from "pages/MainPage";
import { Button } from "@consta/uikit/Button";
export const AppContainer = observer(() => {
  const navigate = useNavigate();
  return (
    <Provider appStore={AppStore}>
      <Theme preset={presetGpnDefault}>
        <I18nextProvider i18n={i18n}>
          <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route
              path="*"
              element={
                <Responses404
                  actions={
                    <Button
                      onClick={() => navigate("/")}
                      view="ghost"
                      label="На главную"
                    />
                  }
                />
              }
            />
          </Routes>
        </I18nextProvider>
      </Theme>
    </Provider>
  );
});
