import React, { ReactNode, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsActionsTypes } from "enums/SubGroupsTypes";
import { useTranslation } from "react-i18next";
import { IInspection } from "../../interfaces/IInspection";
import classNames from "classnames";
import InfiniteScroll from "react-infinite-scroller";
import { ProgressSpin } from "@consta/uikit/ProgressSpin";

import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";
import NothingFound from "../NothingFound/NothingFound";

interface IDashBoard {
  inspections: IInspection[];
  inspectionsCount: number | null;
  loader?: LoaderType;
  sentInspectionsContent: ReactNode;
  localInspectionsContent: ReactNode;
  localInspections: IInspection[];
  onScrollToBottom(): void;
  handleEditInspection(id: string): void;
  handleEditLocalInspection(id: string): void;
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

  const sentInspectionsCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.Sent;
  const newInspectionCondition = (subGroup: SubGroupsActionsTypes) =>
    subGroup === SubGroupsActionsTypes.NewInspections;

  const renderLoader = (subGroup: SubGroupsActionsTypes) => {
    if (props.loader === "wait") {
      return <LoaderPage />;
    } else {
      return (
        <NothingFound
          info={
            sentInspectionsCondition(subGroup)
              ? t("emptySentInspections")
              : t("emptyNewInspections")
          }
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
                  {props.sentInspectionsContent}
                </InfiniteScroll>
              ) : (
                renderLoader(subGroup)
              )
            ) : (
              props.localInspectionsContent
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default DashBoard;
