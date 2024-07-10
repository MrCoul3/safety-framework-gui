import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import InspectionTextArea from "../InspectionTextArea/InspectionTextArea";
import { IFormFieldTextValue } from "../../interfaces/IFieldInterfaces";
import {
  BARRIER_EXTRA_FIELDS_VALUES,
  BarrierExtraFieldTypes,
  BarrierFieldTypes,
} from "../../enums/BarrierTypes";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { Button } from "@consta/uikit/Button";
import MubCards from "../MubCards/MubCards";
import { IBarrier } from "../../interfaces/IBarrier";
import { toJS } from "mobx";
import QuestionCard from "../QuestionCard/QuestionCard";
import { IFulfillment } from "../../interfaces/IFulfillment";
import { IQuestion } from "../../interfaces/IQuestion";
import { FilledQuestionTypes } from "../../enums/FilledQuestionTypes";
import { IFilledQuestions } from "../../interfaces/IFilledQuestions";
import { IInapplicableReasons } from "../../interfaces/IInapplicableReasons";

interface IBarrierForm {
  isValidate: boolean;
  isExtraFieldsCondition: boolean;

  fulfillments: IFulfillment[];

  inapplicableReasons: IInapplicableReasons[];

  passportId?: string;

  formFields?: IFilledBarrier;

  barrier: IBarrier;

  onInit(): void;

  handleChange(value: IFormFieldTextValue): void;

  handleFulfillmentChange(value: IFilledQuestions, requirementId: number): void;

  handleClearForm?(): void;

  handleSaveForm?(): void;

  handleDelete?(): void;
}

const BarrierForm = observer((props: IBarrierForm) => {
  const { t } = useTranslation("dict");

  const [savingState, setSavingState] = useState(false);

  useEffect(() => {
    console.log("BarrierForm formFields", toJS(props.formFields));
  }, [props.formFields]);

  const getValue = (type: BarrierFieldTypes): string => {
    if (props.formFields) {
      if (type === BarrierFieldTypes.Mub) {
        return props.formFields[type] as string;
      }
      // return props.formFields[type]?.title as string;
    }
    return "";
  };

  const mub = props.formFields?.[BarrierFieldTypes.Mub]?.split(",");
  const getExtraFieldValue = (type: BarrierExtraFieldTypes): string => {
    if (props.formFields) {
      if (type === BarrierExtraFieldTypes.VehicleType) {
        return mub?.[0] ?? "";
      }
      if (type === BarrierExtraFieldTypes.LicencePlate) {
        return mub?.[1] ?? "";
      }
      if (type === BarrierExtraFieldTypes.DriverFio) {
        return mub?.[2] ?? "";
      }
    }
    return "";
  };

  useEffect(() => {
    setSavingState(true);
    props.onInit();
  }, [props.formFields]);
  const handleChange = (value: IFormFieldTextValue) => {
    console.log("barrier form handleChange", value);
    props.handleChange(value);
    setSavingState(true);
  };

  const [vehicleFieldValue, setVehicleFieldValue] = useState<string | null>(
    mub?.[0] ?? "",
  );
  const [licencePlateFieldValue, setLicencePlateFieldValue] = useState<
    string | null
  >(mub?.[1] ?? "");
  const [driverFioFieldValue, setDriverFioFieldValue] = useState<string | null>(
    mub?.[2] ?? "",
  );

  useEffect(() => {
    if (
      vehicleFieldValue !== null &&
      licencePlateFieldValue !== null &&
      driverFioFieldValue !== null
    ) {
      const vehicleVal = vehicleFieldValue ? `${vehicleFieldValue},` : "";
      const licencePlateVal = licencePlateFieldValue
        ? `${licencePlateFieldValue},`
        : "";
      const driverFioVal = driverFioFieldValue ? `${driverFioFieldValue}` : "";
      const result = {
        [BarrierFieldTypes.Mub]: `${vehicleVal}${licencePlateVal}${driverFioVal}`,
      };
      props.handleChange(result);
      setSavingState(true);
    }
  }, [vehicleFieldValue, licencePlateFieldValue, driverFioFieldValue]);

  const getStatus = (type: BarrierFieldTypes | BarrierExtraFieldTypes) => {
    if (props.formFields) {
      const condition =
        type === BarrierFieldTypes.Mub
          ? props.formFields[type] && props.formFields[type].length > 5
          : props.formFields[type];
      if (!condition) {
        return "alert";
      }
    }
    return "success";
  };

  const questions = useMemo(
    () =>
      props.barrier?.requirements && props.barrier?.requirements.length
        ? props.barrier?.requirements
            .map((req) => {
              return req.questions;
            })
            .flat()
        : null,
    [props.barrier.requirements],
  );

  const handleSave = () => {
    setSavingState(false);
    props.handleSaveForm?.();
  };

  const [isClearModalOpen, setIsClearModalOpen] = React.useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = React.useState(false);

  const renderMubFields = () => {
    if (props.barrier.mubTypeId === 2) {
      return BARRIER_EXTRA_FIELDS_VALUES.map((extraField) => (
        <InspectionTextArea
          minRows={1}
          display={true}
          required={true}
          labelPos={"top"}
          className={"none"}
          handleChange={(val) => {
            extraField === BarrierExtraFieldTypes.VehicleType &&
              setVehicleFieldValue(val[extraField] ?? "");
            extraField === BarrierExtraFieldTypes.LicencePlate &&
              setLicencePlateFieldValue(val[extraField] ?? "");
            extraField === BarrierExtraFieldTypes.DriverFio &&
              setDriverFioFieldValue(val[extraField] ?? "");
          }}
          type={extraField}
          value={getExtraFieldValue(extraField)}
          status={
            props.isValidate
              ? (getStatus(BarrierFieldTypes.Mub) as PropStatus)
              : undefined
          }
        />
      ));
    } else {
      return (
        <InspectionTextArea
          caption={t("captionFiveSymbols")}
          minRows={5}
          display={true}
          required={true}
          labelPos={"top"}
          className={"none"}
          handleChange={handleChange}
          type={BarrierFieldTypes.Mub}
          value={getValue(BarrierFieldTypes.Mub)}
          status={getStatus(BarrierFieldTypes.Mub) as PropStatus}
        />
      );
    }
  };

  const handleFulfillmentChange = (
    value: IFilledQuestions,
    requirementId: number,
  ) => {
    console.log("QuestionCard handleChange", toJS(value));
    props.handleFulfillmentChange(value, requirementId);
    setSavingState(true);
  };

  const filledRequirements = props.formFields?.filledRequirements;

  const getQuestions = () => {
    const result = filledRequirements
      ?.map((req) => {
        return req.filledQuestions;
      })
      .flat();
    return result;
  };

  const getFilledQuestion = (question: IQuestion) => {
    const filledQuestions = getQuestions();
    const filledQuestion = filledQuestions?.find(
      (fillQuest) => fillQuest[FilledQuestionTypes.QuestionId] === question.id,
    );
    return filledQuestion;
  };

  return (
    <div className={style.BarrierForm}>
      {props.formFields && (
        <>
          <div className={style.barrierFormWrap}>
            {renderMubFields()}
            <MubCards mub={props.barrier.mub} mubHint={props.barrier.mubHint} />
            {questions?.map((question) => (
              <QuestionCard
                requirementId={question.requirementId}
                filledQuestion={getFilledQuestion(question)}
                handleChange={handleFulfillmentChange}
                fulfillments={props.fulfillments}
                inapplicableReasons={props.inapplicableReasons}
                key={question.id}
                title={question.title}
              />
            ))}
          </div>
          <div className={style.buttonsGroup}>
            <Button
              onClick={() => setIsDelModalOpen(true)}
              view="ghost"
              label={t("delete")}
            />
            <div className={style.flexContainer}>
              <Button
                onClick={() => setIsClearModalOpen(true)}
                view="clear"
                label={t("clear")}
              />
              <Button
                disabled={!savingState}
                onClick={handleSave}
                type="submit"
                label={t("save")}
              />
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("clear")}
        title={t("dialogClearFields")}
        action={() => props.handleClearForm?.()}
        onClose={() => setIsClearModalOpen(false)}
        open={isClearModalOpen}
      />
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("delete")}
        title={t("dialogDeleteBarrier")}
        action={() => props.handleDelete?.()}
        onClose={() => setIsDelModalOpen(false)}
        open={isDelModalOpen}
      />
    </div>
  );
});

export default BarrierForm;
