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
import { IInspection } from "../../interfaces/IInspection";

interface IDashBoard {
  data: IInspection[];
}

const DashBoard = observer((props: IDashBoard) => {
  const { t } = useTranslation("dict");

  const subGroups = [
    SubGroupsActionsTypes.NewInspections,
    SubGroupsActionsTypes.Sent,
  ];

  return (
    <div className={style.DashBoard}>
      {subGroups.map((subGroup) => (
        <div className={style.inspectionGroup}>
          <div className={style.inspectionGroupHeader}>
            {t(subGroup)}
            <div className={style.flexRow}>
              <Button
                view="clear"
                form="round"
                iconRight={IconMeatball}
                onlyIcon
              />
              {subGroup === SubGroupsActionsTypes.NewInspections && (
                <Button size="s" form="round" iconRight={IconAdd} onlyIcon />
              )}
            </div>
          </div>
          {props.data.map((item) => (
            <InspectionCard
                subGroup={subGroup}
              field={item.field}
              inspectionType={item.inspectionType}
              name={`${t("inspection")} № ${item.inspectionNumber}`}
              doObject={item.doObject}
              checkVerifyDate={item.auditDate}
              checkEditedDate={item.editDate}
              checkEntity={item.checkEntity}
              status={item.status}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default DashBoard;
