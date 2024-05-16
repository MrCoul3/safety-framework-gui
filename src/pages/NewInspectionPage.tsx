import React, {useEffect, useState} from "react";
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
import { useNavigate, useParams } from "react-router";

interface INewInspectionPage {}

const NewInspectionPage = observer((props: INewInspectionPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();

  let { editInspectionId } = useParams();

  const [savingState, setSavingState] = useState(false)

  useEffect(() => {
    if (editInspectionId) {
      store.inspectionStore.loadInspectionFromLocalStorage(editInspectionId);
    }
  }, [editInspectionId]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyBoardEvent);
    return () => store.inspectionStore.clearInspectionForm();
  }, []);

  const handleKeyBoardEvent = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.keyCode === 83) {
      handleSaveInspection();
    }
  };

  const handleOpenField = (type: InspectionFormTypes) => {
    store.inspectionStore.handleOpenField(type);
  };

  const handleChange = (value: IFormFieldValue | IFormDateFieldValue) => {
    setSavingState(true)
    store.inspectionStore.setFormFieldsValues(value as IFormFieldValue);
    store.inspectionStore.checkIsFormSuccess();
  };
  const handleSaveInspection = () => {
    setSavingState(false)
    editInspectionId
      ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
    store.inspectionStore.setIsValidate(false);
  };

  const handleEditPassports = () => {};

  return (
    <NewInspectionPageLayout
      navPanel={
        <NavPanel
          disableSaveButton={!savingState}
          handleEditPassports={handleEditPassports}
          handleSaveInspection={handleSaveInspection}
          description={t("addInspectionDescription")}
          title={t("addInspectionTitle")}
        />
      }
      content={
        <InspectionForm
          formFieldsValuesLength={
            !!Object.values(store.inspectionStore.formFieldsValues).length
          }
          handleClearInspectionForm={() => {
            setSavingState(true)
            store.inspectionStore.clearInspectionForm();
            store.inspectionStore.setIsValidate(false);
          }}
          setIsValidate={() => store.inspectionStore.setIsValidate(true)}
          isValidate={store.inspectionStore.isValidate}
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
