import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import { Button } from "@consta/uikit/Button";
import Layout from "../layouts/Layout/Layout";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";
import { useStore } from "../hooks/useStore";
import { IconAdd } from "@consta/icons/IconAdd";
import { IconWarning } from "@consta/icons/IconWarning";
import FreeFormsList from "../components/FreeFormsList/FreeFormsList";
import FreeForm from "../components/FreeForm/FreeForm";
import { IFormFieldValue } from "../interfaces/IFieldInterfaces";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { IFreeForm } from "../interfaces/IFreeForm";
import CollapseElement from "../components/CollapseElement/CollapseElement";
import FreeFormElementLabel from "../components/FreeFormElementLabel/FreeFormElementLabel";
import { IInspection } from "../interfaces/IInspection";
import SnackBarCustom from "../components/SnackBarCustom/SnackBarCustom";
import {toJS} from "mobx";

interface IFreeFormPage {}

const FreeFormPage = observer((props: IFreeFormPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();

  const navigate = useNavigate();

  let { editInspectionId } = useParams();

  const crumbs: IBreadCrumbs[] = [
    {
      label: t("mainPage"),
      index: -2,
      href: "#",
    },
    {
      label: t("inspectionData"),
      index: -1,
      href: "#",
    },
    {
      label: t("completionFreeForm"),
    },
  ];
  const getFreeFormsFromFormFieldsData = () => {
    console.log('getFreeFormsFromFormFieldsData', toJS(store.inspectionStore.formFieldsValues))
    const freeForms = (store.inspectionStore.formFieldsValues as IInspection)[
      "filledFreeForms"
    ];
    if (freeForms) {
      store.freeFormStore.setFreeForm(freeForms);
    }
  };

  const loadInspection = () => {
    if (editInspectionId) {
      store.inspectionStore.loadInspection(editInspectionId);
    }
  };
  const init = () => {
    loadInspection();
    getFreeFormsFromFormFieldsData();
    setIsFormsValidForSending(store.freeFormStore.checkIsFreeFormSuccess());
  };

  useEffect(() => {
    init();
  }, []);

  const saveInspection = () => {
    editInspectionId
      ? store.freeFormStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
  };

  const handleSaveForm = (index: number) => {
    console.log("handleSaveForm", index);
    editInspectionId
      ? store.freeFormStore.saveEditInspectionFreeFormToLocalStorage(
          editInspectionId,
          index,
        )
      : handleSaveInspection();
  };

  const handleSaveInspection = () => {
    setSavingState(false);
    saveInspection();
    navigate(-2);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
  };

  const handleAddFreeForm = () => {
    store.freeFormStore.addFreeForm();
    setSavingState(true);
  };

  const [savingState, setSavingState] = useState(false);

  const [isFormsValidForSending, setIsFormsValidForSending] = useState(false);

  const handleChange = (value: IFormFieldValue, index: number) => {
    console.log("handleChange", value);
    setSavingState(true);
    store.freeFormStore.updateFormFieldsValues(value, index);
    const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    console.log("handleSendInspection isValid", isValid);
    setIsFormsValidForSending(isValid);
  };

  const handleOpenField = (type: InspectionFormTypes) => {
    store.inspectionStore.handleOpenField(type);
  };
  const handleClearForm = (index: number) => {
    store.freeFormStore.clearFreeForm(index);
    setSavingState(true);
  };

  const handleDelete = (index: number) => {
    store.freeFormStore.deleteFreeForm(index);
    setSavingState(true);
  };
  const handleSendInspection = async () => {
    const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    store.inspectionStore.setIsValidate(true);
    console.log("handleSendInspection isValid", isValid);
    if (isValid) {
      const result = await store.inspectionStore.sendInspection();
      if (result) {
        if (editInspectionId)
          store.inspectionStore.deleteInspectionFromLocalStorage(
            +editInspectionId - 1,
          );
        navigate(-2);
        store.snackBarStore.setSnackBarItem({
          message: t("snackBarSuccessSend"),
          key: "1",
          status: "success",
        });
      } else {
        store.snackBarStore.setSnackBarItem({
          message: t("snackBarErrorSend"),
          key: "1",
          status: "alert",
          icon: IconWarning,
        });
      }
    }
  };

  return (
    <Layout
      navPanel={
        <NavPanel
          sendButton={
            <Button
              disabled={!isFormsValidForSending}
              onClick={handleSendInspection}
              label={t("sendInspection")}
            />
          }
          disableSaveButton={!savingState}
          actions={
            <Button
              onClick={() => navigate(-1)}
              label={t("toInspectionForm")}
              view={"secondary"}
            />
          }
          crumbs={crumbs}
          handleSaveInspection={handleSaveInspection}
          title={t("completionFreeForm")}
          description={t("completionFreeFormDescription")}
        />
      }
      content={
        <FreeFormsList
          control={
            <Button
              iconRight={IconAdd}
              onClick={handleAddFreeForm}
              label={t("addFreeForm")}
            />
          }
          content={store.freeFormStore.filledFreeForms.map(
            (formFieldsValues, index) => (
              <CollapseElement
                label={
                  <FreeFormElementLabel
                    title={`${t("freeForm")} ${index + 1}`}
                  />
                }
                key={index}
                content={
                  <FreeForm
                    isOtherCondition={store.freeFormStore.isOtherCondition(
                      formFieldsValues as IFreeForm,
                    )}
                    handleDelete={() => handleDelete(index)}
                    setIsValidate={() =>
                      store.inspectionStore.setIsValidate(true)
                    }
                    handleSaveForm={() => handleSaveForm(index)}
                    onInit={() => store.inspectionStore.setIsValidate(false)}
                    handleChange={(value: IFormFieldValue) =>
                      handleChange(value, index)
                    }
                    handleOpenField={handleOpenField}
                    handleClearForm={() => handleClearForm(index)}
                    formFieldsValuesLength={
                      !!Object.values(formFieldsValues).length
                    }
                    fieldsData={store.inspectionStore.fieldsData}
                    isValidate={store.inspectionStore.isValidate}
                    formFieldsValues={formFieldsValues as IFreeForm}
                  />
                }
              />
            ),
          )}
        />
      }
    />
  );
});

export default FreeFormPage;
