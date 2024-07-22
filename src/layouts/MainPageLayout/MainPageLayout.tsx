import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";

interface IMainPageLayout {
  sideBar: ReactNode;
  contentHeader: ReactNode;
  content: ReactNode;
}

const MainPageLayout = observer((props: IMainPageLayout) => {
  return (
    <div className={style.MainPageLayout}>
      <div className={style.flexRow}>
        {props.sideBar}
        <div className={style.flexCol}>
          {props.contentHeader}
          {props.content}
        </div>
      </div>
    </div>
  );
});

export default MainPageLayout;
