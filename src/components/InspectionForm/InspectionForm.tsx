import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  InspectionFormGroups,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import { IconForward } from "@consta/icons/IconForward";
import {
  IFieldsData,
  IFormDateFieldValue,
  IFormFieldValue,
} from "../../stores/InspectionStore";
import InspectionTextField from "../InspectionTextField/InspectionTextField";
import InspectionDataField from "../InspectionDataField/InspectionDataField";
import ItemGroupTitle from "../ItemGroupTitle/ItemGroupTitle";

interface IInspectionForm {
  handleOpenField(type: InspectionFormTypes): void;
  fieldsData: IFieldsData[];
  isValidate: boolean;

  setIsValidate(value: boolean): void ;
  handleChange(value: IFormFieldValue): void;
  handleDateChange(value: IFormDateFieldValue): void;
  formFieldsValues: (IFormFieldValue | IFormDateFieldValue)[];
}

const InspectionForm = observer((props: IInspectionForm) => {
  const { t } = useTranslation("dict");

  const fields: {
    [key: string | InspectionFormGroups]: InspectionFormTypes[];
  } = {
    [InspectionFormGroups.Common]: [
      InspectionFormTypes.AuditDate,
      InspectionFormTypes.InspectionForm,
      InspectionFormTypes.InspectionType,
      InspectionFormTypes.Function,
    ],
    [InspectionFormGroups.InspectionPlace]: [
      InspectionFormTypes.OilField,
      InspectionFormTypes.DoStructs,
      InspectionFormTypes.DoObjects,
    ],
    [InspectionFormGroups.ContractorUnderReview]: [
      InspectionFormTypes.Contractors,
      InspectionFormTypes.TeamNumber,
      InspectionFormTypes.SubContractors,
    ],
    [InspectionFormGroups.InspectionParticipants]: [],
  };


  const getValue = (inspectionFormType: InspectionFormTypes) => {
    return props.formFieldsValues.find((value) =>
      Object.keys(value).includes(inspectionFormType),
    );
  };
  const getStatus = (inspectionFormType: InspectionFormTypes) => {
    const condition = props.formFieldsValues.find(
      (value) =>
        Object.keys(value).includes(inspectionFormType) &&
        !Object.values(value).includes(null),
    );
    if (!condition) {
      return "alert";
    }
    return "success";
  };

  const handleApplyForm = () => {
    props.setIsValidate(true);
  };

  return (
    <div className={style.InspectionForm}>
      <div className={style.form}>
        <form className={style.fields}>
          {Object.keys(fields).map((key: string) => (
            <>
              <ItemGroupTitle groupTitle={key} />
              {fields[key].map((value) => {
                if (value === InspectionFormTypes.AuditDate) {
                  return (
                    <InspectionDataField
                      inspectionType={value}
                      handleChange={props.handleDateChange}
                      value={getValue(value)}
                      status={props.isValidate ? getStatus(value) : undefined}
                    />
                  );
                }
                return (
                  <InspectionTextField
                    inspectionType={value}
                    value={getValue(value)}
                    fieldsData={props.fieldsData}
                    handleChange={props.handleChange}
                    handleOpenField={props.handleOpenField}
                    status={props.isValidate ? getStatus(value) : undefined}
                  />
                );
              })}
            </>
          ))}
        </form>

        <div className={style.buttonsGroup}>
          <Button view="clear" label={t("reset")} />
          <Button
            onClick={handleApplyForm}
            type="submit"
            label={t("farther")}
            iconRight={IconForward}
          />
        </div>
      </div>
    </div>
  );
});

export default InspectionForm;
