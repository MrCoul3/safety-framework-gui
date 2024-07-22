import React, { useCallback, useEffect, useState } from "react";
import style from "./style.module.css";
import { Combobox } from "@consta/uikit/Combobox";
import {
  EMPLOYEES,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { DatePicker } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";

import { useFlag } from "@consta/uikit/useFlag";
import { useTranslation } from "react-i18next";
import { toJS } from "mobx";
import { useDebounce } from "@consta/uikit/useDebounce";
import { ELEMENTS_ON_FIELD } from "../../constants/config";
import {
  IFieldsData,
  IFilterDateRangeFieldValue,
  IFilterFieldValue,
  Item,
} from "../../interfaces/IFieldInterfaces";

interface ICustomFilter {
  inspectionType: InspectionFormTypes;
  fieldsData: IFieldsData[];
  onConfirm: (value: unknown) => void;
  onCancel: () => void;
  filterValue?: unknown;
  filterFieldsValues: Item[] | [Date?, Date?];
  onOpen(): void;
  onSearchValueChange?(value: string | null): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  handleChange(value: IFilterFieldValue | IFilterDateRangeFieldValue): void;
  onClose?(): void;
}

const CustomFilter = (props: ICustomFilter) => {
  const { t } = useTranslation("dict");

  const [open, setOpen] = useFlag();

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
  }, []);

  useEffect(() => {
    if (open) {
      props.onOpen();
    } else {
      props.onSearchValueChange?.(null);
      setSearchValue(null);
      props.onClose?.();
    }
  }, [open]);

  useEffect(() => {
    console.log("props.fieldsData", toJS(props.fieldsData));
  }, [props.fieldsData]);

  const getItems = (type: InspectionFormTypes) => {
    const found = props.fieldsData.find((data) =>
      Object.keys(data).includes(props.inspectionType),
    );
    if (found) {
      return found[type];
    }
    return [];
  };

  const getItemKey = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType)) {
      return item.personFio ?? "";
    }
    return item.title;
  };

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const onScrollToBottom = () => {
    const foundCount = props.fieldsData.find((field) =>
      Object.keys(field).includes(props.inspectionType + "Count"),
    );
    const foundField = props.fieldsData.find((field) =>
      Object.keys(field).includes(props.inspectionType),
    );

    if (foundCount && foundField) {
      const foundFieldValues = Object.values(foundField)[0] as Item[];

      const count = foundCount[props.inspectionType + "Count"];
      if (
        count &&
        count > ELEMENTS_ON_FIELD &&
        foundFieldValues.length >= ELEMENTS_ON_FIELD
      ) {
        props.onScrollToBottom?.(props.inspectionType);
      }
    }
  };
  const getItemLabel = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType)) {
      return item.personFio ?? "";
    }
    return item.title;
  };

  const debounceSetSearchValue = useDebounce(
    (value) => props.onSearchValueChange?.(value),
    300,
  );

  useEffect(() => debounceSetSearchValue(searchValue), [searchValue]);

  const onSearchValueChange = (value: string | null) => {
    setSearchValue(value);
  };

  return (
    <div className={style.CustomFilter}>
      {props.inspectionType === InspectionFormTypes.AuditDate ? (
        <DatePicker
          withClearButton
          type="date-range"
          className={style.DatePicker}
          onChange={(dateRangeValue) =>
            props.handleChange({
              [props.inspectionType]: dateRangeValue,
            } as IFilterDateRangeFieldValue)
          }
          rightSide={IconCalendar}
          value={props.filterFieldsValues as [Date?, Date?]}
        />
      ) : (
        <Combobox
          multiple
          virtualScroll
          className={style.combobox}
          items={getItems(props.inspectionType) as Item[]}
          onDropdownOpen={onDropdownOpen}
          searchValue={searchValue ?? ""}
          onSearchValueChange={onSearchValueChange}
          value={props.filterFieldsValues as Item[]}
          getItemKey={(item: Item) => getItemKey(item)}
          placeholder={t(`${props.inspectionType}Placeholder`)}
          getItemLabel={(item) => getItemLabel(item)}
          onScrollToBottom={searchValue ? undefined : onScrollToBottom}
          onChange={(val) =>
            props.handleChange({ [props.inspectionType]: val })
          }
        />
      )}
    </div>
  );
};

export default CustomFilter;
