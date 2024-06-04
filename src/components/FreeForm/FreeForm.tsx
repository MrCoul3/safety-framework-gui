import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  FREE_FORM_COMMON_FIELDS,
  FreeFormFieldTypes,
} from "../../enums/FreeFormTypes";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import {
  IFieldsData,
  IFormFieldTextValue,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { IFreeForm } from "../../interfaces/IFreeForm";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import InspectionTextArea from "../InspectionTextArea/InspectionTextArea";

interface IFreeFormProps {
  onInspectionTextFieldClose?(): void;

  onScrollToBottom?(inspectionType: InspectionFormTypes): void;

  onSearchValueChange?(value: string | null): void;

  handleChange(value: IFormFieldValue | IFormFieldTextValue): void;
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
  isOtherCondition?: boolean;
}

const FreeForm = observer((props: IFreeFormProps) => {
  const { t } = useTranslation("dict");

  const fields = FREE_FORM_COMMON_FIELDS;

  useEffect(() => {
    props.onInit?.();
  }, []);

  const [savingState, setSavingState] = useState(false);

  const requiredConditions = (field: FreeFormFieldTypes) => {
    const notReqFields = [""];

    if (field === FreeFormFieldTypes.Violation && props.isOtherCondition) {
      return false;
    }

    return !notReqFields.includes(field);
  };

  const getStatus = (type: FreeFormFieldTypes) => {
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
    setSavingState(false);
    props.handleSaveForm();
  };

  const getValue = (field: FreeFormFieldTypes): string => {
    if (props.formFieldsValues) {
      if (field === FreeFormFieldTypes.ViolationManual) {
        return props.formFieldsValues[field] as string;
      }
      return props.formFieldsValues[field]?.title as string;
    }
    return "";
  };

  const handleChange = (value: IFormFieldValue | IFormFieldTextValue) => {
    console.log("handleChange", value);
    props.handleChange(value);
    setSavingState(true);
  };

  useEffect(() => {
    console.log("props.isValidate", props.isValidate);
  }, [props.isValidate]);

  return (
    <div className={style.FreeForm}>
      <div className={style.form}>
        {fields.map((field) => {
          if (field === FreeFormFieldTypes.ViolationManual) {
            return (
              <InspectionTextArea
                required={true}
                display={props.isOtherCondition}
                value={getValue(field)}
                handleChange={handleChange}
                inspectionType={field}
                status={props.isValidate ? getStatus(field) : undefined}
              />
            );
          }
          return (
            <InspectionTextField
              onClose={props.onInspectionTextFieldClose}
              onScrollToBottom={props.onScrollToBottom}
              onSearchValueChange={props.onSearchValueChange}
              required={requiredConditions(field)}
              inspectionType={field}
              value={getValue(field)}
              fieldsData={props.fieldsData}
              handleChange={handleChange}
              handleOpenField={props.handleOpenField}
              status={props.isValidate ? getStatus(field) : undefined}
            />
          );
        })}
      </div>

      <div className={style.buttonsGroup}>
        <Button
          onClick={() => setIsDelModalOpen(true)}
          view="ghost"
          label={t("delete")}
        />
        <div className={style.flexContainer}>
          <Button
            onClick={() =>
              props.formFieldsValuesLength && setIsClearModalOpen(true)
            }
            view="clear"
            label={t("clear")}
          />
          <Button
            disabled={!savingState}
            onClick={handleSave}
            type="submit"
            label={t("save")}
          />
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
