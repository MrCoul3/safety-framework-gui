import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Layout from "../layouts/Layout/Layout";
import NavPanel from "../components/NavPanel/NavPanel";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import {
    IFilterDateRangeFieldValue,
    IFormDateFieldValue,
    IFormFieldValue,
} from "../interfaces/IFieldInterfaces";
import { useStore } from "../hooks/useStore";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import {
  ViolationFilterTypes,
  violationsDictionaryOfConformity,
} from "../enums/ViolationFilterTypes";
import { IInspection } from "../interfaces/IInspection";

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

    const handleDateChange = (value: IFilterDateRangeFieldValue) => {
      console.log("handleDateChange", value);
      store.inspectionStore.updateFormFieldsValues(value);
    };

    const handleChange = (value: IFormFieldValue) => {
      console.log("handleChange", value);
      store.inspectionStore.updateFormFieldsValues(value);
      // setSavingState(true);
      store.inspectionStore.checkIsFormSuccess();
    };
    const handleOpenField = (
      type: InspectionFormTypes | ViolationFilterTypes | string,
    ) => {
      console.log("handleOpenField type", type);
      if (
        type !== ViolationFilterTypes.Date &&
        type !== "passport"
      ) {
        store.inspectionStore.handleOpenField(type as InspectionFormTypes);
      }
      if (type === "passport") {
          store.eliminationOfViolationsStore.getPassportsDev()
      }
      setOpenFilterType(type);
    };
    const handleScrollFieldToBottom = (
      inspectionType: InspectionFormTypes | ViolationFilterTypes,
    ) => {
      console.log("handleScrollFieldToBottom!!!");
      store.inspectionStore.increaseOffset();
      store.inspectionStore.getFieldData(inspectionType);
    };
    const handleInspectionTextFieldClose = () => {
      setOpenFilterType(null);
      store.inspectionStore.clearOffset();
      store.inspectionStore.clearFieldsData();
    };

    const handleSearchValueChange = (value: string | null) => {
      console.log("handleSearchValueChange value!!!", value);
      store.inspectionStore.setSearchFieldValue(value);
      if (!value || value === "") {
        store.inspectionStore.clearOffset();
      }
      if ((value || value === "") && openFilterType) {
        store.inspectionStore.getFieldData(openFilterType);
      }
    };
    return (
      <Layout
        navPanel={
          <NavPanel
            disableButtons
            isDisableSaveInspectionButton
            crumbs={crumbs}
            title={t("eliminationOfViolationsTitle")}
          />
        }
        content={
          <div>
            <FilterPanel
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
          </div>
        }
      />
    );
  },
);

export default EliminationOfViolationsPage;
