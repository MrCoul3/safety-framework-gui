import React, {useState} from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { SubGroupsActionsTypes, SubGroupsTypes } from "enums/SubGroupsTypes";
import SideBarSubGroup from "../SideBarSubGroup/SideBarSubGroup";
import { IconBento } from "@consta/icons/IconBento";
import { IconList } from "@consta/icons/IconList";
import { IconMail } from "@consta/icons/IconMail";
import { IconTrash } from "@consta/icons/IconTrash";
import {IAction} from "../../interfaces/IAction";
import {ISubGroupState} from "../../interfaces/ISubGroupState";

interface ISideBar {
  onItemClick(item: IAction): void;

  subGroupsState: ISubGroupState[]
}

const SideBar = observer((props: ISideBar) => {
  return (
    <div className={style.SideBar}>
      {props.subGroupsState.map((group: ISubGroupState) => (
        <SideBarSubGroup
          key={group.name}
          onItemClick={props.onItemClick}
          groupTitle={group.name}
          actions={group.actions}
        />
      ))}
    </div>
  );
});

export default SideBar;
