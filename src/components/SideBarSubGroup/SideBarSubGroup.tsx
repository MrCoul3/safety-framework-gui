import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import ToggleButton from "@mui/material/ToggleButton";
interface ISideBarSubGroup {
  groupTitle: string;
  actions: { name: string; icon: ReactNode }[];
}

const SideBarSubGroup = observer((props: ISideBarSubGroup) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.SideBarSubGroup}>
      <div className={style.groupTitle}>{t(props.groupTitle)}</div>
        {props.actions.map((action) => (
          <ToggleButton
            className={style.button}
            value={action.name}
            aria-label="list"
          >
            {action.icon}
            <span className={style.menuElement}>{t(action.name)}</span>
          </ToggleButton>
        ))}
    </div>
  );
});

export default SideBarSubGroup;
