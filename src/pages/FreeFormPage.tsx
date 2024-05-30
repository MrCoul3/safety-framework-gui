import React from "react";
import { observer } from "mobx-react-lite";
import NavPanel from "../components/NavPanel/NavPanel";
import { Button } from "@consta/uikit/Button";
import PassportsList from "../components/PassportsList/PassportsList";
import PassportElement from "../components/PassportElement/PassportElement";
import Layout from "../layouts/Layout/Layout";
import { IBreadCrumbs } from "../interfaces/IBreadCrumbs";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useStore } from "../hooks/useStore";
import { IconAdd } from "@consta/icons/IconAdd";
import FreeFormsList from "../components/FreeFormsList/FreeFormsList";
import FreeForm from "../components/FreeForm/FreeForm";
import { IFormFieldValue } from "../interfaces/IFieldInterfaces";
import { InspectionFormTypes } from "../enums/InspectionFormTypes";
import { IInspection } from "../interfaces/IInspection";
import { IFreeForm } from "../interfaces/IFreeForm";
import BarrierElement from "../components/BarrierElement/BarrierElement";
import CollapseElement from "../components/CollapseElement/CollapseElement";
import FreeFormElementLabel from "../components/FreeFormElementLabel/FreeFormElementLabel";

interface IFreeFormPage {}

const FreeFormPage = observer((props: IFreeFormPage) => {
  const { t } = useTranslation("dict");

  let { editInspectionId } = useParams();

  const store = useStore();

  const navigate = useNavigate();

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
  const saveInspection = () => {
    editInspectionId
      ? store.inspectionStore.updateInspectionToLocalStorage(editInspectionId)
      : store.inspectionStore.setInspectionToLocalStorage();
  };

  const handleSaveInspection = () => {
    saveInspection();
    navigate(-2);
    store.snackBarStore.setSnackBarItem({
      message: t("snackBarSuccessSave"),
      key: "1",
      status: "success",
    });
  };

  const handleAddFreeForm = () => {};

  const handleChange = (value: IFormFieldValue) => {
    console.log("handleChange", value);
    // store.inspectionStore.updateFormFieldsValues(value);
    // setSavingState(true);
    // store.inspectionStore.checkIsFormSuccess();
  };

  const handleOpenField = (type: InspectionFormTypes) => {
    // store.inspectionStore.handleOpenField(type);
    // setOpenFilterType(type);
  };

  return (
    <Layout
      navPanel={
        <NavPanel
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
          content={
            <CollapseElement
              label={<FreeFormElementLabel title={t("freeForm")} />}
              key={0}
              content={
                <FreeForm
                  fieldsData={store.inspectionStore.fieldsData}
                  isValidate={store.inspectionStore.isValidate}
                  formFieldsValues={
                    store.inspectionStore.formFieldsValues as IFreeForm
                  }
                  handleOpenField={handleOpenField}
                  handleChange={handleChange}
                />
              }
            />
          }
        />
      }
    />
  );
});

export default FreeFormPage;
