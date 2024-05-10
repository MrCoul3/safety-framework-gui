import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";
import SubHeader from "components/SubHeader/SubHeader";
import { useStore } from "hooks/useStore";
import { IAction } from "interfaces/IAction";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { Route, Routes, useNavigate } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import InspectionsTable from "../components/InspectionsTable/InspectionsTable";
import { ResponsesEmptyBox } from "@consta/uikit/ResponsesEmptyBox";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import { RoutesTypes } from "../enums/RoutesTypes";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";

interface IMainPage {}

export const MainPage = observer((props: IMainPage) => {
  const store = useStore();

  const { t } = useTranslation("dict");

  const navigate = useNavigate();

  const init = () => {
    store.mainPageStore.getInspectionsDev();
    getNewInspections();
  };
  useEffect(() => {
    init();
  }, []);
  const handleClearSearchValue = () => {};
  const handleSearch = () => {};

  const onItemClick = (item: IAction) => {
    store.mainPageStore.updateSubGroupsState(item.label);
    if (item.label === SubGroupsActionsTypes.MainList) {
      navigate(`/`);
      return;
    }
    navigate(`/${item.label}`);
  };

  const toHome = () => {
    store.mainPageStore.resetSideBarToHome();
    navigate(`/`);
  };

  const renderEmptyBoxPage = () => {
    return (
      <ResponsesEmptyBox
        actions={<Button onClick={toHome} view="ghost" label={t("toHome")} />}
      />
    );
  };

  const getNewInspections = () => {
    let localInspectionsParsed = [];
    const localInspections = localStorage.getItem(LOCAL_STORE_INSPECTIONS);
    if (localInspections) {
      localInspectionsParsed = JSON.parse(localInspections);
    }
    store.mainPageStore.setLocalInspections(localInspectionsParsed);
  };

  const contentRoutes = () => {
    return (
      <Routes>
        <Route
          element={
            <DashBoard
              localInspections={store.mainPageStore.localInspections}
              data={store.mainPageStore.inspections}
            />
          }
          path="/"
        />
        <Route
          element={
            store.mainPageStore.localInspections.length ? (
              <InspectionsTable
                inspections={store.mainPageStore.localInspections}
              />
            ) : (
              <ResponsesNothingFound
                title={t('emptyNewInspections')}
                description={" "}
                actions={<Button onClick={toHome} view="ghost" label={t("toHome")} />}
              />
            )
          }
          path={SubGroupsActionsTypes.NewInspections}
        />
        <Route
          element={
            <InspectionsTable inspections={store.mainPageStore.inspections} />
          }
          path={SubGroupsActionsTypes.Sent}
        />
        <Route
          element={renderEmptyBoxPage()}
          path={SubGroupsActionsTypes.BarriersCarts}
        />
        <Route
          element={renderEmptyBoxPage()}
          path={SubGroupsActionsTypes.BarriersApps}
        />
      </Routes>
    );
  };

  const handleAddInspection = () => {
    navigate(RoutesTypes.NewInspection);
  };

  return (
    <div>
      <MainPageLayout
        sideBar={
          <SideBar
            onItemClick={onItemClick}
            subGroupsState={store.mainPageStore.subGroupsState}
          />
        }
        contentHeader={<SubHeader handleAddInspection={handleAddInspection} />}
        content={contentRoutes()}
      />
    </div>
  );
});
