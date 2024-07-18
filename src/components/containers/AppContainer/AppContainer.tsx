import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Responses404 } from "@consta/uikit/Responses404";
import { Route, Routes, useNavigate } from "react-router";
import { MainPage } from "pages/MainPage";
import { Button } from "@consta/uikit/Button";
import MainHeader from "../../MainHeader/MainHeader";
import { useStore } from "../../../hooks/useStore";
import { useTranslation } from "react-i18next";
import { RoutesTypes } from "../../../enums/RoutesTypes";
import InspectionPage from "../../../pages/InspectionPage";
import { SubGroupsActionsTypes } from "../../../enums/SubGroupsTypes";
import PassportsPage from "../../../pages/PassportsPage";
import BarriersPage from "../../../pages/BarriersPage/BarriersPage";
import EmptyBoxPage from "../../EmptyBoxPage/EmptyBoxPage";
import FreeFormPage from "../../../pages/FreeFormPage";
import SnackBarCustom from "../../SnackBarCustom/SnackBarCustom";
import { Responses403 } from "@consta/uikit/Responses403";
import style from "./style.module.css";
import { Responses500 } from "@consta/uikit/Responses500";
import { Responses503 } from "@consta/uikit/Responses503";
import { isDevelop } from "../../../constants/config";
import LoaderPage from "../../LoaderPage/LoaderPage";
import EliminationOfViolationsPage from "../../../pages/EliminationOfViolationsPage";
import DashboardPage from "../../../pages/DashboardPage";
export const AppContainer = observer(() => {
  const { t } = useTranslation("dict");

  const navigate = useNavigate();

  const store = useStore();

  const init = async () => {
    await store.mainPageStore.getMemberInfo();
  };

  const getSideBarState = () => {
    const path = decodeURIComponent(window.location.pathname).replace("/", "");
    if (path) {
      store.mainPageStore.updateSubGroupsState(path as SubGroupsActionsTypes);
    } else {
      store.mainPageStore.resetSideBarToHome();
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getSideBarState();
  }, [window.location.pathname]);

  const toHome = () => {
    store.mainPageStore.resetSideBarToHome();
    navigate(`/`);
  };

  const render404 = () => (
    <div className={style.container}>
      <Responses404
        actions={<Button onClick={toHome} view="ghost" label={t("toHome")} />}
      />{" "}
    </div>
  );
  const render403 = () => (
    <div className={style.container}>
      <Responses403
        actions={<Button onClick={toHome} view="ghost" label={t("toHome")} />}
      />
    </div>
  );
  const render500 = () => (
    <div className={style.container}>
      <Responses500 actions={" "} />
    </div>
  );
  const render503 = () => (
    <div className={style.container}>
      <Responses503 actions={" "} />
    </div>
  );
  const renderResponses = () => {
    if (store.loaderStore.loader === "wait") {
      return <LoaderPage info={t("auth")} />;
    } else {
      if (store.mainPageStore.responseStatus === 403) {
        return render403();
      }
      if (store.mainPageStore.responseStatus === 404) {
        return render404();
      }
      if (store.mainPageStore.responseStatus === 503) {
        return render503();
      }
      return render500();
    }
  };
  return (
    <>
      <MainHeader
        handleLogoClick={toHome}
        login={store.mainPageStore.login?.login}
        info={store.mainPageStore.login?.title}
      />
      {store.mainPageStore.login ? (
        <>
          <SnackBarCustom
            onItemClose={() => store.snackBarStore.clearSnackBar()}
            item={store.snackBarStore.snackBarItem}
          />
          <Routes>
            <Route index element={<MainPage />} />

            <Route path={"/*"} element={<MainPage />} />

            <Route
              element={
                store.mainPageStore.isAllowedToUseViolationsResolve ? (
                  <EliminationOfViolationsPage />
                ) : (
                  render403()
                )
              }
              path={SubGroupsActionsTypes.EliminationOfViolations}
            />

            <Route
              path={RoutesTypes.NewInspection}
              element={<InspectionPage />}
            />
            <Route
              path={RoutesTypes.EditInspection + "/:editInspectionId"}
              element={<InspectionPage />}
            />
            <Route
              path={RoutesTypes.EditLocalInspection + "/:editInspectionId"}
              element={<InspectionPage />}
            />

            <Route
              path={
                RoutesTypes.EditInspection +
                "/:editInspectionId/" +
                RoutesTypes.Passports
              }
              element={<PassportsPage />}
            />
            <Route
              path={
                RoutesTypes.EditLocalInspection +
                "/:editInspectionId/" +
                RoutesTypes.Passports
              }
              element={<PassportsPage />}
            />
            <Route
              path={RoutesTypes.NewInspection + "/" + RoutesTypes.Passports}
              element={<PassportsPage />}
            />

            <Route
              path={
                RoutesTypes.NewInspection +
                "/" +
                RoutesTypes.Passports +
                "/" +
                RoutesTypes.Barriers +
                "/:passportId"
              }
              element={<BarriersPage />}
            />

            <Route
              path={
                RoutesTypes.EditInspection +
                "/:editInspectionId/" +
                RoutesTypes.Passports +
                "/" +
                RoutesTypes.Barriers +
                "/:passportId"
              }
              element={<BarriersPage />}
            />

            <Route
              path={
                RoutesTypes.EditLocalInspection +
                "/:editInspectionId/" +
                RoutesTypes.Passports +
                "/" +
                RoutesTypes.Barriers +
                "/:passportId"
              }
              element={<BarriersPage />}
            />

            <Route
              path={RoutesTypes.NewInspection + "/" + RoutesTypes.FreeForm}
              element={<FreeFormPage />}
            />
            <Route
              path={
                RoutesTypes.EditInspection +
                "/:editInspectionId" +
                "/" +
                RoutesTypes.FreeForm
              }
              element={<FreeFormPage />}
            />
            <Route
              path={
                RoutesTypes.EditLocalInspection +
                "/:editInspectionId" +
                "/" +
                RoutesTypes.FreeForm
              }
              element={<FreeFormPage />}
            />
            {/*BarriersCarts and BarriersApps on main page*/}
            <Route
              element={<EmptyBoxPage maxHeight />}
              path={SubGroupsActionsTypes.BarriersCarts}
            />
            <Route
              element={<EmptyBoxPage maxHeight />}
              path={SubGroupsActionsTypes.BarriersApps}
            />

            <Route path={RoutesTypes.DashBoard} element={<DashboardPage />} />
          </Routes>
        </>
      ) : (
        renderResponses()
      )}
    </>
  );
});
