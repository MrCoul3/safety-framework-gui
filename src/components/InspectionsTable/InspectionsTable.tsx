import React, { useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  Table,
  TableColumn,
  TableFilters,
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
import {Combobox} from "@consta/uikit/Combobox";
interface IInspectionsTable {
  inspections: IInspection[];
  handleEditButtonClick(id: string): void;
  handleDeleteSentButtonClick(id: string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
}
type Item = {
    label: string;
    id: number;
};

const items: Item[] = [
    {
        label: 'Первый',
        id: 1,
    },
    {
        label: 'Второй',
        id: 2,
    },
    {
        label: 'Третий',
        id: 3,
    },
];
const CustomFilter = () => {
    const onChange = () => {}
    return <div>
        <Combobox items={items} onChange={onChange} />
    </div>
}


const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const [page, setPage] = useState(1);

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
        auditDate: moment(item.auditDate).format("DD.MM.YYYY"),
      })),
    [props.inspections],
  );

  const keys = Object.keys(props.inspections[0]);

  keys.unshift("actions");

  const excludeFields = ["id", "status"];

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key) => !excludeFields.includes(key))
    .map((key: any) => ({
      title: <span className={style.colTitle}>{t(key)}</span>,
      accessor: key,
      align: "left",
      sortable: key !== "actions",
      maxWidth: 200,
    }));

  const filters: TableFilters<(typeof rows)[number]> = [
    {
      id: InspectionFormTypes.InspectionForm,
      name: t(InspectionFormTypes.InspectionForm) + ": ",
      filterer: (
        cellValue,
        filterValues: Array<{ value: string; name: string }>,
      ) => {
        console.log("filterer", cellValue, filterValues);
        return filterValues.some(
          (filterValue) => filterValue && filterValue.value === cellValue,
        );
      },
      field: InspectionFormTypes.InspectionForm,
    /*  component: {
        name: TableTextFilter,
        props: {
          withSearch: true,
          items: [
            { name: "Северное", value: "Северное" },
            { name: "Южное", value: "Южное" },
          ],
        },
      },*/
      component: {
        name: CustomFilter,
        props: {

        },
      },
    },
  ];

  const onFiltersUpdated = () => {
    console.log("onFiltersUpdated");
  };
  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();
      console.log('handleCellClick', type, rowId, ref, columnIdx)
  };

  return (
    <div className={style.InspectionsTable}>
      <Table
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
