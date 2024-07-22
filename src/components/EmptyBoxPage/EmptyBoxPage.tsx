import React from "react";
import { observer } from "mobx-react-lite";
import { ResponsesEmptyBox } from "@consta/uikit/ResponsesEmptyBox";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router";
import style from './style.module.css'
import classNames from "classnames";
interface IEmptyBoxPage {
  text?: string;
  description?: string;
  disableActions?: boolean;
    maxHeight?:boolean
}

const EmptyBoxPage = observer((props: IEmptyBoxPage) => {
  const store = useStore();

  const { t } = useTranslation("dict");

  const navigate = useNavigate();
  const toHome = () => {
    store.mainPageStore.resetSideBarToHome();
    navigate(`/`);
  };
  return (
    <ResponsesEmptyBox className={classNames(style.ResponsesEmptyBox, {
        [style.maxHeight]: props.maxHeight
    })}
      description={props.description ? props.description : " "}
      title={props.text ?? ""}
      actions={
        !props.disableActions ? (
          <Button onClick={toHome} view="ghost" label={t("toHome")} />
        ) : (
          " "
        )
      }
    />
  );
});

export default EmptyBoxPage;
