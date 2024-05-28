import React, { useCallback, useEffect, useState } from "react";
import style from "./style.module.css";
import { Combobox } from "@consta/uikit/Combobox";
import {
  EMPLOYEES,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { DatePicker } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";
import {
  IFieldsData,
  IFormFieldValue,
  Item,
} from "../../stores/InspectionStore";
import { useFlag } from "@consta/uikit/useFlag";
import { useTranslation } from "react-i18next";
import { toJS } from "mobx";
import { IFilterFieldValue } from "../../stores/MainPageStore";
import { Button } from "@consta/uikit/Button";

interface ICustomFilter {
  type: InspectionFormTypes;
  fieldData: IFieldsData;
  onConfirm: (value: unknown) => void;
  onCancel: () => void;
  filterValue?: unknown;
  filterFieldsValues: Item[];
  onOpen(): void;
  handleChange(value: IFilterFieldValue): void;
}

const CustomFilter = (props: ICustomFilter) => {
  const { t } = useTranslation("dict");

  useEffect(() => {}, []);

  const [open, setOpen] = useFlag();

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
  }, []);

  useEffect(() => {
    if (open) {
      props.onOpen();
    }
  }, [open]);

  const getItems = () => {
    if (props.fieldData && props.type) {
      return props.fieldData[props.type];
    }
    return [];
  };

  const getItemKey = (item: Item) => {
    if (EMPLOYEES.includes(props.type)) {
      return item.personFio ?? "";
    }
    return item.title;
  };

  const [dateValue, setDateValue] = useState<[Date?, Date?] | null>(null);

  return (
    <div className={style.CustomFilter}>
      {props.type === InspectionFormTypes.AuditDate ? (
        <DatePicker
          withClearButton
          type="date-range"
          className={style.DatePicker}
          onChange={setDateValue}
          rightSide={IconCalendar}
          value={dateValue}
        />
      ) : (
        <Combobox
          placeholder={t(`${props.type}Placeholder`)}
          onDropdownOpen={onDropdownOpen}
          getItemLabel={(item) => item.title}
          getItemKey={(item: Item) => getItemKey(item)}
          multiple
          className={style.combobox}
          items={getItems() as Item[]}
          onChange={(val) => props.handleChange({ [props.type]: val })}
          value={props.filterFieldsValues}
        />
      )}
    </div>
  );
};

export default CustomFilter;
