import React from "react";
import { observer } from "mobx-react-lite";
import SideBar from "components/SideBar/SideBar";
import MainHeader from "components/MainHeader/MainHeader";
import MainPageLayout from "layouts/MainPageLayout/MainPageLayout";

interface IMainPage {}

const MainPage = observer((props: IMainPage) => {
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
      contentHeader={""}
      content={""}
    />
  );
});

export default MainPage;
