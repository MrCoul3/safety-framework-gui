import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";

interface IItemGroupTitle {
  groupTitle: string;
}

const ItemGroupTitle = observer((props: IItemGroupTitle) => {
  const { t } = useTranslation("dict");
  return <div className={style.groupTitle}>{t(props.groupTitle)}</div>;
});

export default ItemGroupTitle;
