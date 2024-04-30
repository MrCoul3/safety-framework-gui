import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { IconComponent } from "@consta/icons/Icon";
import { Navbar } from "@consta/header/Navbar";

interface IAction {
  label: string;
  active?: boolean;
  icon: IconComponent;
}
interface ISideBarSubGroup {
  groupTitle: string;
  actions: IAction[];
}

const SideBarSubGroup = observer((props: ISideBarSubGroup) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.SideBarSubGroup}>
      <div className={style.groupTitle}>{t(props.groupTitle)}</div>
      <Navbar items={props.actions} />
    </div>
  );
});

export default SideBarSubGroup;
