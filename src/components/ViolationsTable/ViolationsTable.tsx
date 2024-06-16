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
import {
  CellClickType,
  onCellClick,
} from "@consta/uikit/__internal__/src/components/Table/Table";

interface IViolationsTable {
  violations: IViolation[];

  loader?: LoaderType;
}

const ViolationsTable = observer((props: IViolationsTable) => {
  const { t } = useTranslation("violationsDict");

  const rows: any = props.violations.map((item) => ({
    [InspectionFormTypes.AuditDate]: moment(item?.auditDate).format(
      "DD.MM.YYYY",
    ),
    passport: item?.passport,
    question: item?.question,
    auditor: item?.auditor,
    auditee: item?.auditee,
    [InspectionFormTypes.DoStruct]: item?.doStruct,
  }));

  useEffect(() => {
    console.log("ViolationsTable props.violations", toJS(props.violations));
  }, [props.violations]);

  const columns: any = VIOLATIONS_COMMON_FIELDS.map((key: any) => ({
    title: <span className={style.colTitle}>{t(key)}</span>,
    accessor: key,
    sortable: true,
    align: "left",
    width: key === "question" ? 350 : 200,
    maxWidth: 250,
  }));

  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();

    const row = (e.target as HTMLDivElement).closest('.Table-CellsRow');

    console.log("handleCellClick", (e.target as HTMLDivElement).closest('.Table-CellsRow'), type, columnIdx, rowId, ref);
  };
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
          onCellClick={handleCellClick}
        />
      ) : (
        renderLoader()
      )}
    </div>
  );
});

export default ViolationsTable;
