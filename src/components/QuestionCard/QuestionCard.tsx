import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import style from "./style.module.css";
import {useTranslation} from "react-i18next";
import {RadioGroup} from "@consta/uikit/RadioGroup";
import {IFulfillment} from "../../interfaces/IFulfillment";
import {toJS} from "mobx";
import {IFilledQuestions} from "../../interfaces/IFilledQuestions";
import {FilledQuestionTypes} from "../../enums/FilledQuestionTypes";
import InspectionTextArea from "../InspectionTextArea/InspectionTextArea";
import {IFormFieldTextValue} from "../../interfaces/IFieldInterfaces";
import {DatePicker} from "@consta/uikit/DatePicker";
import {IconCalendar} from "@consta/icons/IconCalendar";
import moment from "moment";
import {IInapplicableReasons} from "../../interfaces/IInapplicableReasons";

interface IQuestionCard {
  title: string;
  requirementId: number;
  fulfillments: IFulfillment[];
  inapplicableReasons: IInapplicableReasons[];

  filledQuestion?: IFilledQuestions;

  handleChange(value: IFilledQuestions, requirementId: number): void;
}

const QuestionCard = observer((props: IQuestionCard) => {
  const title = props.title;

  const { t } = useTranslation("dict");

  const code = title?.split(" ")[0];

  const name = title?.replace(code ?? "", "");

  useEffect(() => {
    console.log("QuestionCard filledQuestion", toJS(props.filledQuestion));
  }, [props.filledQuestion]);

  const handleFulfilmentChange = (value: IFulfillment) => {
    console.log("QuestionCard handleChange value", toJS(value));
    let resultValue: IFilledQuestions = {
      ...props.filledQuestion,
      [FilledQuestionTypes.FulfillmentId]: +value.id,
      [FilledQuestionTypes.Comment]: "",
    };
    if (value.id.toString() !== "2") {
      delete resultValue[FilledQuestionTypes.Comment]
    }
    console.log("QuestionCard handleChange resultValue", toJS(resultValue));
    props.handleChange(resultValue, props.requirementId);
  };

  const handleInapplicableReasonsChange = (value: IInapplicableReasons) => {
    console.log("QuestionCard handleChange value", toJS(value));
    let resultValue: IFilledQuestions = {
      ...props.filledQuestion,
      [FilledQuestionTypes.InapplicableReasonId]: +value.id,
      [FilledQuestionTypes.Comment]: "",
    };
    if (value.id.toString() !== "3") {
      delete resultValue[FilledQuestionTypes.Comment]
    }

    console.log("QuestionCard handleChange resultValue", toJS(resultValue));
    props.handleChange(resultValue, props.requirementId);
  };
  const handleCommentChange = (value: IFormFieldTextValue) => {
    console.log("QuestionCard handleChange value", {
      ...props.filledQuestion,
      ...value,
    });
    const result = { ...props.filledQuestion, ...value };
    props.handleChange(result, props.requirementId);
  };
  const handleNoFulfillmentChange = (value: {
    title: string;
    code: FilledQuestionTypes;
    value: boolean;
  }) => {
    const val = { [value.code]: value.value };
    console.log("handleNoFulfillmentChange value", value);
    console.log("handleNoFulfillmentChange val", val);
    const result = { ...props.filledQuestion, ...val };

    console.log("handleNoFulfillmentChange result", result);
    props.handleChange(result, props.requirementId);
  };
  const handleDateChange = (value: Date | null) => {
    console.log("handleDateChange value", value);
    const val = { [FilledQuestionTypes.PlannedResolveDate]: value };
    const result = { ...props.filledQuestion, ...val };

    props.handleChange(result, props.requirementId);
    console.log("handleDateChange result", result);
  };

  // const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  const getFulfilmentValue = () => {
    const fulfillment = props.fulfillments.find((fulfillment) => {
      const fulfilmentId = fulfillment.id?.toString();
      const filledFulfillmentId =
        props.filledQuestion?.[FilledQuestionTypes.FulfillmentId]?.toString();
      return fulfilmentId === filledFulfillmentId;
    });
    return {
      title: fulfillment?.title ?? "",
      code: fulfillment?.code ?? "",
      id: fulfillment?.id ?? 1,
    };
  };
  const getInapplicableReasonsValue = () => {
    const inapplicableReason = props.inapplicableReasons.find(
      (inapplicableReason) => {
        const inapplicableReasonId = inapplicableReason.id?.toString();
        const filledInapplicableReasonId =
          props.filledQuestion?.[
            FilledQuestionTypes.InapplicableReasonId
          ]?.toString();
        return inapplicableReasonId === filledInapplicableReasonId;
      },
    );
    return {
      title: inapplicableReason?.title ?? "",
      code: inapplicableReason?.code ?? "",
      id: inapplicableReason?.id ?? 1,
    };
  };
  const getWorkStoppedValue = (type: FilledQuestionTypes) => {
    const val = {
      title: t(type),
      code: type,
      value: true,
    };
    if (props.filledQuestion?.[FilledQuestionTypes.WorkStopped]) {
      return {
        ...val,
        value: true,
        title: t([FilledQuestionTypes.WorkStopped]),
      };
    }
    if (!props.filledQuestion?.[FilledQuestionTypes.WorkStopped]) {
      return { ...val, value: false, title: t("withoutWorkStopped") };
    }
  };
  const getResolvedInPlaceValue = (type: FilledQuestionTypes) => {
    const val = {
      title: t(type),
      code: type,
      value: true,
    };

    if (props.filledQuestion?.[FilledQuestionTypes.ResolvedInPlace]) {
      return {
        ...val,
        value: true,
        title: t([FilledQuestionTypes.ResolvedInPlace]),
      };
    }
    if (!props.filledQuestion?.[FilledQuestionTypes.ResolvedInPlace]) {
      return { ...val, value: false, title: t("notResolved") };
    }
  };

  const getDateValue = () => {
    const date = props.filledQuestion?.[FilledQuestionTypes.PlannedResolveDate];
    if (date) {
      return moment(date).toDate();
    }
    return null;
  };

  const workStoppedFields: {
    title: string;
    code: FilledQuestionTypes;
    value: boolean;
  }[] = [
    {
      title: t([FilledQuestionTypes.WorkStopped]),
      code: FilledQuestionTypes.WorkStopped,
      value: true,
    },
    {
      title: t("withoutWorkStopped"),
      code: FilledQuestionTypes.WorkStopped,
      value: false,
    },
  ];
  const resolvedInPlaceFields: {
    title: string;
    code: FilledQuestionTypes;
    value: boolean;
  }[] = [
    {
      title: t([FilledQuestionTypes.ResolvedInPlace]),
      code: FilledQuestionTypes.ResolvedInPlace,
      value: true,
    },
    {
      title: t("notResolved"),
      code: FilledQuestionTypes.ResolvedInPlace,
      value: false,
    },
  ];

  const noFulfillmentCondition = () => {
    return props.filledQuestion?.[FilledQuestionTypes.FulfillmentId] === 2;
  };

  const inapplicableReasonCondition = () => {
    return props.filledQuestion?.[FilledQuestionTypes.FulfillmentId] === 3;
  };
  const inapplicableReasonConditionOther = () => {
    return (
      props.filledQuestion?.[FilledQuestionTypes.InapplicableReasonId] === 3
    );
  };

  const plannedResolveDateCondition = () => {
    return !props.filledQuestion?.[FilledQuestionTypes.ResolvedInPlace];
  };

  return (
    <div className={style.QuestionCard}>
      <div className={style.title}>
        <span className={style.code}>{code}</span>
        <span className={style.name}>{name}</span>
      </div>
      <RadioGroup
        value={getFulfilmentValue()}
        items={props.fulfillments}
        getItemLabel={(item) => item.title}
        onChange={handleFulfilmentChange}
      />
      {noFulfillmentCondition() && (
        <>
          <InspectionTextArea
            required
            disabledLabel
            minRows={1}
            display={true}
            handleChange={handleCommentChange}
            type={FilledQuestionTypes.Comment}
            value={props.filledQuestion?.[FilledQuestionTypes.Comment]}
            status={undefined}
          />
          <div className={style.flexRow}>
            <RadioGroup
              value={getWorkStoppedValue(FilledQuestionTypes.WorkStopped)}
              items={workStoppedFields}
              getItemLabel={(item) => item.title}
              onChange={handleNoFulfillmentChange}
            />
            <RadioGroup
              value={getResolvedInPlaceValue(
                FilledQuestionTypes.ResolvedInPlace,
              )}
              items={resolvedInPlaceFields}
              getItemLabel={(item) => item.title}
              onChange={handleNoFulfillmentChange}
            />
          </div>
          {plannedResolveDateCondition() && (
            <DatePicker
              placeholder={t([
                FilledQuestionTypes.PlannedResolveDate + "Placeholder",
              ])}
              type="date"
              value={getDateValue()}
              rightSide={IconCalendar}
              onChange={handleDateChange}
            />
          )}
        </>
      )}
      {inapplicableReasonCondition() && (
        <>
          <div className={style.inapplicableReasons}>
            <RadioGroup
              value={getInapplicableReasonsValue()}
              items={props.inapplicableReasons}
              getItemLabel={(item) => item.title}
              onChange={handleInapplicableReasonsChange}
            />
            {inapplicableReasonConditionOther() && (
              <InspectionTextArea
                required
                disabledLabel
                minRows={1}
                display={true}
                handleChange={handleCommentChange}
                type={FilledQuestionTypes.Comment}
                value={props.filledQuestion?.[FilledQuestionTypes.Comment]}
                status={undefined}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default QuestionCard;
