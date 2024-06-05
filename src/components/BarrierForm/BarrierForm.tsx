import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import InspectionTextArea from "../InspectionTextArea/InspectionTextArea";
import { FreeFormFieldTypes } from "../../enums/FreeFormTypes";
import {
  IFormFieldTextValue,
  IFormFieldValue,
} from "../../interfaces/IFieldInterfaces";
import { BarrierTypes } from "../../enums/BarrierTypes";
import { PropStatus } from "@consta/uikit/__internal__/src/components/SelectComponents/types";

interface IBarrierForm {
  isValidate: boolean;

  handleChange(value: any): void;
}

const BarrierForm = observer((props: IBarrierForm) => {
  const [savingState, setSavingState] = useState(false);

  const getValue = (): string => {
    /* if (props.formFieldsValues) {
            if (field === FreeFormFieldTypes.ViolationManual) {
                return props.formFieldsValues[field] as string;
            }
            return props.formFieldsValues[field]?.title as string;
        }*/
    return "";
  };
  const handleChange = (value: any) => {
    console.log("handleChange", value);
    props.handleChange(value);
    setSavingState(true);
  };

  const getStatus = (type: BarrierTypes) => {
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
      <div className={style.barrierFormWrap}>
        <InspectionTextArea
          className={"none"}
          labelPos={"top"}
          minRows={5}
          required={true}
          display={true}
          value={getValue()}
          handleChange={handleChange}
          type={BarrierTypes.Mub}
          status={
            props.isValidate
              ? (getStatus(BarrierTypes.Mub) as PropStatus)
              : undefined
          }
        />
      </div>
    </div>
  );
});

export default BarrierForm;
