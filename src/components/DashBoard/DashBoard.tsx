import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { useTranslation } from "react-i18next";
import { IconMeatball } from "@consta/icons/IconMeatball";
import { IconAdd } from "@consta/icons/IconAdd";
import { Button } from "@consta/uikit/Button";
import InspectionCard from "../InspectionCard/InspectionCard";
import { InspectionStatusesTypes } from "../../enums/InspectionStatusesTypes";
import { CheckEntityTypes } from "../../enums/CheckEntityTypes";

interface IDashBoard {}

const DashBoard = observer((props: IDashBoard) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.DashBoard}>
      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Completed)}
          <div className={style.flexRow}>
            <Button
              view="clear"
              form="round"
              iconRight={IconMeatball}
              onlyIcon
            />
            <Button size="s" form="round" iconRight={IconAdd} onlyIcon />
          </div>
        </div>
        <InspectionCard
          name={"Название инспекции"}
          doObject={'614 ПО - К. 614'}
          checkVerifyDate={"14.02.2024"}
          checkEditedDate={"16.02.2024"}
          checkEntity={CheckEntityTypes.Barriers}
          status={InspectionStatusesTypes.Success}
        />
      </div>

      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Sent)}
          <div className={style.flexRow}>
            <Button
              view="clear"
              form="round"
              iconRight={IconMeatball}
              onlyIcon
            />
          </div>
        </div>
      </div>
      <div className={style.inspectionGroup}>
        <div className={style.inspectionGroupHeader}>
          {t(SubGroupsActionsTypes.Deleted)}
          <div className={style.flexRow}>
            <Button
              view="clear"
              form="round"
              iconRight={IconMeatball}
              onlyIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DashBoard;
