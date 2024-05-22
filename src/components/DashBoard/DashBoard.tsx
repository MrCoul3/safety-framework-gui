import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { useTranslation } from "react-i18next";
import { IInspection } from "../../interfaces/IInspection";
import classNames from "classnames";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { toJS } from "mobx";
import InspectionCard from "../InspectionCard/InspectionCard";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";

interface IDashBoard {
  inspections: IInspection[];
  localInspections: IInspection[];
  handleEditInspection(id: string): void;
  handleEditLocalInspection(id: string): void;
  handleDeleteSentButtonClick(id: string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
}

interface IInspectionGroupHeader {
  subGroup: SubGroupsActionsTypes;
}

const InspectionGroupHeader = (props: IInspectionGroupHeader) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.inspectionGroupHeader}>
      {t(props.subGroup)}
      {/*<div className={style.flexRow}>
        <Button view="clear" form="round" iconRight={IconMeatball} onlyIcon />
        {props.subGroup === SubGroupsActionsTypes.NewInspections && (
          <Button size="s" form="round" iconRight={IconAdd} onlyIcon />
        )}
      </div>*/}
    </div>
  );
};

const DashBoard = observer((props: IDashBoard) => {
  const { t } = useTranslation("dict");

  const subGroups = [
    SubGroupsActionsTypes.NewInspections,
    SubGroupsActionsTypes.Sent,
  ];
  const handleDeleteButtonClick = (
    subGroup: SubGroupsActionsTypes,
    id: string,
  ) => {
    if (sentCondition(subGroup)) {
      props.handleDeleteSentButtonClick(id);
    }
    if (newInspectionCondition(subGroup)) {
      props.handleDeleteNewInspectionButtonClick(id);
    }
  };

  const sentCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.Sent;
  const newInspectionCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.NewInspections;

  return (
    <div className={style.DashBoard}>
      {subGroups.map((subGroup) => (
        <div
          key={subGroup}
          className={classNames(style.inspectionGroup, {
            [style.newGroup]: newInspectionCondition(subGroup),
            [style.sentGroup]: sentCondition(subGroup),
          })}
        >
          <InspectionGroupHeader key={subGroup} subGroup={subGroup} />
          <div
            key={subGroup}
            className={classNames(style.cardContainer, {
              [style.cardContainerForNewGroup]:
                newInspectionCondition(subGroup) || !props.inspections.length,
            })}
          >
            {(sentCondition(subGroup)
              ? props.inspections
              : props.localInspections
            ).length ? (
              (sentCondition(subGroup)
                ? props.inspections
                : props.localInspections
              ).map((item, index) => (
                <InspectionCard
                  handleDeleteButtonClick={(id: string) =>
                    handleDeleteButtonClick(subGroup, id)
                  }
                  handleEditButtonClick={
                    sentCondition(subGroup)
                      ? props.handleEditInspection
                      : props.handleEditLocalInspection
                  }
                  id={item.id}
                  key={item.id}
                  subGroup={subGroup}
                  checkVerifyDate={item[InspectionFormTypes.AuditDate]}
                  oilfield={item[InspectionFormTypes.OilField]?.title}
                  doObject={item[InspectionFormTypes.DoObject]?.title}
                  contractor={item[InspectionFormTypes.Contractor]?.title}
                  contractorStruct={
                    item[InspectionFormTypes.ContractorStruct]?.title
                  }
                  inspectionType={
                    item[InspectionFormTypes.InspectionType]?.title
                  }
                  inspectionForm={item[InspectionFormTypes.InspectionForm]}
                  index={newInspectionCondition(subGroup) && index + 1}
                />
              ))
            ) : (
              <ResponsesNothingFound
                title={
                  sentCondition(subGroup)
                    ? t("emptySentInspections")
                    : t("emptyNewInspections")
                }
                description={" "}
                actions={" "}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default DashBoard;
