import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Table, TableColumn } from "@consta/uikit/Table";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { VIOLATIONS_COMMON_FIELDS } from "../../enums/ViolationFilterTypes";
import { IViolation } from "../../interfaces/IViolation";
import { useTranslation } from "react-i18next";
import EmptyBoxPage from "../EmptyBoxPage/EmptyBoxPage";
import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";
import { toJS } from "mobx";
import moment from "moment";

interface IViolationsTable {
  violations: IViolation[];

  loader?: LoaderType;
}

const ViolationsTable = observer((props: IViolationsTable) => {
  const { t } = useTranslation("dict");

  const rows: any = props.violations.map((item) => ({
    [InspectionFormTypes.AuditDate]: moment(item?.auditDate).format(
      "DD.MM.YYYY",
    ),
    passport: item?.passport,
    [InspectionFormTypes.Contractor]: item?.contractor,
    [InspectionFormTypes.OilField]: item?.oilfield,
    [InspectionFormTypes.DoStruct]: item?.doStruct,
    [InspectionFormTypes.DoObject]: item?.doObject,
  }));

  useEffect(() => {
    console.log("ViolationsTable props.violations", toJS(props.violations));
  }, [props.violations]);

  const columns: any = VIOLATIONS_COMMON_FIELDS.map((key: any) => ({
    title: <span className={style.colTitle}>{t(key)}</span>,
    accessor: key,
    sortable: true,
    align: "left",
    width: 200,
  }));

  const renderLoader = () => {
    if (props.loader === "wait") {
      return <LoaderPage />;
    } else {
      return (
        <EmptyBoxPage
          disableActions
          description={t("violationsEmptyDescription")}
        />
      );
    }
  };
  return (
    <div className={style.ViolationsTable}>
      {props.violations.length ? (
        <Table
          rows={rows}
          isResizable
          stickyHeader
          columns={columns}
          // onCellClick={handleCellClick}
        />
      ) : (
        renderLoader()
      )}
    </div>
  );
});

export default ViolationsTable;
