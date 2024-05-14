import React, { useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  Table,
  TableColumn,
  TableFilters,
  TableRow,
} from "@consta/uikit/Table";
import { IInspection } from "../../interfaces/IInspection";
import { useTranslation } from "react-i18next";
import { Pagination } from "@consta/uikit/Pagination";
import moment from "moment";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconTrash } from "@consta/icons/IconTrash";
import { IconMail } from "@consta/icons/IconMail";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { onCellClick } from "@consta/uikit/__internal__/src/components/Table/Table";
import { Combobox } from "@consta/uikit/Combobox";
import CustomFilter from "../CustomFilter/CustomFilter";
interface IInspectionsTable {
  inspections: IInspection[];
  handleEditButtonClick(id: string): void;
  handleDeleteSentButtonClick(id: string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
}

const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const [page, setPage] = useState(1);

  const table = useRef<HTMLDivElement>(null);

  const excludeFields = ["id"];

  const renderActions = (index: string) => (
    <>
      <Button
        onClick={() => props.handleEditButtonClick(index)}
        view="clear"
        form="round"
        iconRight={IconEdit}
        onlyIcon
      />
      <Button view="clear" form="round" iconRight={IconMail} onlyIcon />
      <Button
        onClick={() => props.handleDeleteNewInspectionButtonClick(index)}
        view="clear"
        form="round"
        iconRight={IconTrash}
        onlyIcon
      />
    </>
  );

  const rows = useMemo(
    () =>
      props.inspections.map((item, index) => ({
        ...item,
        actions: renderActions((index + 1).toString()),
        [InspectionFormTypes.AuditDate]: moment(item.auditDate).format(
          "DD.MM.YYYY",
        ),
      })),
    [props.inspections],
  );

  const keys = Object.keys(props.inspections[0]);

  keys.unshift("actions");

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key) => !excludeFields.includes(key))
    .map((key: any) => ({
      title: <span className={style.colTitle}>{t(key)}</span>,
      accessor: key,
      align: "left",
      sortable: key !== "actions",
      maxWidth: 200,
    }));

  const filters: any = Object.values(InspectionFormTypes).map((field) => ({
    id: field,
    name: t(field) + ": ",
    filterer: (
      cellValue: string,
      filterValues: Array<{ value: string; name: string }>,
    ) => {
      console.log("filterer", cellValue, filterValues);
     /* return filterValues.some(
        (filterValue) => filterValue && filterValue.value === cellValue,
      );*/
    },
    field: field,
    component: {
      name: CustomFilter,
      props: {
          type: field
      },
    },
  }));

  const onFiltersUpdated = () => {
    console.log("onFiltersUpdated");
  };
  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();
    console.log("handleCellClick", type, rowId, ref, columnIdx);
  };

  return (
    <div className={style.InspectionsTable}>
      <Table
        ref={table}
        onCellClick={handleCellClick}
        onFiltersUpdated={onFiltersUpdated}
        filters={filters}
        isResizable
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
