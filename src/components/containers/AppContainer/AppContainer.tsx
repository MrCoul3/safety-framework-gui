import React, { Suspense } from "react";
import { Loader } from "@consta/uikit/LoaderDeprecated";
import { I18nextProvider } from "react-i18next";
import i18n from "locale";
import { observer } from "mobx-react";
import { Router, Switch } from "react-router";
import { routes } from "routes";
import { mapRoutes } from "utils";
import { createBrowserHistory } from "history";
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";

const history = createBrowserHistory();
export const AppContainer = observer(() => {
  return (
    <Theme preset={presetGpnDefault}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader size="m" />}>
          <Router history={history}>
            <Switch>{mapRoutes(routes)}</Switch>
          </Router>
        </Suspense>
      </I18nextProvider>
    </Theme>
  );
});
