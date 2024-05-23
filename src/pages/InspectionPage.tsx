import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import InspectionForm from "../components/InspectionForm/InspectionForm";
import { useTranslation } from "react-i18next";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { useStore } from "../hooks/useStore";
import {
  IFormDateFieldValue,
  IFormFieldValue,
} from "../stores/InspectionStore";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { RoutesTypes } from "../enums/RoutesTypes";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import Layout from "../layouts/Layout/Layout";
import {isDevelop} from "../constants/config";

interface IInspectionPage {}

const InspectionPage = observer((props: IInspectionPage) => {
  const { t } = useTranslation("dict");

  const store = useStore();

  const navigate = useNavigate();

  let { editInspectionId } = useParams();

  const location = useLocation();

  const [savingState, setSavingState] = useState(false);

  const init = () => {
    if (editInspectionId) {
      if (location.pathname.includes(RoutesTypes.EditLocalInspection)) {
        store.inspectionStore.loadInspectionFromLocalStorage(editInspectionId);
      }
      if (location.pathname.includes(RoutesTypes.EditInspection)) {
        if (isDevelop) {
          store.inspectionStore.getInspectionDev(editInspectionId);
        } else {
          store.inspectionStore.getInspectionById(editInspectionId);
        }
      }
    }
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
  };

  const handleChange = (value: IFormFieldValue | IFormDateFieldValue) => {
    setSavingState(true);
    // store.inspectionStore.setFormFieldsValues(value as IFormFieldValue);
    store.inspectionStore.checkIsFormSuccess();
  };

  const saveInspection = () => {
    editInspectionId
      ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
    store.inspectionStore.setIsValidate(false);
  };
  const handleSaveInspection = () => {
    setSavingState(false);
    saveInspection();
    navigate(-1);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
  };

  const handleEditPassports = () => {};

  const handleNextStepToBarriers = () => {
    const isValid = store.inspectionStore.checkIsFormSuccess();
    console.log("isValid", isValid);
    if (isValid) {
      // saveInspection();
      navigate(RoutesTypes.Passports);
    }
  };
  const handleNextStepToFreeForm = () => {
    console.log('handleNextStepToFreeForm')
    const isValid = store.inspectionStore.checkIsFormSuccess();
    console.log("isValid", isValid);
    if (isValid) {
      // saveInspection();
      // navigate(RoutesTypes.Passports);
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
            onInit={() => store.inspectionStore.setIsValidate(false)}
            handleNextStepToBarriers={handleNextStepToBarriers}
            handleNextStepToFreeForm={handleNextStepToFreeForm}
            formFieldsValuesLength={
              !!Object.values(store.inspectionStore.formFieldsValues ?? {}).length
            }
            handleClearInspectionForm={() => {
              setSavingState(true);
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
      <Outlet />
    </>
  );
});

export default InspectionPage;
