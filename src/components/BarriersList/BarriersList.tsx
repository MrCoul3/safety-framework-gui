import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";

interface IBarriersList {
  content: ReactNode;
  search: ReactNode;
}

const BarriersList = observer((props: IBarriersList) => {
  return (
    <div className={style.BarriersList}>
      <div className={style.barriersListWrap}>
        {props.search}
        {props.content}
      </div>
    </div>
  );
});

export default BarriersList;
