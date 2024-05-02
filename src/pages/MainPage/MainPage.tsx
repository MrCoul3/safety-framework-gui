import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainHeader from "components/MainHeader/MainHeader";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";
import SubHeader from "components/SubHeader/SubHeader";
import DashBoard from "components/DashBoard/DashBoard";
import { useStore } from "hooks/useStore";

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
  return (
    <MainPageLayout
      header={
        <MainHeader
          searchValue={""}
          handleInput={handleSearch}
          handleClearSearchValue={handleClearSearchValue}
        />
      }
      sideBar={<SideBar />}
      contentHeader={<SubHeader />}
      content={<DashBoard data={store.mainPageStore.inspections} />}
    />
  );
});

export default MainPage;
