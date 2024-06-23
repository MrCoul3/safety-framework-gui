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
import { toJS } from "mobx";
import { RoutesTypes } from "../enums/RoutesTypes";
import i18next from "i18next/index";

interface IFreeFormPage {}

const FreeFormPage = observer((props: IFreeFormPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();

  const navigate = useNavigate();

  let { editInspectionId } = useParams();

  useEffect(() => {
    console.log(
      "FreeFormPage formFieldsValues",
      toJS(store.inspectionStore.formFieldsValues),
    );
  }, []);

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
  const getFreeFormsFromFieldsData = () => {
    console.log(
      "getFreeFormsFromFormFieldsData",
      toJS(store.inspectionStore.formFieldsValues),
    );
    const freeForms = (store.inspectionStore.formFieldsValues as IInspection)[
      "filledFreeForms"
    ];
    if (freeForms) {
      store.freeFormStore.setFreeForm(freeForms);
    }
  };

  const loadInspection = async () => {
    if (editInspectionId) {
      store.inspectionStore.loadInspection(editInspectionId);
    }
  };
  const init = async () => {
    if (!Object.keys(store.inspectionStore.formFieldsValues).length) {
      await loadInspection();
    }
    getFreeFormsFromFieldsData();
    setIsFormsValidForSending(store.freeFormStore.checkIsFreeFormSuccess());
  };

  useEffect(() => {
    init();
  }, []);

  const saveInspection = () => {
    if (
      location.pathname.includes(RoutesTypes.EditLocalInspection) &&
      editInspectionId
    ) {
      store.freeFormStore.updateInspectionToLocalStorage(editInspectionId);
      store.snackBarStore.setSnackBarItem({
        message: t("snackBarSuccessSave"),
        key: "1",
        status: "success",
      });
    }
    if (
      location.pathname.includes(RoutesTypes.NewInspection) ||
      location.pathname.includes(RoutesTypes.EditInspection)
    ) {
      store.inspectionStore.setInspectionToLocalStorage();
      store.snackBarStore.setSnackBarItem({
        message: t("snackBarSuccessSaveBarrier"),
        key: "1",
        status: "success",
      });
    }
    store.inspectionStore.setIsValidate(false);
  };
  const handleSaveForm = () => {
    store.inspectionStore.setSavingState(false);
    saveInspection();
  };

  const handleSaveInspection = () => {
    store.inspectionStore.setSavingState(false);
    saveInspection();
    navigate(-2);
  };

  const handleAddFreeForm = () => {
    store.freeFormStore.addFreeForm();
    store.inspectionStore.setFilledFreeForms(
      store.freeFormStore.filledFreeForms,
    );
    store.inspectionStore.setSavingState(true);
  };

  const [isFormsValidForSending, setIsFormsValidForSending] = useState(false);

  const handleChange = (value: IFormFieldValue, index: number) => {
    console.log("handleChange", value);
    store.inspectionStore.setSavingState(true);
    store.freeFormStore.updateFormFieldsValues(value, index);
    const isValid = store.freeFormStore.checkIsFreeFormSuccess();
    store.inspectionStore.setFilledFreeForms(
      store.freeFormStore.filledFreeForms,
    );
    console.log("handleSendInspection isValid", isValid);
    setIsFormsValidForSending(isValid);
  };

  const handleOpenField = (type: InspectionFormTypes) => {
    store.inspectionStore.handleOpenField(type);
    setOpenFilterType(type);
  };
  const handleClearForm = (index: number) => {
    store.freeFormStore.clearFreeForm(index);
    store.inspectionStore.setFilledFreeForms(
      store.freeFormStore.filledFreeForms,
    );
    store.inspectionStore.setSavingState(true);
  };

  const handleDelete = (index: number) => {
    store.freeFormStore.deleteFreeForm(index);
    store.inspectionStore.setFilledFreeForms(
      store.freeFormStore.filledFreeForms,
    );
    store.inspectionStore.setSavingState(true);
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

  const [openFilterType, setOpenFilterType] =
    useState<InspectionFormTypes | null>(null);

  const handleSearchValueChange = (value: string | null) => {
    store.inspectionStore.handleSearchValueChange(value, openFilterType);
  };

  const handleScrollFieldToBottom = (inspectionType: InspectionFormTypes) => {
    store.inspectionStore.increaseOffset();
    store.inspectionStore.getFieldData(inspectionType);
  };

  const handleInspectionTextFieldClose = () => {
    setOpenFilterType(null);
    store.inspectionStore.clearOffset();
    store.inspectionStore.clearFieldsData();
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
          disableSaveButton={!store.inspectionStore.savingState}
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
                    setSavingState={(value) =>
                      store.inspectionStore.setSavingState(value)
                    }
                    savingState={store.inspectionStore.savingState}
                    onScrollToBottom={handleScrollFieldToBottom}
                    onInspectionTextFieldClose={handleInspectionTextFieldClose}
                    onSearchValueChange={handleSearchValueChange}
                    isOtherCondition={store.freeFormStore.isOtherCondition(
                      formFieldsValues as IFreeForm,
                    )}
                    handleDelete={() => handleDelete(index)}
                    setIsValidate={() =>
                      store.inspectionStore.setIsValidate(true)
                    }
                    handleSaveForm={handleSaveForm}
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
