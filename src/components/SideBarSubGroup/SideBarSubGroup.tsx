import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { Navbar } from "@consta/header/Navbar";
import {IAction} from "../../interfaces/IAction";

interface ISideBarSubGroup {
  groupTitle: string;
  actions: IAction[];
  onItemClick(item: IAction): void;
}

const SideBarSubGroup = observer((props: ISideBarSubGroup) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.SideBarSubGroup}>
      <div className={style.groupTitle}>{t(props.groupTitle)}</div>
      <Navbar onItemClick={props.onItemClick} items={props.actions} />
    </div>
  );
});

export default SideBarSubGroup;
