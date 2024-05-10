import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Table, TableColumn } from "@consta/uikit/Table";
import { IInspection } from "../../interfaces/IInspection";
import { useTranslation } from "react-i18next";
import { Pagination } from "@consta/uikit/Pagination";
import moment from "moment";

interface IInspectionsTable {
  inspections: IInspection[];
}

const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      props.inspections.map((item) => ({
        ...item,
        auditDate: moment(item.auditDate).format("DD.MM.YYYY"),
      })),
    [props.inspections],
  );

  const keys = Object.keys(props.inspections[0]);

  const excludeFields = ["id", "status"];

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key) => !excludeFields.includes(key))
    .map((key: any) => ({
      title: <span className={style.colTitle}>{t(key)}</span>,
      accessor: key,
      align: "left",
      sortable: true,
      maxWidth: 200,
    }));

    console.log('columns!!!', columns)

  return (
    <div className={style.InspectionsTable}>
      <Table
        zebraStriped="odd"
        className={style.table}
        stickyHeader
        rows={rows}
        columns={columns}
      />
      <Pagination
        className={style.pagination}
        items={5}
        value={page}
        onChange={setPage}
        arrows={[{ label: "Назад" }, { label: "Вперёд" }]}
        hotKeys={[
          {
            label: "← Shift",
            keys: ["Shift", "ArrowLeft"],
          },
          {
            label: "Shift →",
            keys: ["Shift", "ArrowRight"],
          },
        ]}
      />
    </div>
  );
});

export default InspectionsTable;
