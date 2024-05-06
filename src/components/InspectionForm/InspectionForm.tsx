import React, { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import { IconForward } from "@consta/icons/IconForward";
import { IFieldsData, Item } from "../../stores/InspectionStore";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import InspectionDataField from "../InspectionDataField/InspectionDataField";

interface IInspectionForm {
  handleOpenField(type: InspectionFormTypes): void;

  fieldsData: IFieldsData[];
}

const InspectionForm = observer((props: IInspectionForm) => {
  const { t } = useTranslation("dict");

  const fields = Object.values(InspectionFormTypes).filter(
    (val) => !val.includes(InspectionFormTypes.AuditDate),
  );

  return (
    <div className={style.InspectionForm}>
      <div className={style.form}>
        <div className={style.fields}>
          <InspectionDataField />

          {fields.map((value) => (
            <InspectionTextField
              inspectionType={value}
              handleOpenField={props.handleOpenField}
              fieldsData={props.fieldsData}
            />
          ))}


        </div>

        <div className={style.buttonsGroup}>
          <Button view="clear" label={t("reset")} />
          <Button type="submit" label={t("farther")} iconRight={IconForward} />
        </div>
      </div>
    </div>
  );
});

export default InspectionForm;
