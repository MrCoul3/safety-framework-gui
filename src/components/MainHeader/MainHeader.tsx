import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import SimpleSearch from "../shared/SimpleSearch/SimpleSearch";
import { useTranslation } from "react-i18next";
import AuthControl from "../AuthControl/AuthControl";

interface IMainHeader {
  handleClearSearchValue(): void;
  handleInput(str: string): void;
  searchValue: string | null;
}

const MainHeader = observer((props: IMainHeader) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.MainHeader}>
      <div className={style.mainTitle}>
        <span className={style.mainTitleContent}>{t("mainTitle")}</span>{" "}
      </div>
      <div className={style.flexRow}>
        <SimpleSearch
          value={props.searchValue}
          handleInput={props.handleInput}
          handleClearSearchValue={props.handleClearSearchValue}
        />
        <AuthControl name={"Иван Иванов"} description={"информация"} />
      </div>
    </div>
  );
});

export default MainHeader;
