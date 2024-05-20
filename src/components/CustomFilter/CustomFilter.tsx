import React, { useCallback, useEffect, useState } from "react";
import style from "./style.module.css";
import { Combobox } from "@consta/uikit/Combobox";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { DatePicker } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";
import { IFieldsData, Item } from "../../stores/InspectionStore";
import { useFlag } from "@consta/uikit/useFlag";
import {useTranslation} from "react-i18next";

interface ICustomFilter {
  type: InspectionFormTypes;
  fieldData: IFieldsData;
  onConfirm: (value: unknown) => void;
  onCancel: () => void;
  filterValue?: unknown;
  onOpen(): void;
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

  const onChange = () => {
  };

  const [value, setValue] = useState<[Date?, Date?] | null>(null);

  return (
    <div className={style.CustomFilter}>
      {props.type === InspectionFormTypes.AuditDate ? (
        <DatePicker withClearButton
          type="date-range"
          className={style.DatePicker}
          onChange={setValue}
          rightSide={IconCalendar}
          value={value}
        />
      ) : (
        <Combobox
          placeholder={t(`${props.type}Placeholder`)}
          onDropdownOpen={onDropdownOpen}
          getItemLabel={(item) => item.title}
          getItemKey={(item: Item) => item.title}
          multiple
          className={style.combobox}
          items={getItems()}
          onChange={props.onConfirm}
        />
      )}
    </div>
  );
};

export default CustomFilter;
