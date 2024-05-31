import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import InspectionForm from "../components/InspectionForm/InspectionForm";
import { useTranslation } from "react-i18next";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { useStore } from "../hooks/useStore";

import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { RoutesTypes } from "../enums/RoutesTypes";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import Layout from "../layouts/Layout/Layout";
import { isDevelop } from "../constants/config";
import {
  IFormDateFieldValue,
  IFormFieldValue,
} from "../interfaces/IFieldInterfaces";
import { IInspection } from "../interfaces/IInspection";
import { Button } from "@consta/uikit/Button";
import { toJS } from "mobx";

interface IInspectionPage {}

const InspectionPage = observer((props: IInspectionPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();

  const navigate = useNavigate();

  let { editInspectionId } = useParams();

  const location = useLocation();

  const [savingState, setSavingState] = useState(false);

  const [openFilterType, setOpenFilterType] =
    useState<InspectionFormTypes | null>(null);

  const loadInspection = () => {
    if (editInspectionId) {
      store.inspectionStore.loadInspection(editInspectionId);
    }
  };
  const init = () => {
    loadInspection();
  };

  useEffect(() => {
    init();
    window.addEventListener("keydown", handleKeyBoardEvent);
    return () => window.removeEventListener("keydown", handleKeyBoardEvent);
  }, []);

  const handleKeyBoardEvent = (e: KeyboardEvent) => {
    if (e.altKey && e.keyCode === 83) {
      handleSaveInspection();
    }
  };

  const handleOpenField = (type: InspectionFormTypes) => {
    store.inspectionStore.handleOpenField(type);
    setOpenFilterType(type);
  };

  const handleChange = (value: IFormFieldValue) => {
    console.log("handleChange", value);
    store.inspectionStore.updateFormFieldsValues(value);
    setSavingState(true);
    store.inspectionStore.checkIsFormSuccess();
  };

  const handleDateChange = (value: IFormDateFieldValue) => {
    console.log("handleDateChange", value);
    store.inspectionStore.updateFormFieldsValues(value);
    setSavingState(true);
    store.inspectionStore.checkIsFormSuccess();
  };

  const saveInspection = () => {
    if (
      location.pathname.includes(RoutesTypes.EditLocalInspection) &&
      editInspectionId
    ) {
      store.inspectionStore.updateInspectionToLocalStorage(editInspectionId);
    }
    if (location.pathname.includes(RoutesTypes.NewInspection)) {
      store.inspectionStore.setInspectionToLocalStorage();
    }
    if (location.pathname.includes(RoutesTypes.EditInspection)) {
      store.inspectionStore.setInspectionToLocalStorage();
    }
    store.inspectionStore.setIsValidate(false);
  };

  const renderSaveSnackBar = () => {
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
  };

  const handleSaveInspection = () => {
    setSavingState(false);
    saveInspection();
    navigate(-1);
    renderSaveSnackBar();
  };

  const handleEditPassports = () => {};

  const handleNextStepToPassports = () => {
    const isValid = store.inspectionStore.checkIsFormSuccess();
    console.log("isValid", isValid);
    if (isValid) {
      saveInspection();
      renderSaveSnackBar();
      navigate(RoutesTypes.Passports);
    }
  };
  const handleNextStepToFreeForm = () => {
    console.log("handleNextStepToFreeForm");
    const isValid = store.inspectionStore.checkIsFormSuccess();
    console.log("isValid", isValid);
    if (isValid) {
      // saveInspection();
      renderSaveSnackBar();
      navigate(RoutesTypes.FreeForm);
    }
  };

  const crumbs: IBreadCrumbs[] = [
    {
      label: t("mainPage"),
      index: -1,
      href: "#",
      path: "main",
    },
    {
      label: t("inspectionData"),
    },
  ];

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

  const handleScrollFieldToBottom = (inspectionType: InspectionFormTypes) => {
    console.log("handleScrollFieldToBottom!!!");
    store.inspectionStore.increaseOffset();
    store.inspectionStore.getFieldData(inspectionType);
  };
  const handleInspectionTextFieldClose = () => {
    setOpenFilterType(null);
    store.inspectionStore.clearOffset();
    store.inspectionStore.clearFieldsData();
  };

  return (
    <>
      <Layout
        navPanel={
          <NavPanel
            crumbs={crumbs}
            disableSaveButton={!savingState}
            handleEditPassports={handleEditPassports}
            handleSaveInspection={handleSaveInspection}
            description={t("addInspectionDescription")}
            title={
              !editInspectionId
                ? t("addInspectionTitle")
                : t("editInspectionTitle")
            }
          />
        }
        content={
          <InspectionForm
            onInspectionTextFieldClose={handleInspectionTextFieldClose}
            onScrollToBottom={handleScrollFieldToBottom}
            onSearchValueChange={handleSearchValueChange}
            onInit={() => store.inspectionStore.setIsValidate(false)}
            handleNextStepToBarriers={handleNextStepToPassports}
            handleNextStepToFreeForm={handleNextStepToFreeForm}
            formFieldsValuesLength={
              !!Object.values(store.inspectionStore.formFieldsValues).length
            }
            handleClearInspectionForm={() => {
              setSavingState(true);
              store.inspectionStore.clearInspectionForm();
              store.inspectionStore.setIsValidate(false);
            }}
            setIsValidate={() => store.inspectionStore.setIsValidate(true)}
            isValidate={store.inspectionStore.isValidate}
            formFieldsValues={
              store.inspectionStore.formFieldsValues as IInspection
            }
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            fieldsData={store.inspectionStore.fieldsData}
            handleOpenField={handleOpenField}
          />
        }
      />
      <Outlet />
    </>
  );
});

export default InspectionPage;
