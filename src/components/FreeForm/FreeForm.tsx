import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { FreeFormTypes } from "../../enums/FreeFormTypes";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import {IFieldsData, IFormFieldValue} from "../../interfaces/IFieldInterfaces";
import {IInspection} from "../../interfaces/IInspection";
import {IFreeForm} from "../../interfaces/IFreeForm";

interface IFreeFormProps {
  onInspectionTextFieldClose?(): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  onSearchValueChange?(value: string | null): void;


  handleChange(value: IFormFieldValue): void;
  handleOpenField(type: InspectionFormTypes): void;
  fieldsData: IFieldsData[];
  isValidate: boolean;
  formFieldsValues: IFreeForm | null;

}

const FreeForm = observer((props: IFreeFormProps) => {
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
            // value={getValue(inspectionType)}
            fieldsData={props.fieldsData}
            handleChange={props.handleChange}
            handleOpenField={props.handleOpenField}
            status={props.isValidate ? getStatus(field) : undefined}
          />
        ))}
      </div>
    </div>
  );
});

export default FreeForm;
