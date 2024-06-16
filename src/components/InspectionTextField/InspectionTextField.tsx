import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  EMPLOYEES,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import { useTranslation } from "react-i18next";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { toJS } from "mobx";
import { ELEMENTS_ON_FIELD } from "../../constants/config";
import { useDebounce } from "@consta/uikit/useDebounce";
import {
  IFieldsData,
  IFormFieldValue,
  Item,
} from "../../interfaces/IFieldInterfaces";
import { FreeFormFieldTypes, FreeFormTypes } from "../../enums/FreeFormTypes";
import {ViolationFilterTypes, violationsDictionaryOfConformity} from "../../enums/ViolationFilterTypes";
import classNames from "classnames";

interface IFieldInspectionType {
  onClose?(): void;
  handleOpenField(
    type: InspectionFormTypes | FreeFormFieldTypes | ViolationFilterTypes | string,
  ): void;
  handleChange(value: IFormFieldValue): void;
  onScrollToBottom?(
    inspectionType:
      | InspectionFormTypes
      | FreeFormFieldTypes
      | ViolationFilterTypes | string,
  ): void;
  onSearchValueChange?(value: string | null): void;
  status?: PropStatus | undefined;
  fieldsData: IFieldsData[];
  value?: string;
  disabled?: boolean;
  required?: boolean;
  inspectionType:
    | InspectionFormTypes
    | FreeFormFieldTypes
    | ViolationFilterTypes | string;
  labelPosition?: "left" | "top";
  className?: string;

  translationDict?: string
}

const InspectionTextField = observer((props: IFieldInspectionType) => {
  const { t } = useTranslation( props.translationDict ?? "dict");

  const [open, setOpen] = useFlag();

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useFlag();

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
    onScrollToBottom();
  }, []);

  useEffect(() => {
    if (open) {
      setIsLoading.on()
      props.handleOpenField(props.inspectionType);
    } else {
      props.onSearchValueChange?.(null);
      setSearchValue(null);
      props.onClose?.();
    }
  }, [open]);

  useEffect(() => {
    console.log('props.fieldsData', toJS(props.fieldsData))
    if (props.fieldsData.length) {
      setIsLoading.off();
    }
    setTimeout(() => setIsLoading.off(), 10000)
  }, [props.fieldsData]);

  const handleChange = (value: Item | null) => {
    props.handleChange({
      [props.inspectionType]: value,
    });
  };

  const getItems = (
    type: InspectionFormTypes | FreeFormFieldTypes | ViolationFilterTypes | string,
  ) => {
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
    if (!props.className) {
      const fieldBody = combobox.current?.parentElement;
      fieldBody?.classList.add("customField");
    }
  }, [combobox]);

  const getItemLabel = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType as InspectionFormTypes)) {
      return item.personFio ?? "";
    }
    if (item.ruleNumber) {
      return item.ruleNumber + '. ' + item.title;
    }
    return item.title;
  };
  const getItemKey = (item: Item) => {
    if (EMPLOYEES.includes(props.inspectionType as InspectionFormTypes)) {
      return item.personFio ?? "";
    }
    return item.title;
  };

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

  const debounceSetSearchValue = useDebounce(
    (value) => props.onSearchValueChange?.(value),
    300,
  );

  useEffect(() => debounceSetSearchValue(searchValue), [searchValue]);

  const onSearchValueChange = (value: string | null) => {
    console.log("onSearchValueChange", value);
    setSearchValue(value);
  };

  useEffect(() => {
    console.log('props.value', toJS(props.value))
  }, [props.value])

  return (
    <Combobox isLoading={isLoading}
      ref={combobox}
      dropdownOpen={open}
      labelPosition={props.labelPosition ?? "left"}
      status={props.status}
      className={classNames(style.field, props.className)}
      onChange={handleChange}
      disabled={props.disabled}
      required={props.required}
      onDropdownOpen={onDropdownOpen}
      label={t(props.inspectionType)}
      searchValue={searchValue ?? ""}
      onScrollToBottom={searchValue ? undefined : onScrollToBottom}
      virtualScroll
      items={getItems(props.inspectionType) as Item[]}
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
