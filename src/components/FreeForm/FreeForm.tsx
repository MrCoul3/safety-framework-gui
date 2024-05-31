import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { FreeFormTypes } from "../../enums/FreeFormTypes";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import {
  IFieldsData,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { IInspection } from "../../interfaces/IInspection";
import { IFreeForm } from "../../interfaces/IFreeForm";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import {toJS} from "mobx";

interface IFreeFormProps {
  onInspectionTextFieldClose?(): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  onSearchValueChange?(value: string | null): void;

  handleChange(value: IFormFieldValue): void;
  handleClearForm?(): void;
  handleOpenField(type: InspectionFormTypes): void;
  onInit?(): void;
  handleSaveForm(): void;
  handleDelete?(): void;

  setIsValidate(value: boolean): void;

  fieldsData: IFieldsData[];
  isValidate: boolean;
  formFieldsValues: IFreeForm | null;
  formFieldsValuesLength?: boolean;
}

const FreeForm = observer((props: IFreeFormProps) => {
  const { t } = useTranslation("dict");

  const fields = [
    FreeFormTypes.ViolationCategories,
    FreeFormTypes.ViolationTypes,
    FreeFormTypes.Violations,
    FreeFormTypes.WorkTypes,
    FreeFormTypes.CorpDicts,
    FreeFormTypes.Nmds,
    FreeFormTypes.NmdRules,
    FreeFormTypes.OdOuCategories,
    FreeFormTypes.RiskLevels,
  ];

  useEffect(() => {
    props.onInit?.();
  }, []);

  const requiredConditions = (field: FreeFormTypes) => {
    const notReqFields = [FreeFormTypes.CorpDicts];

    return !notReqFields.includes(field);
  };

  const getStatus = (type: FreeFormTypes) => {
    if (props.formFieldsValues) {
      const condition = props.formFieldsValues[type];
      if (!condition) {
        return "alert";
      }
    }
    return "success";
  };

  const [isClearModalOpen, setIsClearModalOpen] = React.useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = React.useState(false);
  const handleSave = () => {
    props.setIsValidate(true);
    props.handleSaveForm()
  };

  const getValue = (field: FreeFormTypes): string => {
    if (props.formFieldsValues) {
      return props.formFieldsValues[field]?.title as string;
    }
    return "";
  };


  return (
    <div className={style.FreeForm}>
      <div className={style.form}>
        {fields.map((field) => (
          <InspectionTextField
            onClose={props.onInspectionTextFieldClose}
            onScrollToBottom={props.onScrollToBottom}
            onSearchValueChange={props.onSearchValueChange}
            required={requiredConditions(field)}
            inspectionType={field}
            value={getValue(field)}
            fieldsData={props.fieldsData}
            handleChange={props.handleChange}
            handleOpenField={props.handleOpenField}
            status={props.isValidate ? getStatus(field) : undefined}
          />
        ))}
      </div>

      <div className={style.buttonsGroup}>
        <Button onClick={() => setIsDelModalOpen(true)} view="ghost" label={t("delete")} />
        <div className={style.flexContainer}>
          <Button
            onClick={() => props.formFieldsValuesLength && setIsClearModalOpen(true)}
            view="clear"
            label={t("clear")}
          />
          <Button onClick={handleSave} type="submit" label={t("save")} />
        </div>
      </div>
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("clear")}
        title={t("dialogClearFields")}
        action={() => props.handleClearForm?.()}
        onClose={() => setIsClearModalOpen(false)}
        open={isClearModalOpen}
      />
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("delete")}
        title={t("dialogDeleteFreeForm")}
        action={() => props.handleDelete?.()}
        onClose={() => setIsDelModalOpen(false)}
        open={isDelModalOpen}
      />
    </div>
  );
});

export default FreeForm;
