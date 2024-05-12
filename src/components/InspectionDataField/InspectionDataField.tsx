import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerPropOnChange } from "@consta/uikit/DatePicker";
import { IconCalendar } from "@consta/icons/IconCalendar";
import { IFormDateFieldValue } from "../../stores/InspectionStore";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";

interface IInspectionDataField {
  inspectionType: InspectionFormTypes;
  status: PropStatus | undefined;
  value?: [Date?, Date?] | null;
  handleChange(value: IFormDateFieldValue): void;
}

const InspectionDataField = observer((props: IInspectionDataField) => {
  const { t } = useTranslation("dict");

  const onChange: DatePickerPropOnChange<"date-range"> = (value) => {
    props.handleChange({ [props.inspectionType]: value });
  };

  return (
    <DatePicker
      status={props.status}
      className={style.field}
      label={t(props.inspectionType)}
      onChange={onChange}
      required
      rightSide={IconCalendar}
      labelPosition="left"
      value={props.value}
    />
  );
});

export default InspectionDataField;
