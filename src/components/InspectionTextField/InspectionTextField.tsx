import React, { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import { IFieldsData, Item } from "../../stores/InspectionStore";
import { useTranslation } from "react-i18next";

interface IFieldInspectionType {
  handleOpenField(type: InspectionFormTypes): void;

  fieldsData: IFieldsData[];

  inspectionType: InspectionFormTypes;
}

const InspectionTextField = observer((props: IFieldInspectionType) => {
  const { t } = useTranslation("dict");

  const [open, setOpen] = useFlag();

  const [value, setValue] = useState<Item | null>(null);

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
      value={value}
      items={getItems(props.inspectionType)}
      onChange={setValue}
    />
  );
});

export default InspectionTextField;
