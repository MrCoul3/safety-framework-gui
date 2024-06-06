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
import { BarrierFieldTypes } from "../../enums/BarrierTypes";

interface IInspectionTextArea {
  handleChange(value: IFormFieldTextValue): void;
  value?: string;
  className?: string;
  minRows?: number;

  display?: boolean;
  labelPos?: "left" | "top";
  required?: boolean;
  status: PropStatus | undefined;
  type: InspectionFormTypes | FreeFormFieldTypes | BarrierFieldTypes;
}

const InspectionTextArea = observer((props: IInspectionTextArea) => {
  const textField = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("dict");

  useEffect(() => {
    (textField.current?.childNodes[1] as HTMLDivElement).classList.add(
      props.className ? props.className : "customField",
    );
  }, [textField]);
  const handleChange = (value: string | null) => {
    props.handleChange({
      [props.type]: value,
    });
  };
  return (
    <TextField
      status={props.status}
      required={props.required}
      minRows={props.minRows ?? 2}
      className={classNames(style.textArea, {
        [style.show]: props.display,
      })}
      ref={textField}
      // labelPosition={props.labelPos ?? "top"}
      labelPosition={"top"}
      label={t(props.type)}
      onChange={handleChange}
      value={props.value}
      type="textarea"
      cols={200}
      placeholder={t(`${props.type}Placeholder`)}
    />
  );
});

export default InspectionTextArea;
