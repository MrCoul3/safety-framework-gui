import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { Badge } from "@consta/uikit/Badge";
import { icon13 } from "../../assets/icons";
import classNames from "classnames";

interface IPassportElement {
  title: string;
  id: string;
  isValid: boolean;
  barriersCount: number;
  icon?: string | null;
  onClick(id: string): void;
}

const PassportElement = observer((props: IPassportElement) => {
  const { t } = useTranslation("dict");

  const getStatus = () => {
    return props.isValid ? "success" : "warning";
  };

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={style.PassportElement}
    >
      <div className={style.logo}>
        <img
          className={classNames(style.logoIcon, {
            [style.plug]: !props.icon,
          })}
          src={props.icon ?? icon13}
          alt=""
        />
      </div>
      <div className={style.flexCol}>
        <span className={style.name}>{props.title}</span>
        <span className={style.barriersCount}>
          {t("barriersSelect")}
          <Badge
            size={"s"}
            label={props.barriersCount.toString()}
            status={props.barriersCount > 0 ? getStatus() : "system"}
            form={"round"}
          />
        </span>
      </div>
    </div>
  );
});

export default PassportElement;
