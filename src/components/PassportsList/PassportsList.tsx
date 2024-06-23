import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { LoaderType } from "../../interfaces/LoaderType";
import LoaderPage from "../LoaderPage/LoaderPage";

interface IPassportsList {
  content: ReactNode;

  isPassportLength?: boolean;
  loader?: LoaderType;
}

const PassportsList = observer((props: IPassportsList) => {
  return (
    <div className={style.PassportsList}>
      {props.loader !== "wait" && props.isPassportLength ? (
        <div className={style.passportsListWrap}>{props.content}</div>
      ) : (
        <LoaderPage />
      )}
    </div>
  );
});

export default PassportsList;
