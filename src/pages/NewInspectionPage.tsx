import React from "react";
import { observer } from "mobx-react-lite";
import NewInspectionPageLayout from "../layouts/NewInspectionPageLayout/NewInspectionPageLayout";
import NavPanel from "../components/NavPanel/NavPanel";
import InspectionForm from "../components/InspectionForm/InspectionForm";
import { useTranslation } from "react-i18next";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { useStore } from "../hooks/useStore";
import {
  IFormDateFieldValue,
  IFormFieldValue,
} from "../stores/InspectionStore";

interface INewInspectionPage {}

const NewInspectionPage = observer((props: INewInspectionPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();
  const handleOpenField = (type: InspectionFormTypes) => {
    const foundField = !!store.inspectionStore.fieldsData.find((data) =>
      Object.keys(data).includes(type),
    );
    if (!foundField) {
      store.inspectionStore.getFieldData(type);
    }
  };
  const handleChange = (value: IFormFieldValue | IFormDateFieldValue) => {
    store.inspectionStore.setFormFieldsValues(value as IFormFieldValue);
  };

  return (
    <NewInspectionPageLayout
      navPanel={
        <NavPanel
          actionText={t("createInspection")}
          description={t("addInspectionDescription")}
          title={t("addInspectionTitle")}
        />
      }
      content={
        <InspectionForm
          handleDateChange={handleChange}
          formFieldsValues={store.inspectionStore.formFieldsValues}
          handleChange={handleChange}
          fieldsData={store.inspectionStore.fieldsData}
          handleOpenField={handleOpenField}
        />
      }
    />
  );
});

export default NewInspectionPage;
