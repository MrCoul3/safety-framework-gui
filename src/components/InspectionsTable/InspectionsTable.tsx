import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Table, TableColumn } from "@consta/uikit/Table";
import { IEntity, IInspection } from "../../interfaces/IInspection";
import { useTranslation } from "react-i18next";
import { Pagination } from "@consta/uikit/Pagination";
import moment from "moment";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconTrash } from "@consta/icons/IconTrash";
import { IconMail } from "@consta/icons/IconMail";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { onCellClick } from "@consta/uikit/__internal__/src/components/Table/Table";
import CustomFilter from "../CustomFilter/CustomFilter";
import { INSPECTIONS_ON_PAGE } from "../../constants/config";
import { IFieldsData } from "../../stores/InspectionStore";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { useLocation } from "react-router";
interface IInspectionsTable {
  inspections: IInspection[];
  fieldsData: IFieldsData[];

  inspectionsCount?: number | null;
  subGroupsActionsTypes: SubGroupsActionsTypes;
  handleOpenFilter(field: InspectionFormTypes): void;
    handlePaginationChange(pageNumber: number): void;
  handleDeleteSentButtonClick(id: number | string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
  handleEditInspection(id: number | string): void;
  handleEditLocalInspection(id: string): void;
}

const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const [page, setPage] = useState(1);

  const location = useLocation();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const tableRef = useRef<HTMLDivElement>(null);

  const getTableSize = () => {
    const tableContainerHeight = tableContainerRef.current?.clientHeight;
    const paginationHeight = 75;
    if (tableContainerHeight) {
      if (tableContainerHeight > tableContainerHeight - paginationHeight) {
        tableContainerRef.current.classList.add(style.tableHeight);
      }
    }
  };

  useEffect(() => {
    getTableSize();
  }, [tableRef, tableContainerRef]);

  const excludeFields = ["id"];

  const handleEditInspection = (index: string, inspection: IInspection) => {
    if (location.pathname.includes(SubGroupsActionsTypes.Sent)) {
      props.handleEditInspection(inspection.id);
    }
    if (location.pathname.includes(SubGroupsActionsTypes.NewInspections)) {
      props.handleEditLocalInspection(index);
    }
  };

  const renderActions = (index: string, inspection: IInspection) => (
    <div className={style.buttonGroup}>
      <Button
        size="s"
        onClick={() => handleEditInspection(index, inspection)}
        view="ghost"
        iconRight={IconEdit}
        onlyIcon
      />
      {props.subGroupsActionsTypes === SubGroupsActionsTypes.NewInspections && (
        <Button size="s" view="ghost" iconRight={IconMail} onlyIcon />
      )}

      <Button
        size="s"
        onClick={() =>
          props.subGroupsActionsTypes === SubGroupsActionsTypes.NewInspections
            ? props.handleDeleteNewInspectionButtonClick(index)
            : props.handleDeleteSentButtonClick(inspection.id)
        }
        view="ghost"
        iconRight={IconTrash}
        onlyIcon
      />
    </div>
  );

  const rows = useMemo(
    () =>
      props.inspections.map((item, index) => ({
        id: item.id,
        [InspectionFormTypes.InspectionForm]:
          item[InspectionFormTypes.InspectionForm],
        [InspectionFormTypes.InspectionType]:
          item[InspectionFormTypes.InspectionType]?.title,
        [InspectionFormTypes.Function]:
          item[InspectionFormTypes.Function]?.title,
        [InspectionFormTypes.OilField]:
          item[InspectionFormTypes.OilField]?.title,
        [InspectionFormTypes.DoStruct]:
          item[InspectionFormTypes.DoStruct]?.title,
        [InspectionFormTypes.DoObject]:
          item[InspectionFormTypes.DoObject]?.title,
        [InspectionFormTypes.Contractor]:
          item[InspectionFormTypes.Contractor]?.title,
        [InspectionFormTypes.ContractorStruct]:
          item[InspectionFormTypes.ContractorStruct]?.title,
        [InspectionFormTypes.SubContractor]:
          item[InspectionFormTypes.SubContractor]?.title,
        [InspectionFormTypes.Auditor]: item[InspectionFormTypes.Auditor]?.personFio,
        [InspectionFormTypes.Auditee]: item[InspectionFormTypes.Auditee]?.personFio,
        [InspectionFormTypes.Supervisor]:
          item[InspectionFormTypes.Supervisor]?.personFio,
        actions: renderActions((index + 1).toString(), item),
        [InspectionFormTypes.AuditDate]: moment(item.auditDate).format(
          "DD.MM.YYYY",
        ),
      })),
    [props.inspections],
  );

  const keys = Object.values(InspectionFormTypes) as any;

  keys.unshift("actions");

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key: string) => !excludeFields.includes(key))
    .map((key: any) => ({
      title: <span className={style.colTitle}>{t(key)}</span>,
      accessor: key,
      align: "left",
      sortable: key !== "actions",
      maxWidth: 200,
    }));

  const handleOpenFilter = (field: InspectionFormTypes) => {
    console.log("onopen", field);
    props.handleOpenFilter(field);
  };

  const filters: any = Object.values(InspectionFormTypes).map((field) => ({
    id: field,
    name: t(field) + ": ",
    filterer: (
      cellValue: string,
      filterValues: Array<{ value: string; name: string }>,
    ) => {
      /* return filterValues.some(
        (filterValue) => filterValue && filterValue.value === cellValue,
      );*/
    },
    field: field,
    component: {
      name: CustomFilter,
      props: {
        type: field,
        fieldData: props.fieldsData.find((data) => data[field]),
        onOpen: () => handleOpenFilter(field),
      },
    },
  }));

  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();
  };

  const handlePaginationChange = (val: number) => {
    setPage(val);
    props.handlePaginationChange(val)
  };

  return (
    <div ref={tableContainerRef} className={style.InspectionsTable}>
      <Table
        ref={tableRef}
        onCellClick={handleCellClick}
        filters={filters}
        isResizable
        // zebraStriped="odd"
        className={style.table}
        stickyHeader
        stickyColumns={1}
        rows={rows}
        columns={columns}
      />
      {props.inspectionsCount &&
        props.inspections.length > INSPECTIONS_ON_PAGE && (
          <Pagination
            showFirstPage
            showLastPage
            visibleCount={5}
            className={style.pagination}
            items={Math.ceil(props.inspectionsCount / INSPECTIONS_ON_PAGE)}
            value={page}
            onChange={handlePaginationChange}
            arrows={[{ label: t("back") }, { label: t("forward") }]}
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
        )}
    </div>
  );
});

export default InspectionsTable;
