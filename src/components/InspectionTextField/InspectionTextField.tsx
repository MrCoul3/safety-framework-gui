import React, { useCallback, useEffect, useRef } from "react";
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

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
  }, []);

  useEffect(() => {
    if (open) {
      props.handleOpenField(props.inspectionType);
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

  return (
    <Combobox
      disabled={props.disabled}
      onScrollToBottom={onScrollToBottom}
      virtualScroll
      ref={combobox}
      status={props.status}
      getItemLabel={(item) => getItemLabel(item)}
      className={style.field}
      dropdownOpen={open}
      labelPosition="left"
      label={t(props.inspectionType)}
      onDropdownOpen={onDropdownOpen}
      placeholder={t(`${props.inspectionType}Placeholder`)}
      required={props.required}
      value={
        props.value ? { title: props.value, personFio: props.value } : null
      }
      items={getItems(props.inspectionType)}
      onChange={handleChange}
      getItemKey={(item: Item) => getItemKey(item)}
    />
  );
});

export default InspectionTextField;
