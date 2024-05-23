import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  EMPLOYEES,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import {
  IFieldsData,
  IFormFieldValue,
  Item,
} from "../../stores/InspectionStore";
import { useTranslation } from "react-i18next";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { toJS } from "mobx";

interface IFieldInspectionType {
  handleOpenField(type: InspectionFormTypes): void;
  handleChange(value: IFormFieldValue): void;
  onSearchValueChange?(value: string | null): void;
  status: PropStatus | undefined;
  fieldsData: IFieldsData[];
  value?: string;
  disabled?: boolean;
  required?: boolean;
  inspectionType: InspectionFormTypes;
}

const InspectionTextField = observer((props: IFieldInspectionType) => {
  const { t } = useTranslation("dict");

  const [open, setOpen] = useFlag();

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
  }, []);

  useEffect(() => {
    if (open) {
      props.handleOpenField(props.inspectionType);
    } else {
      props.onSearchValueChange?.(null);
      setSearchValue(null);
    }
  }, [open]);

  useEffect(() => {
    console.log("props.fieldsData", toJS(props.fieldsData));
    console.log("props.value", toJS(props.value));
  }, [props.value]);

  const handleChange = (value: Item | null) => {
    props.handleChange({
      [props.inspectionType]: value,
    });
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

  const combobox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fieldBody = combobox.current?.parentElement;
    fieldBody?.classList.add("customField");
  }, [combobox]);

  const getItemLabel = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType)) {
      return item.personFio ?? "";
    }
    return item.title;
  };
  const getItemKey = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType)) {
      return item.personFio ?? "";
    }
    return item.title;
  };

  const onScrollToBottom = () => {
    console.log("onScrollToBottom");
  };
  const onSearchValueChange = (value: string | null) => {
    props.onSearchValueChange?.(value);
    setSearchValue(value);
  };

  return (
    <Combobox
      virtualScroll
      ref={combobox}
      dropdownOpen={open}
      labelPosition="left"
      status={props.status}
      className={style.field}
      onChange={handleChange}
      disabled={props.disabled}
      required={props.required}
      onDropdownOpen={onDropdownOpen}
      label={t(props.inspectionType)}
      searchValue={searchValue ?? ""}
      onScrollToBottom={onScrollToBottom}
      items={getItems(props.inspectionType)}
      onSearchValueChange={onSearchValueChange}
      getItemKey={(item: Item) => getItemKey(item)}
      placeholder={t(`${props.inspectionType}Placeholder`)}
      getItemLabel={(item) => getItemLabel(item)}
      value={
        props.value ? { title: props.value, personFio: props.value } : null
      }
    />
  );
});

export default InspectionTextField;
