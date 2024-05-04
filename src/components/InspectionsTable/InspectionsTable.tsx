import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Table, TableColumn } from "@consta/uikit/Table";
import { IInspection } from "../../interfaces/IInspection";
import { useTranslation } from "react-i18next";
import { toJS } from "mobx";
import { Pagination } from "@consta/uikit/Pagination";

interface IInspectionsTable {
  inspections: IInspection[];
}

const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const [page, setPage] = useState(1);

  const rows = props.inspections;

  const keys = Object.keys(props.inspections[0]);

  const columns: TableColumn<(typeof rows)[number]>[] = keys.map(
    (key: any) => ({
      title: t(key),
      accessor: key,
      align: "left",
      sortable: true,
    }),
  );

  return (
    <div className={style.InspectionsTable}>
      <Table  className={style.table} stickyHeader  rows={rows} columns={columns} />
      <Pagination className={style.pagination}
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
