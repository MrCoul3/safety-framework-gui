import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";
import SubHeader from "components/SubHeader/SubHeader";
import { useStore } from "hooks/useStore";
import { IAction } from "interfaces/IAction";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import InspectionsTable from "../components/InspectionsTable/InspectionsTable";
import { ResponsesEmptyBox } from "@consta/uikit/ResponsesEmptyBox";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import { RoutesTypes } from "../enums/RoutesTypes";
import { LOCAL_STORE_INSPECTIONS } from "../constants/config";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";
import ConfirmDialog from "../components/ConfirmDialog/ConfirmDialog";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";

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

  const onItemClick = (item: IAction) => {
    store.mainPageStore.updateSubGroupsState(
      item.label as SubGroupsActionsTypes,
    );
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
  const handleEditInspection = (id: string) => {
    navigate(RoutesTypes.NewInspection + "/" + id);
  };
  const handleDeleteNewInspection = () => {
    if (deletingInspectionType) {
      store.inspectionStore.deleteInspectionFromLocalStorage(
        deletingInspectionType?.id,
      );
      getNewInspections();
    }
  };
  const handleDeleteSentInspection = () => {
    store.mainPageStore.getInspectionsDev();
  };

  const handleAddInspection = () => {
    navigate(RoutesTypes.NewInspection);
  };
  const handleDelete = (id: string, type: SubGroupsActionsTypes) => {
    setIsModalOpen(true);
    setDeletingInspectionType({
      type: type,
      id: id,
    });
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [deletingInspectionType, setDeletingInspectionType] = React.useState<{
    type: SubGroupsActionsTypes;
    id: string;
  }>();

  const handleOpenFilter = (field: InspectionFormTypes) => {
    store.inspectionStore.handleOpenField(field);
  };

  const contentRoutes = () => {
    return (
      <Routes>
        {/*Main page dashboard*/}
        <Route
          element={
            <DashBoard
              handleDeleteSentButtonClick={(id: string) => {
                handleDelete(id, SubGroupsActionsTypes.Sent);
              }}
              handleDeleteNewInspectionButtonClick={(id: string) => {
                handleDelete(id, SubGroupsActionsTypes.NewInspections);
              }}
              handleEditButtonClick={handleEditInspection}
              localInspections={store.mainPageStore.localInspections}
              data={store.mainPageStore.inspections}
            />
          }
          path="/"
        />
        {/*Sent and new inspections table on main page*/}
        <Route
          element={
            store.mainPageStore.localInspections.length ? (
              <InspectionsTable
                handleOpenFilter={handleOpenFilter}
                handleDeleteSentButtonClick={(id: string) => {
                  handleDelete(id, SubGroupsActionsTypes.Sent);
                }}
                handleDeleteNewInspectionButtonClick={(id: string) => {
                  handleDelete(id, SubGroupsActionsTypes.NewInspections);
                }}
                handleEditButtonClick={handleEditInspection}
                inspections={store.mainPageStore.localInspections}
              />
            ) : (
              <ResponsesNothingFound
                title={t("emptyNewInspections")}
                description={" "}
                actions={
                  <Button onClick={toHome} view="ghost" label={t("toHome")} />
                }
              />
            )
          }
          path={SubGroupsActionsTypes.NewInspections}
        />
        {/*Sent and new inspections table on main page*/}
        <Route
          element={
            store.mainPageStore.inspections.length ? (
              <InspectionsTable
                handleOpenFilter={handleOpenFilter}
                handleDeleteSentButtonClick={(id: string) => {
                  handleDelete(id, SubGroupsActionsTypes.Sent);
                }}
                handleDeleteNewInspectionButtonClick={(id: string) => {
                  handleDelete(id, SubGroupsActionsTypes.NewInspections);
                }}
                handleEditButtonClick={handleEditInspection}
                inspections={store.mainPageStore.inspections}
              />
            ) : (
              <ResponsesNothingFound
                title={t("emptySentInspections")}
                description={" "}
                actions={
                  <Button onClick={toHome} view="ghost" label={t("toHome")} />
                }
              />
            )
          }
          path={SubGroupsActionsTypes.Sent}
        />
        {/*BarriersCarts and BarriersApps on main page*/}
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
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("delete")}
        title={
          deletingInspectionType?.type === SubGroupsActionsTypes.Sent
            ? t("dialogDeleteSentInspection")
            : t("dialogDeleteNewInspection")
        }
        action={() =>
          deletingInspectionType?.type === SubGroupsActionsTypes.Sent
            ? handleDeleteSentInspection()
            : handleDeleteNewInspection()
        }
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </div>
  );
});
