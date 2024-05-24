import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Navbar } from "@consta/header/Navbar";
import { IAction } from "../../interfaces/IAction";
import ItemGroupTitle from "../ItemGroupTitle/ItemGroupTitle";
import { useTranslation } from "react-i18next";

interface ISideBarSubGroup {
  groupTitle: string;
  actions: IAction[];
  onItemClick(item: IAction): void;
}

const SideBarSubGroup = observer((props: ISideBarSubGroup) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.SideBarSubGroup}>
      <ItemGroupTitle groupTitle={props.groupTitle} />
      <Navbar
        getItemLabel={(item) => t(item.label)}
        onItemClick={props.onItemClick}
        items={props.actions}
      />
    </div>
  );
});

export default SideBarSubGroup;
