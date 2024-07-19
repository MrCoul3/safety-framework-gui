import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import SideBarSubGroup from "../SideBarSubGroup/SideBarSubGroup";
import { IAction } from "../../interfaces/IAction";
import { ISubGroupState } from "../../interfaces/ISubGroupState";
import { DASHBOARD_URL } from "../../constants/constants";

interface ISideBar {
  onItemClick(item: IAction): void;

  subGroupsState: ISubGroupState[];
}

const SideBar = observer((props: ISideBar) => {
  const onItemClick = (item: IAction) => {
    if (item.label === SubGroupsActionsTypes.DashBoard) {
      window.open(DASHBOARD_URL, "_blank")?.focus();
      return;
    }
    props.onItemClick(item);
  };
  return (
    <div className={style.SideBar}>
      {props.subGroupsState.map((group: ISubGroupState) => (
        <SideBarSubGroup
          key={group.name}
          onItemClick={onItemClick}
          groupTitle={group.name}
          actions={group.actions}
        />
      ))}
    </div>
  );
});

export default SideBar;
