import React, { useEffect } from "react";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import { IconSearchStroked } from "@consta/icons/IconSearchStroked";
import { TextField } from "@consta/uikit/TextField";

const KEY_CODE_ESC = 27;
interface ISimpleSearch {
  handleInput(str: string): void;
  handleClearSearchValue(): void;
  value: string | null;
  placeholder?: string;
}
const SimpleSearch = (props: ISimpleSearch) => {
  const { t } = useTranslation("dict");

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === KEY_CODE_ESC) {
      props.handleClearSearchValue();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={style.simpleSearch}>
      <TextField
        leftSide={IconSearchStroked}
        className={style.input}
        onInput={onInput}
        value={props.value ?? ""}
        autoFocus
        placeholder={t(props.placeholder ?? "searchPlaceholder")}
      />
      {props.value && <div className={style.closeIcon}></div>}
    </div>
  );
};

export default SimpleSearch;
