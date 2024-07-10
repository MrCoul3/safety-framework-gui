import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Card } from "@consta/uikit/Card";
import {
  ViolationFilterTypes,
  violationsDictionaryOfConformity,
} from "../../enums/ViolationFilterTypes";
import InspectionDataField from "../InspectionDataField/InspectionDataField";
import {
  IFieldsData,
  IFilterDateRangeFieldValue,
  IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../../interfaces/IFieldInterfaces";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import moment from "moment";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import { toJS } from "mobx";
import { IInspection } from "../../interfaces/IInspection";
import { DatePicker } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";
import { useTranslation } from "react-i18next";
import { IEntity } from "../../interfaces/IEntity";
import { Checkbox } from "@consta/uikit/Checkbox";
import { SubGroupsActionsTypes } from "../../enums/SubGroupsTypes";
import { Button } from "@consta/uikit/Button";
import { IViolation } from "../../interfaces/IViolation";

interface IFilterPanel {
  handleDateChange(value: IFilterDateRangeFieldValue): void;
  onScrollToBottom?(inspectionType: ViolationFilterTypes): void;
  onSearchValueChange?(value: string | null): void;
  onInspectionTextFieldClose?(): void;

  handleChange(value: IFormFieldValue): void;
  handleChecked?(value: boolean): void;
  resetFilters?(): void;
  submitFilter(): void;
  handleOpenField(type: ViolationFilterTypes): void;
  formFieldsValues: IInspection | null;
  fieldsData: IFieldsData[];

  isSubmitAvailable?: boolean;
}

const FilterPanel = observer((props: IFilterPanel) => {
  const { t } = useTranslation("violationsDict");

  const fields = [
    ViolationFilterTypes.TypeList,
    ViolationFilterTypes.Orgs,
    ViolationFilterTypes.Oilfields,
    ViolationFilterTypes.Struct,
    ViolationFilterTypes.Obj,
  ];

  useEffect(() => {
    console.log("FilterPanel props.fieldsData", toJS(props.fieldsData));
  }, [props.fieldsData]);

  const getViolationsDictionaryOfConformity = (type: ViolationFilterTypes) => {
    if (type !== ViolationFilterTypes.Date) {
      return violationsDictionaryOfConformity[type];
    }
  };

  const getValue = (type: ViolationFilterTypes): string => {
    const typeValue = getViolationsDictionaryOfConformity(type);
    if (props.formFieldsValues && typeValue) {
      if (type === ViolationFilterTypes.TypeList) {
        return (props.formFieldsValues[typeValue] as IEntity)?.code as string;
      } else {
        return props.formFieldsValues[typeValue]?.title as string;
      }
    }
    return "";
  };

  const getType = (type: ViolationFilterTypes) => {
    if (type !== ViolationFilterTypes.Date) {
      return violationsDictionaryOfConformity[type];
    }
    return type;
  };

  const [checked, setChecked] = useState(false);
  const onChangeCheckbox = () => {
    setChecked(checked);
    props.handleChecked?.(getCheckedValue());
  };
  const getCheckedValue = () => {
    const value = (props.formFieldsValues as unknown as IViolation)?.isResolved;
    return value !== undefined ? value : true;
  };

  return (
    <Card className={style.FilterPanel}>
      <div>
        <DatePicker
          labelPosition="top"
          label={t(ViolationFilterTypes.Date)}
          withClearButton
          type="date-range"
          className={style.DatePicker}
          onChange={(dateRangeValue) =>
            props.handleDateChange({
              [ViolationFilterTypes.Date]: dateRangeValue,
            } as IFilterDateRangeFieldValue)
          }
          rightSide={IconCalendar}
          value={props.formFieldsValues?.[ViolationFilterTypes.Date]}
        />
        {fields.map((field) => (
          <InspectionTextField
            translationDict={"violationsDict"}
            className={"none"}
            labelPosition={"top"}
            onClose={props.onInspectionTextFieldClose}
            onScrollToBottom={props.onScrollToBottom}
            onSearchValueChange={props.onSearchValueChange}
            inspectionType={getType(field)}
            value={getValue(field)}
            fieldsData={props.fieldsData}
            handleChange={props.handleChange}
            handleOpenField={props.handleOpenField}
          />
        ))}
        <Checkbox
          className={style.Checkbox}
          onChange={onChangeCheckbox}
          label={t("hideFixedViolations")}
          checked={getCheckedValue()}
        />
      </div>

      <div className={style.controlButtonGroup}>
        <Button disabled={!Object.values(props.formFieldsValues ?? {}).length}
          onClick={props.resetFilters}
          iconSize="s"
          view="secondary"
          label={t("reset")}
        />
        <Button
          onClick={props.submitFilter}
          className={style.editButton}
          label={t("apply")}
        />
      </div>
    </Card>
  );
});

export default FilterPanel;
