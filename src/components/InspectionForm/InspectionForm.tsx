import React, { useEffect } from "react";
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
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { IInspection } from "../../interfaces/IInspection";

interface IInspectionForm {
  handleOpenField(type: InspectionFormTypes): void;
  handleClearInspectionForm(): void;
  onInspectionTextFieldClose?(): void;
  onSearchValueChange?(value: string | null): void;
  fieldsData: IFieldsData[];
  formFieldsValuesLength?: boolean;
  isValidate: boolean;
  setIsValidate(value: boolean): void;
  onScrollToBottom?(inspectionType: InspectionFormTypes): void;
  handleNextStepToBarriers(): void;
  handleNextStepToFreeForm(): void;
  onInit?(): void;
  handleChange(value: IFormFieldValue): void;
  handleDateChange(value: IFormDateFieldValue): void;
  formFieldsValues: IInspection | null;
}

const InspectionForm = observer((props: IInspectionForm) => {
  const { t } = useTranslation("dict");

  useEffect(() => {
    props.onInit?.();
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
      InspectionFormTypes.DoStruct,
      InspectionFormTypes.DoObject,
    ],
    [InspectionFormGroups.ContractorUnderReview]: [
      InspectionFormTypes.Contractor,
      InspectionFormTypes.ContractorStruct,
      InspectionFormTypes.SubContractor,
    ],
    [InspectionFormGroups.InspectionParticipants]: [
      InspectionFormTypes.Auditor,
      InspectionFormTypes.Auditee,
      InspectionFormTypes.Supervisor,
    ],
  };

  const getValue = (inspectionFormType: InspectionFormTypes): string => {
    if (props.formFieldsValues) {
      if (
        inspectionFormType !== InspectionFormTypes.AuditDate &&
        inspectionFormType !== InspectionFormTypes.Auditor &&
        inspectionFormType !== InspectionFormTypes.Auditee &&
        inspectionFormType !== InspectionFormTypes.Supervisor
      ) {
        return props.formFieldsValues[inspectionFormType]?.title as string;
      } else if (inspectionFormType !== InspectionFormTypes.AuditDate) {
        return props.formFieldsValues[inspectionFormType]?.personFio as string;
      }
    }
    return "";
  };
  const getDate = (inspectionFormType: InspectionFormTypes) => {
    if (props.formFieldsValues) {
      return props.formFieldsValues[inspectionFormType];
    }
  };
  const getStatus = (inspectionFormType: InspectionFormTypes) => {
    if (props.formFieldsValues) {
      const condition = props.formFieldsValues[inspectionFormType];
      if (!condition) {
        return "alert";
      }
    }
    return "success";
  };

  const handleNextStep = () => {
    /* if (
      props.formFieldsValues[InspectionFormTypes.InspectionForm] === "Барьеры"
    ) {
      props.handleNextStepToBarriers();
    } else {
      props.handleNextStepToFreeForm();
    }*/
    props.setIsValidate(true);
  };
  const disabledConditions = (inspectionType: InspectionFormTypes) => {
    const ifContractor =
      props.formFieldsValues &&
      !props.formFieldsValues[InspectionFormTypes.Contractor];
    /* enable doStruct if contractor enabled */
    if (inspectionType === InspectionFormTypes.DoStruct) {
      if (ifContractor) {
        return true;
      }
    }
    /* enable doStruct if contractor enabled */
    if (inspectionType === InspectionFormTypes.Supervisor) {
      if (ifContractor) {
        return true;
      }
    }
  };

  const requiredConditions = (inspectionType: InspectionFormTypes) => {
    const notReqFields = [
      InspectionFormTypes.Contractor,
      InspectionFormTypes.SubContractor,
      InspectionFormTypes.Supervisor,
    ];
    return !notReqFields.includes(inspectionType);
  };

  return (
    <div className={style.InspectionForm}>
      <div className={style.form}>
        <form className={style.fields}>
          {Object.keys(fields).map((key: string) => (
            <>
              <ItemGroupTitle key={key} groupTitle={key} />
              {fields[key].map((inspectionType) => {
                if (inspectionType === InspectionFormTypes.AuditDate) {
                  return (
                    <InspectionDataField
                      key={inspectionType}
                      inspectionType={inspectionType}
                      handleChange={props.handleDateChange}
                      value={getDate(inspectionType) as Date | null}
                      status={
                        props.isValidate ? getStatus(inspectionType) : undefined
                      }
                    />
                  );
                }
                return (
                  <InspectionTextField onClose={props.onInspectionTextFieldClose}
                    onScrollToBottom={props.onScrollToBottom}
                    onSearchValueChange={props.onSearchValueChange}
                    required={requiredConditions(inspectionType)}
                    disabled={disabledConditions(inspectionType)}
                    inspectionType={inspectionType}
                    value={getValue(inspectionType)}
                    fieldsData={props.fieldsData}
                    handleChange={props.handleChange}
                    handleOpenField={props.handleOpenField}
                    status={
                      props.isValidate ? getStatus(inspectionType) : undefined
                    }
                  />
                );
              })}
            </>
          ))}
        </form>
        <div className={style.buttonsGroup}>
          <Button
            onClick={() => props.formFieldsValuesLength && setIsModalOpen(true)}
            view="clear"
            label={t("clear")}
          />
          <Button
            onClick={handleNextStep}
            type="submit"
            label={t("farther")}
            iconRight={IconForward}
          />
        </div>
      </div>
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("clear")}
        title={t("dialogClearFields")}
        action={props.handleClearInspectionForm}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </div>
  );
});

export default InspectionForm;
