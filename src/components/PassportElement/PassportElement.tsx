import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IPassport } from "../../interfaces/IPassport";
import { useTranslation } from "react-i18next";
import { Badge } from "@consta/uikit/Badge";
import { icon3 } from "../../assets/icons";

interface IPassportElement {
  code: string;
  id: string;
  barriersCount: number;
  icon?: string;
  data: IPassport;
  onClick(id: string): void;
}

const PassportElement = observer((props: IPassportElement) => {
  const { t } = useTranslation("dict");

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={style.PassportElement}
    >
      <div className={style.logo}>
        <img className={style.logoIcon} src={props.icon ?? icon3} alt="" />
      </div>
      <span className={style.name}>{props.code}</span>
      <span className={style.barriersCount}>
        {t("barriersSelect")}
        <Badge
          size={"s"}
          label={props.barriersCount.toString()}
          status={props.barriersCount > 0 ? "warning" : "system"}
          form={"round"}
        />
      </span>
    </div>
  );
});

export default PassportElement;
