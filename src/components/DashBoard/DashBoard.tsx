import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { useTranslation } from "react-i18next";
import { IconMeatball } from "@consta/icons/IconMeatball";
import { IconAdd } from "@consta/icons/IconAdd";
import { Button } from "@consta/uikit/Button";

interface IDashBoard {}

const DashBoard = observer((props: IDashBoard) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.DashBoard}>
      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Completed)}
            <div className={style.flexRow}>
                <Button view="clear" form="round" iconRight={IconMeatball} onlyIcon />
                <Button size="s" form="round" iconRight={IconAdd} onlyIcon />
            </div>
        </div>
      </div>

      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Sent)}
            <div className={style.flexRow}>
                <Button view="clear" form="round" iconRight={IconMeatball} onlyIcon />
            </div>
        </div>
      </div>
      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Deleted)}
            <div className={style.flexRow}>
                <Button view="clear" form="round" iconRight={IconMeatball} onlyIcon />
            </div>
        </div>
      </div>
    </div>
  );
});

export default DashBoard;
