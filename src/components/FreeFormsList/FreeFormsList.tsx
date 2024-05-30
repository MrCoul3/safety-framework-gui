import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";

interface IFreeFormsList {
  content: ReactNode;
  control: ReactNode
}

const FreeFormsList = observer((props: IFreeFormsList) => {
  return (
    <div className={style.FreeFormsList}>
        <div className={style.controls}>{props.control}</div>
      <div className={style.freeFormsListWrap}>{props.content}</div>
    </div>
  );
});

export default FreeFormsList;
