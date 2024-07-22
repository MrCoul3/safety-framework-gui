import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Badge } from "@consta/uikit/Badge";
interface ICounter {
  length?: string;
  status: "warning" | "success" | "system";
}

const Counter = observer((props: ICounter) => {
  return (
    <div className={style.Counter}>
      <Badge label={props.length} status={props.status} form={"round"} />
    </div>
  );
});

export default Counter;
