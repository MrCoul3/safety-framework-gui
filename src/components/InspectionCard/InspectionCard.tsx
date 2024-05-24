import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconAllDone } from "@consta/icons/IconAllDone";
import { IconTrash } from "@consta/icons/IconTrash";
import { IconMail } from "@consta/icons/IconMail";
import { IconRevert } from "@consta/icons/IconRevert";
import { IconEdit } from "@consta/icons/IconEdit";
import { Card } from "@consta/uikit/Card";
import { Badge } from "@consta/uikit/Badge";
import { Button } from "@consta/uikit/Button";
import { CheckEntityTypes } from "enums/CheckEntityTypes";
import { InspectionStatusesTypes } from "enums/InspectionStatusesTypes";
import moment from "moment";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { IEntity } from "../../interfaces/IInspection";

interface IInspectionCard {
  id: string;
  name?: string;
  doStruct?: string;
  checkVerifyDate?: Date;
  inspectionType?: string;
  oilfield?: string;
  doObject?: string;
  contractor?: string;
  contractorStruct?: string;
  index?: number | boolean;
  inspectionForm?: string;
  subGroup?: SubGroupsActionsTypes;
  handleEditButtonClick(id: string): void;
  handleDeleteButtonClick(id: string): void;
}

const InspectionCard = observer((props: IInspectionCard) => {
  const { t } = useTranslation("dict");
  // const successCond = () => props.status === InspectionStatusesTypes.Success;
  // const awaitCond = () => props.status === InspectionStatusesTypes.Warning;
  // const errorCond = () => props.status === InspectionStatusesTypes.Error;
  const getDate = (date?: Date) =>
    date ? moment(date).format("DD.MM.YYYY") : t("noFilled");
  const getValue = (value?: string) => (value ? value : t("noFilled"));

  return (
    <Card
      className={classNames(style.card, {
        [style.sentCard]: props.subGroup === SubGroupsActionsTypes.Sent,
        // [style.await]: awaitCond(),
        // [style.error]: errorCond(),
      })}
      verticalSpace="xs"
      horizontalSpace="xs"
    >
      {/* {props.status && (
        <Badge
          form="round"
          iconLeft={IconAllDone}
          status={props.status}
          label={t(props.status ?? "")}
        />
      )}*/}

      <div className={style.title}>
        {props.index && t("inspectionName") + props.index}
        {props.id && t("inspectionName") + props.id}
        <Button
          onClick={() =>
            props.handleDeleteButtonClick(
              props.index ? props.index.toString() : props.id.toString(),
            )
          }
          iconSize="s"
          form="round"
          view="clear"
          iconLeft={IconTrash}
          onlyIcon
        />
      </div>
      <div className={style.checkDates}>
        <div className={style.checkDate}>
          <span className={style.blueColor}>{t("checkVerifyDate")} </span>
          <span className={style.value}>{getDate(props.checkVerifyDate)}</span>
        </div>
        {/*<div className={style.checkDate}>
          {t("checkEditedDate")}
          <span className={style.value}> {getDate(props.checkEditedDate)}</span>
        </div>*/}
      </div>
      <div className={style.checkDetails}>
        <span className={style.checkDetailsTitle}>{t("checkDetails")}</span>
        <div className={style.badgeGroup}>
          <Badge
            status="system"
            label={t(props.inspectionForm ?? t("noFilled"))}
          />
          {/* <Badge
            view="stroked"
            status="system"
            label={t(props.doStruct ?? "")}
          />*/}
        </div>
        <div className={style.extraInfo}>
          {/*<div className={style.extraInfoValue}>
            {t("inspectionType")}
            <span className={style.value}> {props.inspectionType}</span>
          </div>*/}
          <div className={style.extraInfoValue}>
            {t(InspectionFormTypes.OilField)}
            <span className={style.value}> {getValue(props.oilfield)}</span>
          </div>

          <div className={style.extraInfoValue}>
            {t(InspectionFormTypes.DoObject)}
            <span className={style.value}> {getValue(props.doObject)}</span>
          </div>
          <div className={style.extraInfoValue}>
            {t(InspectionFormTypes.Contractor)}
            <span className={style.value}> {getValue(props.contractor)}</span>
          </div>
          <div className={style.extraInfoValue}>
            {t(InspectionFormTypes.ContractorStruct)}
            <span className={style.value}>
              {" "}
              {getValue(props.contractorStruct)}
            </span>
          </div>
        </div>
      </div>
      <div className={style.controlButtonGroup}>
        {props.subGroup === SubGroupsActionsTypes.NewInspections && (
          <Button
            size={"s"}
            iconSize="s"
            view="secondary"
            label={t("send")}
            iconLeft={IconMail}
          />
        )}
        <Button
          onClick={() =>
            props.handleEditButtonClick(
              props.index ? props.index.toString() : props.id.toString(),
            )
          }
          size={"s"}
          className={style.editButton}
          iconSize="s"
          label={t("edit")}
          iconLeft={IconEdit}
        />
      </div>
    </Card>
  );
});

export default InspectionCard;
