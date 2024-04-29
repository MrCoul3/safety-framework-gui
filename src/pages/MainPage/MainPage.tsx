import React from "react";
import { observer } from "mobx-react-lite";
import MainHeader from "../../components/MainHeader/MainHeader";
import { useTranslation } from "react-i18next";

interface IMainPage {}

const MainPage = observer((props: IMainPage) => {
    const { t } = useTranslation('dict');

  const handleClearSearchValue = () => {};
  const handleSearch = () => {};
  return (
    <div>
      <MainHeader
        searchValue={""}
        handleInput={handleSearch}
        handleClearSearchValue={handleClearSearchValue}
      />
    </div>
  );
});

export default MainPage;
