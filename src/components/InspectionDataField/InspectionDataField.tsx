import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerPropOnChange } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { IFormDateFieldValue } from "../../interfaces/IFieldInterfaces";
import { ViolationFilterTypes } from "../../enums/ViolationFilterTypes";
import classNames from "classnames";

interface IInspectionDataField {
  inspectionType: InspectionFormTypes | ViolationFilterTypes;
  disableLabel?: boolean;
  required?: boolean;

  labelPosition?: "left" | "top";

  className?: string;

  status?: PropStatus | undefined;
  value?: Date | null;
  handleChange(value: IFormDateFieldValue): void;
}

const InspectionDataField = observer((props: IInspectionDataField) => {
  const { t } = useTranslation("dict");

  /*  const onChange = (value) => {
    props.handleChange({ [props.inspectionType]: value });
  };*/

  const picker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.className) {
      const fieldBody = picker.current?.parentElement;
      fieldBody?.classList.add("customField");
    }
  }, [picker]);

  useEffect(() => {
    setVal(props.value ?? null);

    console.log("props.value", props.value);
  }, [props.value]);

  const [val, setVal] = useState<Date | null>(null);

  return (
    <DatePicker
      caption={props.status === "alert" ? t("requiredHint") : ""}
      type={"date"}
      ref={picker}
      status={props.status}
      className={classNames(style.field, props.className)}
      label={!props.disableLabel ? t(props.inspectionType) : ""}
      onChange={(value) =>
        props.handleChange({ [props.inspectionType]: value })
      }
      required={props.required}
      rightSide={IconCalendar}
      labelPosition={props.labelPosition ?? "left"}
      value={val}
    />
  );
});

export default InspectionDataField;
