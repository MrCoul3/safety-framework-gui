import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import AuthControl from "../AuthControl/AuthControl";

interface IMainHeader {
    handleLogoClick?(): void
}
const MainHeader = observer((props: IMainHeader) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.MainHeader}>
      <div onClick={props.handleLogoClick} className={style.mainTitle}>
        <span className={style.mainTitleContent}>{t("mainTitle")}</span>{" "}
      </div>
      <div className={style.flexRow}>
        <AuthControl name={"Иван Иванов"} description={"информация"} />
      </div>
    </div>
  );
});

export default MainHeader;
