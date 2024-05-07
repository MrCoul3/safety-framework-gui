import React, { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import {
  IFieldsData,
  IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../../stores/InspectionStore";
import { useTranslation } from "react-i18next";

interface IFieldInspectionType {
  handleOpenField(type: InspectionFormTypes): void;
  handleChange(value: IFormFieldValue): void;

  fieldsData: IFieldsData[];
  value?: IFormFieldValue | IFormDateFieldValue;
  inspectionType: InspectionFormTypes;
}

const InspectionTextField = observer((props: IFieldInspectionType) => {
  const { t } = useTranslation("dict");

  const [open, setOpen] = useFlag();

  const inputRef = useRef<HTMLInputElement>(null);

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
    if (open) {
      inputRef.current?.focus();
    }
  }, []);
  const onClick = (type: InspectionFormTypes) => {
    if (!open) {
      props.handleOpenField(type);
    }
  };
  const handleChange = (value: Item | null) => {
    props.handleChange({ [props.inspectionType]: value });
  };

  const getItems = (type: InspectionFormTypes) => {
    const found = props.fieldsData.find((data) =>
      Object.keys(data).includes(props.inspectionType),
    );
    if (found) {
      return found[type];
    }
    return [];
  };

  return (
    <Combobox
      getItemLabel={(item) => item.Title}
      className={style.field}
      onClick={() => onClick(props.inspectionType)}
      dropdownOpen={open}
      labelPosition="left"
      label={t(props.inspectionType)}
      onDropdownOpen={onDropdownOpen}
      placeholder={t(`${props.inspectionType}Placeholder`)}
      required
      value={Object.values(props.value ?? {})[0]}
      items={getItems(props.inspectionType)}
      onChange={handleChange}
      getItemKey={(item: Item) => item.Title}
    />
  );
});

export default InspectionTextField;
