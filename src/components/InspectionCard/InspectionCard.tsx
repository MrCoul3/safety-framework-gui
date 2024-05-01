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

interface IInspectionCard {
  name?: string;
  doObject?: string;
  checkVerifyDate?: number;
  checkEditedDate?: number;
  inspectionType?: string;
  field?: string;
  checkEntity?: CheckEntityTypes;
  status?: InspectionStatusesTypes;
  subGroup?: SubGroupsActionsTypes;
}

const InspectionCard = observer((props: IInspectionCard) => {
  const { t } = useTranslation("dict");
  const successCond = () => props.status === InspectionStatusesTypes.Success;
  const awaitCond = () => props.status === InspectionStatusesTypes.Warning;
  const errorCond = () => props.status === InspectionStatusesTypes.Error;
  const getDate = (date?: number) => moment(date).format("DD.MM.YYYY");

  return (
    <Card
      className={classNames(style.card, {
        [style.success]: successCond(),
        [style.await]: awaitCond(),
        [style.error]: errorCond(),
      })}
      verticalSpace="xs"
      horizontalSpace="xs"
    >
      <Badge
        form="round"
        iconLeft={IconAllDone}
        status={props.status}
        label={t(props.status ?? "")}
      />
      <div className={style.title}>
        {props.name}
        <Button
          iconSize="s"
          form="round"
          view="clear"
          iconLeft={IconTrash}
          onlyIcon
        />
      </div>
      <div className={style.separator} />
      <div className={style.checkDates}>
        <div className={style.checkDate}>
          <span className={style.blueColor}>{t("checkVerifyDate")} </span>
          <span className={style.value}>{getDate(props.checkVerifyDate)}</span>
        </div>
        <div className={style.checkDate}>
          {t("checkEditedDate")}
          <span className={style.value}> {getDate(props.checkEditedDate)}</span>
        </div>
      </div>
      <div className={style.checkDetails}>
        <span className={style.checkDetailsTitle}>{t("checkDetails")}</span>
        <div className={style.badgeGroup}>
          <Badge status="system" label={t(props.checkEntity ?? "")} />
          <Badge
            view="stroked"
            status="system"
            label={t(props.doObject ?? "")}
          />
        </div>
        <div className={style.extraInfo}>
          <div className={style.extraInfoValue}>
            {t("checkType")}
            <span className={style.value}> {props.inspectionType}</span>
          </div>
          <div className={style.extraInfoValue}>
            {t("field")}
            <span className={style.value}> {props.field}</span>
          </div>
        </div>
      </div>
      <div className={style.controlButtonGroup}>
        {!successCond() && props.subGroup !== SubGroupsActionsTypes.Deleted && (
          <>
            <Button
              size={"s"}
              iconSize="s"
              view="secondary"
              label={t("send")}
              iconLeft={IconMail}
            />
            <Button
              size={"s"}
              className={style.editButton}
              iconSize="s"
              label={t("edit")}
              iconLeft={IconEdit}
            />
          </>
        )}
        {props.subGroup === SubGroupsActionsTypes.Deleted && (
          <Button width='full'
            size={"s"}
            iconSize="s"
            view="secondary"
            label={t("recover")}
            iconLeft={IconRevert}
          />
        )}
      </div>
    </Card>
  );
});

export default InspectionCard;
