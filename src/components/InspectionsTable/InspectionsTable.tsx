import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  SortByProps,
  Table,
  TableColumn,
  TableFilters,
  TableNumberFilter,
  TableTextFilter,
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
import CustomFilter from "../CustomFilter/CustomFilter";
import { INSPECTIONS_ON_PAGE } from "../../constants/config";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { useLocation } from "react-router";
import { toJS } from "mobx";
import { IInspectionFilters } from "../../interfaces/IInspectionFilters";
import FilterTags from "../FilterTags/FilterTags";
import {
  IFieldsData,
  IFilterDateRangeFieldValue,
  IFilterFieldValue,
  IFormDateFieldValue
} from "../../interfaces/IFieldInterfaces";
import {ISortByParams} from "../../interfaces/ISortByParams";

interface IInspectionsTable {
  inspections: IInspection[];
  fieldsData: IFieldsData[];
  filterFieldsValues: IInspectionFilters | null;
  inspectionsCount?: number | null;
  subGroupsActionsTypes: SubGroupsActionsTypes;
  handleOpenFilter(field: InspectionFormTypes): void;
  resetFilters(): void;
  handleDeleteFilter(value: IFilterFieldValue | IFilterDateRangeFieldValue): void;
  handlePaginationChange(pageNumber: number): void;
  handleDeleteSentButtonClick(id: number | string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
  handleEditInspection(id: number | string): void;
  handleEditLocalInspection(id: string): void;
  handleFilterChange(value: IFilterFieldValue | IFilterDateRangeFieldValue): void;
  onSearchValueChange?(value: string | null): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  onInspectionTextFieldClose?(): void;
  setSortSetting?(value: SortByProps<any> | null): void;
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
    console.log("inspections!!!", toJS(props.inspections));
  }, [props.inspections]);

  useEffect(() => {
    getTableSize();
  }, [tableRef, tableContainerRef]);

  const excludeFields = ["id"];

  const handleEditInspection = (index: string, inspection: IInspection) => {
    if (location.pathname.includes(SubGroupsActionsTypes.Sent)) {
      props.handleEditInspection(inspection.id ?? "");
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
            : props.handleDeleteSentButtonClick(inspection.id ?? "")
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
        id: item.id ?? "",
        [InspectionFormTypes.InspectionForm]:
          item[InspectionFormTypes.InspectionForm]?.title,
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
        [InspectionFormTypes.Auditor]:
          item[InspectionFormTypes.Auditor]?.personFio,
        [InspectionFormTypes.Auditee]:
          item[InspectionFormTypes.Auditee]?.personFio,
        [InspectionFormTypes.Supervisor]:
          item[InspectionFormTypes.Supervisor]?.personFio,
        actions: renderActions((index + 1).toString(), item),
        [InspectionFormTypes.AuditDate]: moment(item.auditDate).format(
          "DD.MM.YYYY",
        ),
      })),
    [props.inspections],
  );

  console.log("rows!!!", toJS(rows));

  const keys = Object.values(InspectionFormTypes);

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key) => !excludeFields.includes(key))
    .map((key: any) => ({
      title: <span className={style.colTitle}>{t(key)}</span>,
      accessor: key,
      sortable: true,
      align: "left",
      // maxWidth: 200,
    }));

  columns.unshift({
    title: <span className={style.colTitle}>{t("actions")}</span>,
    accessor: "actions",
    align: "left",
  });

  const handleOpenFilter = (field: InspectionFormTypes) => {
    console.log("onopen", field);
    props.handleOpenFilter(field);
  };

  const filters: any = Object.values(InspectionFormTypes).map((field) => ({
    id: field,
    name: t(field) + ": ",
    field: field,
    component: {
      name: CustomFilter,
      props: {
        handleChange: props.handleFilterChange,
        inspectionType: field,
        onScrollToBottom: props.onScrollToBottom,
        onClose: props.onInspectionTextFieldClose,
        onSearchValueChange: props.onSearchValueChange,
        filterFieldsValues: props.filterFieldsValues?.[field],
        fieldsData: props.fieldsData,
        onOpen: () => handleOpenFilter(field),
      },
    },
  }));

  const isSentInspectionsCondition = () => {
    return location.pathname.includes(SubGroupsActionsTypes.Sent);
  };

  const handleCellClick: onCellClick = ({ e, type, rowId, columnIdx, ref }) => {
    e.preventDefault();
  };

  const handlePaginationChange = (val: number) => {
    setPage(val);
    props.handlePaginationChange(val);
  };

  return (
    <div ref={tableContainerRef} className={style.InspectionsTable}>
      {isSentInspectionsCondition() && (
        <FilterTags
          resetFilters={props.resetFilters}
          handleDeleteFilter={props.handleDeleteFilter}
          filterFieldsValues={props.filterFieldsValues}
        />
      )}
      <Table
        isResizable
        rows={rows}
        stickyHeader
        ref={tableRef}
        filters={filters}
        stickyColumns={1}
        columns={columns}
        className={style.table}
        onSortBy={props.setSortSetting}
        onCellClick={handleCellClick}
      />

      {props.inspectionsCount &&
        props.inspectionsCount > INSPECTIONS_ON_PAGE &&
        isSentInspectionsCondition() && (
          <Pagination
            showFirstPage
            showLastPage
            visibleCount={8}
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
