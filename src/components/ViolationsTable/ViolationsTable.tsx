import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SortByProps, Table, TableColumn } from "@consta/uikit/Table";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import {ViolationFilterTypes, VIOLATIONS_COMMON_FIELDS} from "../../enums/ViolationFilterTypes";
import { IViolation } from "../../interfaces/IViolation";
import { useTranslation } from "react-i18next";
import EmptyBoxPage from "../EmptyBoxPage/EmptyBoxPage";
import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";
import { keys, toJS } from "mobx";
import moment from "moment";
import ViolationDetails from "../VioaltionDetails/ViolationDetails";
import ViolationCheckForm from "../ViolationCheckForm/ViolationCheckForm";
import { useStore } from "../../hooks/useStore";
import { ISendKarkasConfirmed } from "../../interfaces/ISendKarkasConfirmed";
import classNames from "classnames";

interface IViolationsTable {
  violations: IViolation[];
  loader?: LoaderType;
}

interface IRow {
  id: string;
  [InspectionFormTypes.AuditDate]: string | null;
  passport: string | null;
  question: string | null;
  auditor: string | null;
  auditee: string | null;
  [InspectionFormTypes.DoStruct]: string | null;
}

const ViolationsTable = observer((props: IViolationsTable) => {
  const { t } = useTranslation("violationsDict");

  const store = useStore();

  useEffect(() => {
    setViolationId(null);
  }, [props.loader]);

  const rows: IRow[] = props.violations
    .slice()
    .sort((a, b) =>
      moment(a.auditDate).valueOf() > moment(b.auditDate).valueOf() ? -1 : 1,
    )
    .map((item, i) => ({
      id: item?.id.toString(),
      [InspectionFormTypes.AuditDate]: moment(item?.auditDate)
        .valueOf()
        .toString(),
      passport: item?.passport,
      question: item?.question?.split(' ')[0] ?? null,
      auditor: item?.auditor,
      auditee: item?.auditee,
      [InspectionFormTypes.DoStruct]: item?.doStruct,
      comment: item?.comment
    }));

  const columns: TableColumn<(typeof rows)[number]>[] =
    VIOLATIONS_COMMON_FIELDS.map((key: any) => {
      if (key === InspectionFormTypes.AuditDate) {
        return {
          title: <span className={style.colTitle}>{t(key)}</span>,
          accessor: key,
          sortable: true,
          align: "left",
          width: 200,
          renderCell: (row) => {
            return key === InspectionFormTypes.AuditDate
              ? row?.auditDate
                ? moment(+row?.auditDate).format("DD.MM.YYYY")
                : ""
              : null;
          },
        };
      }
      return {
        title: <span className={style.colTitle}>{t(key)}</span>,
        accessor: key,
        sortable: true,
        align: "left",
      };
    });

  columns.push({
    title: <span className={style.colTitle}>{t("id")}</span>,
    accessor: "id",
    align: "left",
    width: 100,
  });

  const [violationId, setViolationId] = React.useState<number | null>();

  const onRowClick = ({ id, e }: { id: string; e: React.MouseEvent }) => {
    const row = (e.target as HTMLDivElement).closest(".Table-CellsRow");
    setViolationId(+id);
    console.log("onRowClick id", id, typeof id);
    document
      .querySelectorAll(".activeRow")
      .forEach((item) => item.classList.remove("activeRow"));
    row?.childNodes.forEach((child) =>
      (child as HTMLElement).classList.add("activeRow"),
    );
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

  const handleSaveForm = async (value: ISendKarkasConfirmed) => {
    console.log("handleSaveForm", value);
    const result =
      await store.eliminationOfViolationsStore.sendViolationForm(value);
    if (result) {
      console.log("handleSaveForm result", toJS(result));
      store.snackBarStore.successSnackBar(t("snackBarSuccessEliminated"));
      setViolationId(null);
      store.eliminationOfViolationsStore.getViolations();
    } else {
      store.snackBarStore.alertSnackBar(t("snackBarErrorEliminated"));
    }
  };

  const getSelectedViolation = () => {
    const violation = props.violations.find(
      (item) => +item?.id === violationId,
    );
    return violation;
  };

  return (
    <div
      className={classNames(style.ViolationsTable, {
        [style.doubleScreen]: violationId,
      })}
    >
      {props.violations.length ? (
        <Table
          className={style.table}
          onRowClick={onRowClick}
          rows={rows}
          stickyHeader
          columns={columns}
        />
      ) : (
        renderLoader()
      )}
      {violationId
        ? props.violations
            .filter((violation) => +violation.id === +violationId)
            .map((violation, index) => {
              console.log("render violations index",violation.id, +violationId, index);
              return +violation.id === +violationId && index === 0 ? (
                <div className={style.details}>
                  <ViolationDetails violation={getSelectedViolation()} />
                  {!violation.isResolved && (
                    <ViolationCheckForm
                      onLoadFile={(value) =>
                        store.snackBarStore.successSnackBar(value)
                      }
                      violationId={violationId}
                      saveForm={handleSaveForm}
                      comment={getSelectedViolation()?.resolveComment ?? ""}
                    />
                  )}
                </div>
              ) : null;
            })
        : null}
    </div>
  );
});

export default ViolationsTable;
