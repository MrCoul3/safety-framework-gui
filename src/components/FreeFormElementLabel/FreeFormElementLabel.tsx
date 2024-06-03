import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";

interface IFreeFormElementLabel {
  title?: string;
}

const FreeFormElementLabel = observer((props: IFreeFormElementLabel) => {
  return (
    <div className={style.FreeFormElementLabel}>
      <span className={style.title}>{props.title}</span>
    </div>
  );
});

export default FreeFormElementLabel;
