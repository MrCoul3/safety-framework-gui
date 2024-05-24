import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { TextField } from "@consta/uikit/TextField";
import { useTranslation } from "react-i18next";
import { IconSearchStroked } from "@consta/icons/IconSearchStroked";

interface ISearch {
  label?: string;
    handleSearch(value: string | null):void
}

const Search = observer((props: ISearch) => {
  const { t } = useTranslation("dict");

  const [value, setValue] = useState<string | null>(null);
  const handleChange = (value: string | null) => {
      setValue(value)
      props.handleSearch(value)
  };

  const textField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fieldBody = textField.current?.parentElement;
    fieldBody?.classList.add("searchBarriersField");
  }, [textField]);

  return (
    <div className={style.Search}>
      <span className={style.label}>{props.label}</span>
      <TextField
        ref={textField}
        leftSide={IconSearchStroked}
        onChange={handleChange}
        value={value}
        type="text"
        placeholder={t("searchBarriersPlaceholder")}
      />
    </div>
  );
});

export default Search;
