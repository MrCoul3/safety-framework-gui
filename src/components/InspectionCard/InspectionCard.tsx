import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconAllDone } from "@consta/icons/IconAllDone";
import { IconTrash } from "@consta/icons/IconTrash";
import { Card } from "@consta/uikit/Card";
import { Badge } from "@consta/uikit/Badge";
import { Button } from "@consta/uikit/Button";
import { CheckEntityTypes } from "enums/CheckEntityTypes";
import { InspectionStatusesTypes } from "enums/InspectionStatusesTypes";

interface IInspectionCard {
  name?: string;
  doObject?: string;
  checkVerifyDate?: string;
  checkEditedDate?: string;
  checkEntity?: CheckEntityTypes;
  status?: InspectionStatusesTypes;
}

const InspectionCard = observer((props: IInspectionCard) => {
  const { t } = useTranslation("dict");
  const successCond = () => props.status === InspectionStatusesTypes.Success;
  const awaitCond = () => props.status === InspectionStatusesTypes.Warning;
  const errorCond = () => props.status === InspectionStatusesTypes.Error;

  return (
    <Card
      className={classNames({
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
          {props.checkVerifyDate}
        </div>
        <div className={style.checkDate}>
          {t("checkEditedDate")} {props.checkEditedDate}
        </div>
      </div>
      <div className={style.checkDetails}>
        <span className={style.checkDetailsTitle}>{t("checkDetails")}</span>
        <div className={style.badgeGroup}>
          <Badge status="system" label={t(props.checkEntity ?? "")} />
          <Badge view="stroked" status="system" label={t(props.doObject ?? "")} />
        </div>

      </div>
    </Card>
  );
});

export default InspectionCard;
