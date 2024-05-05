import React, { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import { IconForward } from "@consta/icons/IconForward";
import { IconCalendar } from "@consta/icons/IconCalendar";
import { DatePicker, DatePickerPropOnChange } from "@consta/uikit/DatePicker";
import { Combobox } from "@consta/uikit/Combobox";
import { useFlag } from "@consta/uikit/useFlag";
import { IFieldsData, Item } from "../../stores/InspectionStore";
import { toJS } from "mobx";

interface IInspectionForm {
  handleOpenField(type: InspectionFormTypes): void;

  fieldsData: IFieldsData[];
}

const InspectionForm = observer((props: IInspectionForm) => {
  const { t } = useTranslation("dict");

  const [datePickerValue, setDatePickerValue] = useState<[Date?, Date?] | null>(
    null,
  );
  const [inspectionFormValue, setInspectionFormValue] = useState<Item | null>(
    null,
  );

  const onChange: DatePickerPropOnChange<"date-range"> = (value) => {
    setDatePickerValue(value);
  };

  const [open, setOpen] = useFlag();
  const getItems = (type: InspectionFormTypes) => {
    const found = props.fieldsData.find((data) =>
      Object.keys(data).includes(InspectionFormTypes.InspectionForm),
    );
    if (found) {
      return found[type];
    }
    return [];
  };

  const onClick = (type: InspectionFormTypes) => {
    if (!open) {
      props.handleOpenField(type);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
    if (open) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className={style.InspectionForm}>
      <div className={style.form}>
        <DatePicker
          label={t(InspectionFormTypes.AuditDate)}
          onChange={onChange}
          required
          type="date"
          rightSide={IconCalendar}
          labelPosition="top"
          value={datePickerValue}
        />

        <Combobox
          onClick={() => onClick(InspectionFormTypes.InspectionForm)}
          dropdownOpen={open}
          label={t(InspectionFormTypes.InspectionForm)}
          onDropdownOpen={onDropdownOpen}
          placeholder={t("inspectionFormPlaceHolder")}
          required
          value={inspectionFormValue}
          items={getItems(InspectionFormTypes.InspectionForm)}
          onChange={setInspectionFormValue}
        />

        {/* <AutoComplete
          name={InspectionFormTypes.InspectionForm}
          required
          label={t(InspectionFormTypes.InspectionForm)}
          type="text"
          value={inspectionFormValue}
          items={items}
          onChange={setInspectionFormValue}
        />*/}

        <div className={style.buttonsGroup}>
          <Button view="clear" label={t("reset")} />
          <Button type="submit" label={t("farther")} iconRight={IconForward} />
        </div>
      </div>
    </div>
  );
});

export default InspectionForm;
