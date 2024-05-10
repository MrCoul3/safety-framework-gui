import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import {
  IFieldsData, IFormDateFieldValue,
  IFormFieldValue,
  Item,
} from "../../stores/InspectionStore";
import { useTranslation } from "react-i18next";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";

interface IFieldInspectionType {
  handleOpenField(type: InspectionFormTypes): void;
  handleChange(value: IFormFieldValue): void;
  status: PropStatus | undefined;
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

  useEffect(() => {
    if (open) {
      props.handleOpenField(props.inspectionType);
    }
  }, [open]);

  useEffect(() => {
    console.log('props.value', props.value)
  }, [props.value]);

  const handleChange = (value: Item | null) => {
    if (value) {
      props.handleChange({ [props.inspectionType]: value });
    }
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
      status={props.status ?? props.status}
      getItemLabel={(item) => item.Title}
      className={style.field}
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
