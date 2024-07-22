import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconTrash } from "@consta/icons/IconTrash";
import { IconMail } from "@consta/icons/IconMail";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconEye } from "@consta/icons/IconEye";
import { Card } from "@consta/uikit/Card";
import { Badge } from "@consta/uikit/Badge";
import { Button } from "@consta/uikit/Button";
import moment from "moment";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";

interface IInspectionCard {
  id: string;
  name?: string;
  doStruct?: string;
  checkVerifyDate?: Date;
  inspectionType?: string;
  oilfield?: string;
  doObject?: string;
  contractor?: string;
  isReadyToSend?: boolean;
  contractorStruct?: string;
  index: number | boolean;
  inspectionForm?: string;
  subGroup: SubGroupsActionsTypes;
  handleEditButtonClick(id: string): void;
  handleDeleteButtonClick(id: string, subGroup: SubGroupsActionsTypes): void;
  sendInspection(index: number): void;
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
        [style.await]:
          !props.isReadyToSend &&
          props.subGroup === SubGroupsActionsTypes.NewInspections,
        [style.success]:
          props.isReadyToSend &&
          props.subGroup === SubGroupsActionsTypes.NewInspections,
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
        {props.id
          ? props.id && t("inspectionName") + props.id
          : props.index && t("inspectionName") + props.index}

        {props.subGroup === SubGroupsActionsTypes.NewInspections && (
          <Button
            onClick={() =>
              props.handleDeleteButtonClick(
                props.id ? props.id.toString() : props.index.toString(),
                props.subGroup,
              )
            }
            iconSize="s"
            form="round"
            view="clear"
            iconLeft={IconTrash}
            onlyIcon
          />
        )}
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
            disabled={!props.isReadyToSend}
            onClick={() =>
              props.index ? props.sendInspection(props.index as number) : ""
            }
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
              props.id ? props.id.toString() : props.index.toString(),
            )
          }
          size={"s"}
          className={style.editButton}
          iconSize="s"
          label={t(
            props.subGroup === SubGroupsActionsTypes.Sent ? "view" : "edit",
          )}
          iconLeft={
            props.subGroup === SubGroupsActionsTypes.Sent ? IconEye : IconEdit
          }
        />
      </div>
    </Card>
  );
});

export default InspectionCard;
