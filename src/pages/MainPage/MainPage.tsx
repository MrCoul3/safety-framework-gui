import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainHeader from "components/MainHeader/MainHeader";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";
import SubHeader from "components/SubHeader/SubHeader";
import DashBoard from "components/DashBoard/DashBoard";
import { useStore } from "hooks/useStore";
import { IAction } from "../../interfaces/IAction";
import { Route, Switch } from "react-router";
import { IBrowserRoute } from "../../interfaces/common/IBrowserRoute";
import { mapRoutes } from "../../utils";
import { routes } from "../../routes";

interface IMainPage {}

const MainPage = observer((props: IMainPage) => {
  const store = useStore();

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
  };

  const routes = () => (
    <>
      <Route exact path="/">
        <DashBoard data={store.mainPageStore.inspections} />
      </Route>
      <Route path="/table">
        <div>table</div>
      </Route>
    </>
  );

  return (
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
      content={routes()}
    />
  );
});

export default MainPage;
