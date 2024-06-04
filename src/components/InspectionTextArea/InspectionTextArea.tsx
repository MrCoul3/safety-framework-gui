import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { TextField } from "@consta/uikit/TextField";
import {
  IFormFieldTextValue,
  IFormFieldValue,
  Item,
} from "../../interfaces/IFieldInterfaces";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { FreeFormFieldTypes } from "../../enums/FreeFormTypes";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

interface IInspectionTextArea {
  handleChange(value: IFormFieldTextValue): void;
  value?: string;

  display?: boolean;
  required?: boolean;
  status: PropStatus | undefined;
  inspectionType: InspectionFormTypes | FreeFormFieldTypes;
}

const InspectionTextArea = observer((props: IInspectionTextArea) => {
  const textField = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("dict");

  useEffect(() => {
    (textField.current?.childNodes[1] as HTMLDivElement).classList.add(
      "customField",
    );
  }, [textField]);
  const handleChange = (value: string | null) => {
    props.handleChange({
      [props.inspectionType]: value,
    });
  };
  return (
    <TextField
      required={props.required}
      minRows={2}
      className={classNames(style.textArea, {
        [style.show]: props.display,
      })}
      ref={textField}
      labelPosition="left"
      label={t(props.inspectionType)}
      onChange={handleChange}
      value={props.value}
      type="textarea"
      cols={200}
      placeholder={t(`${props.inspectionType}Placeholder`)}
    />
  );
});

export default InspectionTextArea;
