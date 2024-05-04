import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { useNavigate } from "react-router";
import { IconSelect } from "@consta/icons/IconSelect";
import { IBreadCrumbs } from "interfaces/IBreadCrumbs";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";

interface INavPanel {
  title: string;
  description: string;
  actionText: string;
}

const NavPanel = observer((props: INavPanel) => {
  const { t } = useTranslation("dict");

  const navigate = useNavigate();

  const pagesNoIcon: IBreadCrumbs[] = [
    {
      label: "Главная",
      index: -1,
      href: "#",
    },
    {
      label: "Данные инспекции",
    },
  ];
  const onItemClick = (item: IBreadCrumbs) => {
    if (item.index) {
      navigate(item.index);
    }
  };

  return (
    <div className={style.NavPanel}>
      <div className={style.flexCol}>
        <Breadcrumbs
            getItemLabel={(item: IBreadCrumbs) => item.label}
            onItemClick={onItemClick}
            items={pagesNoIcon}
        />
        <div className={style.title}>{props.title}</div>
        <div className={style.description}>{props.description}</div>

      </div>

      <div className={style.buttonsGroup}>
        <Button label={props.actionText} />
        <Button view="ghost" label={t("clearAll")} />
        <div className={style.rightBorder}></div>
        <Button iconRight={IconSelect} view="clear" label={t("description")} />
      </div>
    </div>
  );
});

export default NavPanel;
