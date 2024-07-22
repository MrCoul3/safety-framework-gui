import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SortByProps, Table, TableColumn } from "@consta/uikit/Table";
import { IInspection } from "../../interfaces/IInspection";
import { useTranslation } from "react-i18next";
import { Pagination } from "@consta/uikit/Pagination";
import moment from "moment";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconEye } from "@consta/icons/IconEye";
import { IconTrash } from "@consta/icons/IconTrash";
import { IconMail } from "@consta/icons/IconMail";
import {
  INSPECTION_FORM_COMMON_FIELDS,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { onCellClick } from "@consta/uikit/__internal__/src/components/Table/Table";
import CustomFilter from "../CustomFilter/CustomFilter";
import { INSPECTIONS_ON_PAGE } from "../../constants/config";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { useLocation } from "react-router";
import { IInspectionFilters } from "../../interfaces/IInspectionFilters";
import FilterTags from "../FilterTags/FilterTags";
import {
  IFieldsData,
  IFilterDateRangeFieldValue,
  IFilterFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { LoaderType } from "../../interfaces/LoaderType";
import { useStore } from "../../hooks/useStore";

interface IInspectionsTable {
  inspections: IInspection[];
  fieldsData: IFieldsData[];
  filterFieldsValues: IInspectionFilters | null;
  inspectionsCount?: number | null;
  loader?: LoaderType;
  subGroupsActionsTypes: SubGroupsActionsTypes;
  handleOpenFilter(field: InspectionFormTypes): void;
  resetFilters(): void;
  handleDeleteFilter(
    value: IFilterFieldValue | IFilterDateRangeFieldValue,
  ): void;
  handlePaginationChange(pageNumber: number): void;
  handleDeleteSentButtonClick(id: number | string): void;
  handleDeleteNewInspectionButtonClick(id: string): void;
  handleEditInspection(id: number | string): void;
  handleEditLocalInspection(id: string): void;
  handleFilterChange(
    value: IFilterFieldValue | IFilterDateRangeFieldValue,
  ): void;
  onSearchValueChange?(value: string | null): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  onInspectionTextFieldClose?(): void;
  sendInspection(index: number): void;
  handleSort?(value: SortByProps<any> | null): void;
}

const InspectionsTable = observer((props: IInspectionsTable) => {
  const { t } = useTranslation("dict");

  const store = useStore();

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
    const ind = +index + 1;
    console.log("handleEditInspection inspection", inspection.id);
    if (location.pathname.includes(SubGroupsActionsTypes.Sent)) {
      props.handleEditInspection(inspection.id ?? "");
    }
    if (location.pathname.includes(SubGroupsActionsTypes.NewInspections)) {
      props.handleEditLocalInspection(ind.toString());
    }
  };

  const renderActions = (index: string, inspection: IInspection) => (
    <div className={style.buttonGroup}>
      <Button
        size="s"
        onClick={() => handleEditInspection(index, inspection)}
        view="ghost"
        iconRight={
          props.subGroupsActionsTypes === SubGroupsActionsTypes.Sent
            ? IconEye
            : IconEdit
        }
        onlyIcon
      />

      {props.subGroupsActionsTypes === SubGroupsActionsTypes.NewInspections && (
        <>
          <Button
            disabled={!store.mainPageStore.checkIsInspectionReadyToSend(+index)}
            onClick={() => props.sendInspection(+index)}
            size="s"
            view="ghost"
            iconRight={IconMail}
            onlyIcon
          />
          <Button
            size="s"
            onClick={() =>
              props.subGroupsActionsTypes ===
              SubGroupsActionsTypes.NewInspections
                ? props.handleDeleteNewInspectionButtonClick(index)
                : props.handleDeleteSentButtonClick(inspection.id ?? "")
            }
            view="ghost"
            iconRight={IconTrash}
            onlyIcon
          />
        </>
      )}
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
        actions: renderActions(index.toString(), item),
        [InspectionFormTypes.AuditDate]: moment(item.auditDate)
          .valueOf()
          .toString(),
      })),
    [props.inspections],
  );

  const keys = INSPECTION_FORM_COMMON_FIELDS;

  const columns: TableColumn<(typeof rows)[number]>[] = keys
    .filter((key) => !excludeFields.includes(key))
    .map((key: any) => {
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
        width: 200,
      };
    });

  columns.unshift({
    title: <span className={style.colTitle}>{t("actions")}</span>,
    accessor: "actions",
    align: "left",
    width: 150,
  });

  if (!location.pathname.includes(SubGroupsActionsTypes.NewInspections)) {
    columns.push({
      title: <span className={style.colTitle}>{t("id")}</span>,
      accessor: "id",
      align: "left",
      width: 150,
    });
  }

  const handleOpenFilter = (field: InspectionFormTypes) => {
    console.log("onopen", field);
    props.handleOpenFilter(field);
  };

  const filters: any = INSPECTION_FORM_COMMON_FIELDS.map((field) => ({
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

  const removeFilterButtons = () => {
    const buttonFilters = document.querySelectorAll(
      ".TableHeader-Icon_type_filter",
    );
    buttonFilters.forEach((item) => item.remove());
  };

  useEffect(() => {
    if (!isSentInspectionsCondition()) {
      removeFilterButtons();
    }
  }, [location]);

  return (
    <div ref={tableContainerRef} className={style.InspectionsTable}>
      {isSentInspectionsCondition() ? (
        <>
          <FilterTags
            resetFilters={props.resetFilters}
            handleDeleteFilter={props.handleDeleteFilter}
            filterFieldsValues={props.filterFieldsValues}
          />
          <Table
            isResizable
            rows={rows}
            stickyHeader
            ref={tableRef}
            stickyColumns={1}
            columns={columns}
            className={style.table}
            onSortBy={props.handleSort}
            onCellClick={handleCellClick}
            filters={filters}
          />
        </>
      ) : (
        <Table
          isResizable
          rows={rows}
          stickyHeader
          ref={tableRef}
          stickyColumns={1}
          columns={columns}
          className={style.table}
          onCellClick={handleCellClick}
          filters={filters}
        />
      )}

      {props.inspectionsCount && props.inspectionsCount > INSPECTIONS_ON_PAGE
        ? isSentInspectionsCondition() &&
          props.inspections.length && (
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
          )
        : null}
    </div>
  );
});

export default InspectionsTable;
