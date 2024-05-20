import React, {useEffect, useRef, useState} from "react";
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
  disableLabel?: boolean

  status?: PropStatus | undefined;
  value?: [Date?, Date?] | null;
  handleChange(value: IFormDateFieldValue): void;
}

const InspectionDataField = observer((props: IInspectionDataField) => {
  const { t } = useTranslation("dict");

  const onChange: DatePickerPropOnChange<"date-range"> = (value) => {
    props.handleChange({ [props.inspectionType]: value });
  };

  const picker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fieldBody = picker.current?.parentElement;
    fieldBody?.classList.add('customField')
  }, [picker]);

  useEffect(() => {
    setVal(props.value ?? null)
  }, [props.value])

  const [val, setVal] = useState<[Date?, Date?] | null>(null)

  return (
    <DatePicker
      ref={picker}
      status={props.status}
      className={style.field}
      label={!props.disableLabel ? t(props.inspectionType) : ""}
      onChange={onChange}
      required
      rightSide={IconCalendar}
      labelPosition="left"
      value={val}
    />
  );
});

export default InspectionDataField;
