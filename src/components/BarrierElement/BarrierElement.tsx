import React, { ReactNode, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IBarrier } from "../../interfaces/IBarrier";
import Counter from "../Counter/Counter";
import { Collapse } from "@consta/uikit/Collapse";

interface IBarrierElement {
  data?: IBarrier;
  content?: ReactNode;
}

const BarrierElement = observer((props: IBarrierElement) => {
  const title = props.data?.Title;

  const code = title?.split(" ")[0];

  const name = title?.replace(code ?? "", "");

  useEffect(() => {
    console.log("name", name);
  }, []);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleDecrease = (e: React.MouseEvent) => {};

  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.closest(".button")) {
      e.preventDefault();
      return;
    }
    setOpen(!isOpen);
  };

  return (
    <Collapse
      iconView="ghost"
      iconPosition={"right"}
      isOpen={isOpen}
      onClick={onClick}
      label={
        <div className={style.BarrierElement}>
          <div className={style.title}>
            <span className={style.code}>{code}</span>
            <span className={style.name}>{name}</span>
          </div>
          <Counter />
        </div>
      }
    >
      {props.content}
    </Collapse>
  );
});

export default BarrierElement;
