import React from "react";
import { observer } from "mobx-react-lite";
import MainHeader from "../../components/MainHeader/MainHeader";

interface IMainPage {}

const MainPage = observer((props: IMainPage) => {
  return (
    <div>
      <MainHeader />
    </div>
  );
});

export default MainPage;
