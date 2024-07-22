import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";

interface IEmptyBox {
  text: string;
}

const EmptyBox = observer((props: IEmptyBox) => {
  return <div className={style.EmptyBox}>{props.text}</div>;
});

export default EmptyBox;
