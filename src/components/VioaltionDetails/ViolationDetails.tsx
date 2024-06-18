import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IViolation } from "../../interfaces/IViolation";
import { Card } from "@consta/uikit/Card";
import { Badge } from "@consta/uikit/Badge";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import { ViolationFilterTypes } from "../../enums/ViolationFilterTypes";

interface IViolationDetails {
  violation?: IViolation;
}

const ViolationDetails = observer((props: IViolationDetails) => {
  const { t } = useTranslation("dict");

  const title = props.violation?.question;

  const code = title?.split(" ")[0];

  const name = title?.replace(code ?? "", "");

  const getValue = (value?: string) => (value ? value : t("noFilled"));
  const getComment = (value?: string) => (value ? value : "-");
  const getDate = (date?: Date) =>
    date ? moment(date).format("DD.MM.YYYY") : t("noFilled");
  return (
    <div className={style.ViolationDetails}>
      <Card className={style.card}>
        <div className={style.title}>
          <span className={style.code}>{code}</span>
          <span className={style.name}>{name}</span>
        </div>
        <div className={style.checkDates}>
          <div className={style.checkDate}>
            <span className={style.blueColor}>{t("checkVerifyDate")} </span>
            <span className={style.value}>
              {getDate(props.violation?.auditDate)}
            </span>
          </div>
        </div>

        <div className={style.checkDetails}>
          <span className={style.checkDetailsTitle}>{t("checkDetails")}</span>

          <div className={style.extraInfo}>
            <div className={style.extraInfoValue}>
              {t(ViolationFilterTypes.TypeList)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.passport)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t("inspectionType")}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.inspectionType)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.OilField)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.oilfield)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.DoObject)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.doObject)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.DoStruct)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.doStruct)}
              </span>
            </div>

            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.Contractor)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.contractor)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.Auditor)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.auditor)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t(InspectionFormTypes.Auditee)}
              <span className={style.value}>
                {" "}
                {getValue(props.violation?.auditee)}
              </span>
            </div>
            <div className={style.extraInfoValue}>
              {t("comment")}
              <span className={style.value}>
                {" "}
                {getComment(props.violation?.comment)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default ViolationDetails;
