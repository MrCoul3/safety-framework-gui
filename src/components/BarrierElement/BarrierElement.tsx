import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import Counter from "../Counter/Counter";

interface IBarrierElement {
  title?: string | null;
  barriersLength?: number;
  isValid?: boolean;
}

const BarrierElement = observer((props: IBarrierElement) => {
  const title = props.title;

  const code = title?.split(" ")[0];

  const name = title?.replace(code ?? "", "");


  return (
    <div className={style.BarrierElement}>
      <div className={style.title}>
        <span className={style.code}>{code}</span>
        <span className={style.name}>{name}</span>
      </div>
      <Counter
        status={
          !props.barriersLength
            ? "system"
            : props.isValid
              ? "success"
              : "warning"
        }
        length={props.barriersLength?.toString()}
      />
    </div>
  );
});

export default BarrierElement;
