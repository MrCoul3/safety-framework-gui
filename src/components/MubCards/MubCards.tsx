import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Card } from "@consta/uikit/Card";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { IconDocBlank } from "@consta/icons/IconDocBlank";
import { IconChatFilled } from "@consta/icons/IconChatFilled";

interface IMubCards {
  mub: string | null;
  mubHint: string | null;
}

const MubCards = observer((props: IMubCards) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.MubCards}>
      <Card
        content={props.mub ?? "Нет данных"}
        className={classNames(style.card, style.mub)}
        verticalSpace="xs"
        horizontalSpace="xs"
      >
        <div className={style.title}>
          {" "}
          <IconDocBlank size={"s"} />
          {t("mubTitle")}
        </div>
        <div className={style.content}>{props.mub ?? t("noData")}</div>
      </Card>
      <Card
        className={classNames(style.card, style.mubHint)}
        verticalSpace="xs"
        horizontalSpace="xs"
      >
        <div className={style.title}>
          <IconChatFilled size={"s"} />
          {t("mubHintTitle")}
        </div>
        <div className={style.content}>{props.mubHint ?? t("noData")}</div>
      </Card>
    </div>
  );
});

export default MubCards;
