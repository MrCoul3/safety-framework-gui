import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { useTranslation } from "react-i18next";
import { IInspection } from "../../interfaces/IInspection";
import classNames from "classnames";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import InspectionCard from "../InspectionCard/InspectionCard";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";
import InfiniteScroll from "react-infinite-scroller";
import { ProgressSpin } from "@consta/uikit/ProgressSpin";

import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";

interface IDashBoard {
  inspections: IInspection[];
  inspectionsCount: number | null;

  loader?: LoaderType;

  localInspections: IInspection[];
  onScrollToBottom(): void;
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
    if (sentInspectionsCondition(subGroup)) {
      props.handleDeleteSentButtonClick(id);
    }
    if (newInspectionCondition(subGroup)) {
      props.handleDeleteNewInspectionButtonClick(id);
    }
  };

  const sentInspectionsCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.Sent;
  const newInspectionCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.NewInspections;

  const renderContent = (
    subGroup: SubGroupsActionsTypes,
    data: IInspection[],
  ) => {
    return data.length ? (
      data.map((item, index) => (
        <InspectionCard
          handleDeleteButtonClick={(id: string) =>
            handleDeleteButtonClick(subGroup, id)
          }
          handleEditButtonClick={
            sentInspectionsCondition(subGroup)
              ? props.handleEditInspection
              : props.handleEditLocalInspection
          }
          id={item.id ?? ""}
          key={item.id}
          subGroup={subGroup}
          checkVerifyDate={item[InspectionFormTypes.AuditDate]}
          oilfield={item[InspectionFormTypes.OilField]?.title}
          doObject={item[InspectionFormTypes.DoObject]?.title}
          contractor={item[InspectionFormTypes.Contractor]?.title}
          contractorStruct={item[InspectionFormTypes.ContractorStruct]?.title}
          inspectionType={item[InspectionFormTypes.InspectionType]?.title}
          inspectionForm={item[InspectionFormTypes.InspectionForm]}
          index={newInspectionCondition(subGroup) && index + 1}
        />
      ))
    ) : (
      <ResponsesNothingFound
        title={
          sentInspectionsCondition(subGroup)
            ? t("emptySentInspections")
            : t("emptyNewInspections")
        }
        description={" "}
        actions={" "}
      />
    );
  };

  const renderLoader = (subGroup: SubGroupsActionsTypes) => {
    if (props.loader === "wait") {
      return <LoaderPage />;
    } else {
      return (
        <ResponsesNothingFound
          title={
            sentInspectionsCondition(subGroup)
              ? t("emptySentInspections")
              : t("emptyNewInspections")
          }
          description={" "}
          actions={" "}
        />
      );
    }
  };

  return (
    <div className={style.DashBoard}>
      {subGroups.map((subGroup, index) => (
        <div
          key={index}
          className={classNames(style.inspectionGroup, {
            [style.newGroup]: newInspectionCondition(subGroup),
            [style.sentGroup]: sentInspectionsCondition(subGroup),
          })}
        >
          <InspectionGroupHeader key={index} subGroup={subGroup} />

          <div
            key={subGroup}
            className={classNames(style.cardContainer, {
              [style.cardContainerForNewGroup]:
                newInspectionCondition(subGroup) || !props.inspections.length,
            })}
          >
            {sentInspectionsCondition(subGroup) ? (
              props.inspections.length ? (
                <InfiniteScroll
                  pageStart={0}
                  hasMore={
                    props.inspectionsCount
                      ? props.inspectionsCount > props.inspections.length
                      : true
                  }
                  threshold={500}
                  useWindow={false}
                  className={style.virtualScrollWrap}
                  loadMore={() => props.onScrollToBottom()}
                  loader={<ProgressSpin key={0} size="m" />}
                >
                  {renderContent(subGroup, props.inspections)}
                </InfiniteScroll>
              ) : (
                renderLoader(subGroup)
              )
            ) : (
              renderContent(subGroup, props.localInspections)
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default DashBoard;
