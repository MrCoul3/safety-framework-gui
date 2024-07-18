import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import {IBreadCrumbs} from "../interfaces/IBreadCrumbs";
import {useTranslation} from "react-i18next";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import {IFilterDateRangeFieldValue, IFormFieldValue,} from "../interfaces/IFieldInterfaces";
import {useStore} from "../hooks/useStore";
import {InspectionFormTypes} from "../enums/InspectionFormTypes";
import {ViolationFilterTypes,} from "../enums/ViolationFilterTypes";
import {IInspection} from "../interfaces/IInspection";
import {isDevelop} from "../constants/config";
import ViolationsLayout from "../layouts/ViolationsLayout/ViolationsLayout";
import ViolationsTable from "../components/ViolationsTable/ViolationsTable";
import {WILL_RESOLVE_BY_FILTER_VALUES} from "../constants/constants";

interface IEliminationOfViolationsPage {}

const EliminationOfViolationsPage = observer(
  (props: IEliminationOfViolationsPage) => {
    const { t } = useTranslation("dict");

    const store = useStore();

    const [openFilterType, setOpenFilterType] = useState<
      InspectionFormTypes | ViolationFilterTypes | null | string
    >(null);

    const crumbs: IBreadCrumbs[] = [
      {
        label: t("mainPage"),
        index: -1,
        href: "#",
        path: "main",
      },
      {
        label: t("eliminationOfViolationsTitle"),
      },
    ];

    const handleOpenField = (
      type: InspectionFormTypes | ViolationFilterTypes | string,
    ) => {
      console.log("handleOpenField type", type);
      if (type !== ViolationFilterTypes.Date && type !== "passport") {
        store.inspectionStore.handleOpenField(type as InspectionFormTypes);
      }
      if (type === "passport") {
        if (isDevelop) {
          store.eliminationOfViolationsStore.getPassportsDev();
          store.eliminationOfViolationsStore.getPassports();
        } else {
          store.eliminationOfViolationsStore.getPassports();
        }
      }
      if (type === ViolationFilterTypes.WillResolveBy) {
          store.inspectionStore.setFieldsData(WILL_RESOLVE_BY_FILTER_VALUES);
      }
      setOpenFilterType(type);
    };
    const handleScrollFieldToBottom = (
      inspectionType: InspectionFormTypes | ViolationFilterTypes,
    ) => {
      store.inspectionStore.increaseOffset();
      store.inspectionStore.getFieldData(inspectionType);
    };
    const handleInspectionTextFieldClose = () => {
      setOpenFilterType(null);
      store.inspectionStore.clearOffset();
      store.inspectionStore.clearFieldsData();
    };

    const handleSearchValueChange = (value: string | null) => {
      store.inspectionStore.handleSearchValueChange(value, openFilterType);
    };

    const handleDateChange = (value: IFilterDateRangeFieldValue) => {
      console.log("handleDateChange", value);
      store.inspectionStore.updateFormFieldsValues(value);
    };

    const handleChange = (value: IFormFieldValue) => {
      store.inspectionStore.updateFormFieldsValues(value);
      store.inspectionStore.checkIsFormSuccess();
    };
    const handleChecked = (val: boolean) => {
      const value = { isResolved: !val };
      if (val === false) {
        delete (store.inspectionStore.formFieldsValues as IInspection)
          ?.isResolved;
        return;
      }
      store.inspectionStore.updateFormFieldsValues(value);
    };
    const handleResetFilters = () => {
      store.inspectionStore.clearInspectionForm();
      submitFilter();
    };
    const submitFilter = () => {
      store.eliminationOfViolationsStore.clearViolations();
      if (isDevelop) {
        store.eliminationOfViolationsStore.getViolations();
        store.eliminationOfViolationsStore.getViolationsDev();
      } else {
        store.eliminationOfViolationsStore.getViolations();
      }
    };

    return (
      <ViolationsLayout
        navPanel={
          <NavPanel
            disableButtons
            isDisableSaveInspectionButton
            crumbs={crumbs}
            title={t("eliminationOfViolationsTitle")}
          />
        }
        filterPanel={
          <FilterPanel
            submitFilter={submitFilter}
            resetFilters={handleResetFilters}
            handleChecked={handleChecked}
            onInspectionTextFieldClose={handleInspectionTextFieldClose}
            onScrollToBottom={handleScrollFieldToBottom}
            onSearchValueChange={handleSearchValueChange}
            handleChange={handleChange}
            handleOpenField={handleOpenField}
            fieldsData={store.inspectionStore.fieldsData}
            handleDateChange={handleDateChange}
            formFieldsValues={
              store.inspectionStore.formFieldsValues as IInspection
            }
          />
        }
        content={
          <ViolationsTable
            loader={store.loaderStore.loader}
            violations={store.eliminationOfViolationsStore.violations}
          />
        }
      />
    );
  },
);

export default EliminationOfViolationsPage;
