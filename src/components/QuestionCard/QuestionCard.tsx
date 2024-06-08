import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { RadioGroup } from "@consta/uikit/RadioGroup";
import { IFulfillment } from "../../interfaces/IFulfillment";
import { toJS } from "mobx";
import { IFilledQuestions } from "../../interfaces/IFilledQuestions";
import { FilledQuestionTypes } from "../../enums/FilledQuestionTypes";

interface IQuestionCard {
  title: string;
  fulfillments: IFulfillment[];

  filledQuestion?: IFilledQuestions;

  handleChange(value: IFilledQuestions): void;
}

const QuestionCard = observer((props: IQuestionCard) => {
  const title = props.title;

  const code = title?.split(" ")[0];

  const name = title?.replace(code ?? "", "");

  useEffect(() => {
    console.log("QuestionCard filledQuestion", toJS(props.filledQuestion));
  }, [props.filledQuestion]);

  const handleChange = (value: IFulfillment) => {
    console.log("QuestionCard handleChange value", toJS(value));
    const resultValue = {
      ...props.filledQuestion,
      [FilledQuestionTypes.FulfillmentId]: +value.id,
    };
    console.log("QuestionCard handleChange resultValue", toJS(resultValue));
    props.handleChange(resultValue);
  };

  // const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  const getValue = () => {
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

  const { t } = useTranslation("dict");
  return (
    <div className={style.QuestionCard}>
      <div className={style.title}>
        <span className={style.code}>{code}</span>
        <span className={style.name}>{name}</span>
      </div>
      <RadioGroup
        value={getValue()}
        items={props.fulfillments}
        getItemLabel={(item) => item.title}
        onChange={handleChange}
      />
    </div>
  );
});

export default QuestionCard;
