import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { SubGroupsActionsTypes, SubGroupsTypes } from "enums/SubGroupsTypes";
import SideBarSubGroup from "../SideBarSubGroup/SideBarSubGroup";
import { IconBento } from "@consta/icons/IconBento";
import { IconList } from "@consta/icons/IconList";
import { IconMail } from "@consta/icons/IconMail";
import { IconTrash } from "@consta/icons/IconTrash";

interface ISideBar {}

const SideBar = observer((props: ISideBar) => {
  const { t } = useTranslation("dict");

  const subGroups = [
    {
      name: SubGroupsTypes.Statistic,
      actions: [
        {
          label: t(SubGroupsActionsTypes.MainList),
          icon: IconBento,
          active: true,
        },
      ],
    },
    {
      name: SubGroupsTypes.Inspections,
      actions: [
        {
          label: t(SubGroupsActionsTypes.Completed),
          icon: IconList,
        },
        {
          label: t(SubGroupsActionsTypes.Sent),
          icon: IconMail,
        },
        {
          label: t(SubGroupsActionsTypes.Deleted),
          icon: IconTrash,
        },
      ],
    },
    {
      name: SubGroupsTypes.Information,
      actions: [
        {
          label: t(SubGroupsActionsTypes.BarriersCarts),
          icon: IconList,
        },

        {
          label: t(SubGroupsActionsTypes.BarriersApps),
          icon: IconMail,
        },
      ],
    },
  ];
  const [view, setView] = React.useState(SubGroupsActionsTypes.MainList);
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: SubGroupsActionsTypes,
  ) => {
    setView(nextView);
  };
  return (
    <div className={style.SideBar}>
      {subGroups.map((group) => (
        <SideBarSubGroup groupTitle={group.name} actions={group.actions} />
      ))}
    </div>
  );
});

export default SideBar;
