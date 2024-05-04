import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainHeader from "components/MainHeader/MainHeader";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";
import SubHeader from "components/SubHeader/SubHeader";
import { useStore } from "hooks/useStore";
import { IAction } from "interfaces/IAction";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { Route, Routes, useNavigate } from "react-router";
import DashBoard from "../components/DashBoard/DashBoard";
import InspectionsTable from "../components/InspectionsTable/InspectionsTable";

interface IMainPage {}

export const MainPage = observer((props: IMainPage) => {
  const store = useStore();
  const navigate = useNavigate();
  const init = () => {
    store.mainPageStore.getInspectionsDev();
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

  const contentRoutes = () => {
    return (
      <Routes>
        <Route
          element={<DashBoard data={store.mainPageStore.inspections} />}
          path="/"
        />
        <Route
          element={
            <InspectionsTable inspections={store.mainPageStore.inspections} />
          }
          path={SubGroupsActionsTypes.NewInspections}
        />
      </Routes>
    );
  };

  return (
    <div>
      <MainPageLayout
        header={
          <MainHeader
            searchValue={""}
            handleInput={handleSearch}
            handleClearSearchValue={handleClearSearchValue}
          />
        }
        sideBar={
          <SideBar
            onItemClick={onItemClick}
            subGroupsState={store.mainPageStore.subGroupsState}
          />
        }
        contentHeader={<SubHeader />}
        content={contentRoutes()}
      />
    </div>
  );
});
