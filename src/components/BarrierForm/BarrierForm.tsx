import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import InspectionTextArea from "../InspectionTextArea/InspectionTextArea";
import { FreeFormFieldTypes } from "../../enums/FreeFormTypes";
import {
  IFormFieldTextValue,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { BarrierFieldTypes } from "../../enums/BarrierTypes";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";

interface IBarrierForm {
  isValidate: boolean;

  formFields?: IFilledBarrier;

  handleChange(value: IFormFieldTextValue): void;
}

const BarrierForm = observer((props: IBarrierForm) => {

  const [savingState, setSavingState] = useState(false);

  const getValue = (type: BarrierFieldTypes): string => {
    if (props.formFields) {
      if (type === BarrierFieldTypes.Mub) {
        return props.formFields[type] as string;
      }
      // return props.formFields[type]?.title as string;
    }
    return "";
  };
  const handleChange = (value: IFormFieldTextValue) => {
    // console.log("handleChange", value);
    props.handleChange(value);
    setSavingState(true);
  };

  const getStatus = (type: BarrierFieldTypes) => {
    /* if (props.formFieldsValues) {
      const condition = props.formFieldsValues[type];
      if (!condition) {
        return "alert";
      }
    }*/
    return "success";
  };

  return (
    <div className={style.BarrierForm}>
      {props.formFields && (
        <div className={style.barrierFormWrap}>
          <InspectionTextArea
            className={"none"}
            labelPos={"top"}
            minRows={5}
            required={true}
            display={true}
            value={getValue(BarrierFieldTypes.Mub)}
            handleChange={handleChange}
            type={BarrierFieldTypes.Mub}
            status={
              props.isValidate
                ? (getStatus(BarrierFieldTypes.Mub) as PropStatus)
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
});

export default BarrierForm;
