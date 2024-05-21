import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Button } from "@consta/uikit/Button";
import { IconRemove } from "@consta/icons/IconRemove";
import { IconAdd } from "@consta/icons/IconAdd";
import { Badge } from "@consta/uikit/Badge";
interface ICounter {}

const Counter = observer((props: ICounter) => {
  const handleDecrease = (e: React.MouseEvent) => {};

  return (
    <div className={style.Counter}>
      <Button
        className={"button"}
        form={"round"}
        onClick={handleDecrease}
        size={"s"}
        view={"clear"}
        onlyIcon
        iconLeft={IconRemove}
      />
      <Badge label={"0"} status={"system"} form={"round"} />
      <Button
        className={"button"}
        form={"round"}
        size={"s"}
        view={"clear"}
        onlyIcon
        iconLeft={IconAdd}
      />
    </div>
  );
});

export default Counter;
