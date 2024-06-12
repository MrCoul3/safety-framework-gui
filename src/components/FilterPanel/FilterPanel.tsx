import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Card } from "@consta/uikit/Card";
import { ViolationFilterTypes } from "../../enums/ViolationFilterTypes";
import InspectionDataField from "../InspectionDataField/InspectionDataField";
import {IFieldsData, IFormDateFieldValue, IFormFieldValue, Item} from "../../interfaces/IFieldInterfaces";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import moment from "moment";
import InspectionTextField from "../InspectionTextField/InspectionTextField";

interface IFilterPanel {
  handleDateChange(value: IFormDateFieldValue): void;
  onScrollToBottom?(inspectionType: ViolationFilterTypes): void;
  onSearchValueChange?(value: string | null): void;
  onInspectionTextFieldClose?(): void;

  handleChange(value: IFormFieldValue): void;
  handleOpenField(type: ViolationFilterTypes): void;

  fieldsData: IFieldsData[];

}

const FilterPanel = observer((props: IFilterPanel) => {
  const fields = [
    ViolationFilterTypes.TypeList,
    ViolationFilterTypes.Orgs,
    ViolationFilterTypes.Oilfields,
    ViolationFilterTypes.Struct,
    ViolationFilterTypes.Obj,
  ];

  const getDate = (type: ViolationFilterTypes) => {
    /* if (props.formFieldsValues) {
            return props.formFieldsValues[type];
        }*/
    return moment().toDate();
  };

  const getValue = (inspectionFormType: ViolationFilterTypes): string => {
   /* if (props.formFieldsValues) {
      if (
          inspectionFormType !== InspectionFormTypes.AuditDate &&
          inspectionFormType !== InspectionFormTypes.Auditor &&
          inspectionFormType !== InspectionFormTypes.Auditee &&
          inspectionFormType !== InspectionFormTypes.Supervisor
      ) {
        return props.formFieldsValues[inspectionFormType]?.title as string;
      } else if (inspectionFormType !== InspectionFormTypes.AuditDate) {
        return props.formFieldsValues[inspectionFormType]?.personFio as string;
      }
    }*/
    return "";
  };

  return (
    <Card className={style.FilterPanel}>
      FilterPanel
      <InspectionDataField
        className={"none"}
        required={false}
        labelPosition={"top"}
        key={ViolationFilterTypes.Date}
        inspectionType={ViolationFilterTypes.Date}
        handleChange={props.handleDateChange}
        value={getDate(ViolationFilterTypes.Date) as Date | null}
      />
      {fields.map((field) => (
        <InspectionTextField
          onClose={props.onInspectionTextFieldClose}
          onScrollToBottom={props.onScrollToBottom}
          onSearchValueChange={props.onSearchValueChange}
          inspectionType={field}
          value={getValue(field)}
          fieldsData={props.fieldsData}
          handleChange={props.handleChange}
          handleOpenField={props.handleOpenField}
        />
      ))}
    </Card>
  );
});

export default FilterPanel;
