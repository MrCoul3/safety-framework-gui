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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ISideBar {}

const SideBar = observer((props: ISideBar) => {
  const { t } = useTranslation("dict");

  const subGroups = [
    {
      name: SubGroupsTypes.Statistic,
      actions: [
        {
          name: SubGroupsActionsTypes.MainList,
          icon: <IconBento className={style.icon} />,
        },
      ],
    },
    {
      name: SubGroupsTypes.Inspections,
      actions: [
        {
          name: SubGroupsActionsTypes.Completed,
          icon: <IconList className={style.icon} />,
        },
        {
          name: SubGroupsActionsTypes.Sent,
          icon: <IconMail className={style.icon} />,
        },
        {
          name: SubGroupsActionsTypes.Deleted,
          icon: <IconTrash className={style.icon} />,
        },
      ],
    },
    {
      name: SubGroupsTypes.Information,
      actions: [
        {
          name: SubGroupsActionsTypes.BarriersCarts,
          icon: <IconList className={style.icon} />,
        },

        {
          name: SubGroupsActionsTypes.BarriersApps,
          icon: <IconMail className={style.icon} />,
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
      <ToggleButtonGroup
          className={style.buttonGroup}
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
      >
        {subGroups.map((group) => (
            <SideBarSubGroup groupTitle={group.name} actions={group.actions} />
        ))}
      </ToggleButtonGroup>

    </div>
  );
});

export default SideBar;
