import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import {
  INSPECTION_FORM_NOT_REQUIRED_FIELDS,
  InspectionFormGroups,
  InspectionFormTypes,
} from "../../enums/InspectionFormTypes";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import { IconForward } from "@consta/icons/IconForward";

import InspectionTextField from "../InspectionTextField/InspectionTextField";
import InspectionDataField from "../InspectionDataField/InspectionDataField";
import ItemGroupTitle from "../ItemGroupTitle/ItemGroupTitle";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { IInspection } from "../../interfaces/IInspection";
import {
  IFieldsData,
  IFormDateFieldValue,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";
import {
  defaultDisabledFields,
  firstCaseOfIncludedFunctionTitles,
  firstCaseValues,
  includedFunctionTitlesForContractorStruct,
  secondCaseAOfIncludedFunctionTitles,
  secondCaseAValues,
  secondCaseBOfIncludedFunctionTitles,
  secondCaseBValues,
  secondCaseCOfIncludedFunctionTitles,
  secondCaseCValues,
  secondCaseDOfIncludedFunctionTitles,
  secondCaseDValues,
} from "../../constants/constants";

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

  loader: LoaderType;
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
    if (props.formFieldsValues && props.formFieldsValues[inspectionFormType]) {
      return props.formFieldsValues[inspectionFormType];
    }
    return null;
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
    const formType =
      props.formFieldsValues?.[InspectionFormTypes.InspectionForm]?.id;
    if (formType?.toString() === "1") {
      props.handleNextStepToBarriers();
    } else {
      props.handleNextStepToFreeForm();
    }
    props.setIsValidate(true);
  };

  const functionTitle =
    props.formFieldsValues?.[InspectionFormTypes.Function]?.title;
  const contractorTitle =
    props.formFieldsValues?.[InspectionFormTypes.Contractor]?.title;
  const firstCaseCondition = (inspectionType: InspectionFormTypes) => {
    return (
      firstCaseValues.includes(inspectionType) &&
      functionTitle &&
      firstCaseOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseACondition = (inspectionType: InspectionFormTypes) => {
    return (
      secondCaseAValues.includes(inspectionType) &&
      functionTitle &&
      secondCaseAOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseBCondition = (inspectionType: InspectionFormTypes) => {
    return (
      secondCaseBValues.includes(inspectionType) &&
      functionTitle &&
      contractorTitle &&
      secondCaseBOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseBDisabledCondition = (
    inspectionType: InspectionFormTypes,
  ) => {
    return (
      secondCaseBValues.includes(inspectionType) &&
      functionTitle &&
      secondCaseBOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseCCondition = (inspectionType: InspectionFormTypes) => {
    return (
      secondCaseCValues.includes(inspectionType) &&
      functionTitle &&
      secondCaseCOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseCDisabledCondition = (
    inspectionType: InspectionFormTypes,
  ) => {
    return (
      inspectionType === InspectionFormTypes.ContractorStruct &&
      functionTitle &&
      secondCaseCOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const secondCaseDDisabledCondition = (
    inspectionType: InspectionFormTypes,
  ) => {
    return (
      secondCaseDValues.includes(inspectionType) &&
      functionTitle &&
      secondCaseDOfIncludedFunctionTitles.includes(functionTitle)
    );
  };
  const disabledConditions = (inspectionType: InspectionFormTypes) => {
    const ifNoContractor =
      props.formFieldsValues &&
      !props.formFieldsValues[InspectionFormTypes.Contractor];

    if (
      defaultDisabledFields.includes(inspectionType) &&
      !firstCaseCondition(inspectionType) &&
      !secondCaseBDisabledCondition(inspectionType)
    ) {
      if (ifNoContractor) {
        return "disabled";
      }
    }

    if (
      secondCaseDDisabledCondition(inspectionType) ||
      secondCaseCDisabledCondition(inspectionType)
    ) {
      return "disabled";
    }
    return "enabled";
  };

  const requiredConditions = (inspectionType: InspectionFormTypes) => {
    if (
      firstCaseCondition(inspectionType) ||
      secondCaseACondition(inspectionType) ||
      secondCaseBCondition(inspectionType)
    ) {
      return true;
    }

    /*if (
      inspectionType === InspectionFormTypes.Contractor &&
      functionTitle &&
      [
        ...includedFunctionTitlesForContractorStruct,
        ...includedFunctionTitlesForSupervisor,
      ].includes(functionTitle)
    ) {
      return true;
    }*/

    /*if (
      inspectionType === InspectionFormTypes.ContractorStruct &&
      functionTitle &&
      includedFunctionTitlesForContractorStruct.includes(functionTitle)
    ) {
      return true;
    }
*/
    if (!INSPECTION_FORM_NOT_REQUIRED_FIELDS.includes(inspectionType)) {
      return true;
    }
  };

  return (
    <div className={style.InspectionForm}>
      {props.loader !== "wait" ? (
        <div className={style.form}>
          <form className={style.fields}>
            {Object.keys(fields).map((key: string) => (
              <>
                <ItemGroupTitle key={key} groupTitle={key} />
                {fields[key].map((inspectionType) => {
                  if (inspectionType === InspectionFormTypes.AuditDate) {
                    return (
                      <InspectionDataField
                        required
                        key={inspectionType}
                        inspectionType={inspectionType}
                        handleChange={props.handleDateChange}
                        value={getDate(inspectionType) as Date | null}
                        status={
                          props.isValidate
                            ? getStatus(inspectionType)
                            : undefined
                        }
                      />
                    );
                  }
                  return (
                    <InspectionTextField
                      onClose={props.onInspectionTextFieldClose}
                      onScrollToBottom={props.onScrollToBottom}
                      onSearchValueChange={props.onSearchValueChange}
                      required={requiredConditions(inspectionType)}
                      disabled={
                        !(disabledConditions(inspectionType) === "enabled")
                      }
                      inspectionType={inspectionType}
                      value={getValue(inspectionType)}
                      fieldsData={props.fieldsData}
                      handleChange={props.handleChange}
                      handleOpenField={props.handleOpenField}
                      status={
                        requiredConditions(inspectionType) && props.isValidate
                          ? getStatus(inspectionType)
                          : undefined
                      }
                    />
                  );
                })}
              </>
            ))}
          </form>
          <div className={style.buttonsGroup}>
            <Button
              onClick={() =>
                props.formFieldsValuesLength && setIsModalOpen(true)
              }
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
      ) : (
        <LoaderPage />
      )}

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
