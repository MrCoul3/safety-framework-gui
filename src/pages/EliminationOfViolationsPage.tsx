import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Layout from "../layouts/Layout/Layout";
import NavPanel from "../components/NavPanel/NavPanel";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import {
  IFormDateFieldValue,
  IFormFieldValue,
} from "../interfaces/IFieldInterfaces";
import { useStore } from "../hooks/useStore";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import {ViolationFilterTypes, violationsDictionaryOfConformity} from "../enums/ViolationFilterTypes";

interface IEliminationOfViolationsPage {}

const EliminationOfViolationsPage = observer(
  (props: IEliminationOfViolationsPage) => {
    const { t } = useTranslation("dict");

    const store = useStore();

    const [openFilterType, setOpenFilterType] =
      useState<InspectionFormTypes | null>(null);

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

    const handleDateChange = (value: IFormDateFieldValue) => {
      /*console.log("handleDateChange", value);
          store.inspectionStore.updateFormFieldsValues(value);
          setSavingState(true);
          store.inspectionStore.checkIsFormSuccess();*/
    };

    const handleChange = (value: IFormFieldValue) => {
      console.log("handleChange", value);
      store.inspectionStore.updateFormFieldsValues(value);
      // setSavingState(true);
      store.inspectionStore.checkIsFormSuccess();
    };
    const handleOpenField = (type: ViolationFilterTypes) => {
        if (type !== ViolationFilterTypes.Date) {
            const conformityType = violationsDictionaryOfConformity[type];
             store.inspectionStore.handleOpenField(conformityType);
             setOpenFilterType(conformityType);
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
              handleChange={handleChange}
              handleOpenField={handleOpenField}
              fieldsData={store.inspectionStore.fieldsData}
              handleDateChange={handleDateChange}
            />
          </div>
        }
      />
    );
  },
);

export default EliminationOfViolationsPage;
