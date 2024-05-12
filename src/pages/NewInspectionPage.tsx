import React, { useEffect } from "react";
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
    if (e.ctrlKey && e.keyCode === 13) {
      handleCreateInspection();
    }
  };

  const navigate = useNavigate();

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
    store.inspectionStore.checkIsFormSuccess();
  };
  const handleCreateInspection = () => {
    store.inspectionStore.setIsValidate(true);
    const isFormValid = store.inspectionStore.checkIsFormSuccess();
    if (isFormValid) {
      editInspectionId
        ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
        : store.inspectionStore.setInspectionToLocalStorage();
      store.inspectionStore.setIsValidate(false);
      navigate(-1);
    }
  };

  const handleEditPassports = () => {};

  return (
    <NewInspectionPageLayout
      navPanel={
        <NavPanel
          handleEditPassports={handleEditPassports}
          handleCreateInspection={handleCreateInspection}
          formFieldsValuesLength={
            !!Object.values(store.inspectionStore.formFieldsValues).length
          }
          handleClearInspectionForm={() => {
            store.inspectionStore.clearInspectionForm();
            store.inspectionStore.setIsValidate(false);
          }}
          description={t("addInspectionDescription")}
          title={t("addInspectionTitle")}
        />
      }
      content={
        <InspectionForm
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
