import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IPassport } from "../../interfaces/IPassport";
import { useTranslation } from "react-i18next";
import { Badge } from "@consta/uikit/Badge";

interface IPassportElement {
  data: IPassport;
  onClick(id: number): void;
}

const PassportElement = observer((props: IPassportElement) => {
  const { t } = useTranslation("dict");

  return (
    <div
      onClick={() => props.onClick(props.data.id)}
      className={style.PassportElement}
    >
      <div className={style.logo}>
        <img className={style.logoIcon} src={props.data.icon ?? ""} alt="" />
      </div>
      <span className={style.name}>{props.data.code}</span>
      <span className={style.barriersCount}>
        {t("barriersSelect")}
        <Badge
          size={"s"}
          label={props.data.barriers.length.toString()}
          status={"system"}
          form={"round"}
        />
      </span>
    </div>
  );
});

export default PassportElement;
