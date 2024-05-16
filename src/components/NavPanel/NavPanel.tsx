import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { useNavigate, useParams } from "react-router";
import { IBreadCrumbs } from "interfaces/IBreadCrumbs";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconSave } from "@consta/icons/IconSave";

interface INavPanel {
  title: string;
  description: string;
  disableSaveButton?: boolean;
  actionText?: string;
  handleSaveInspection(): void;
  handleEditPassports(): void;
}

const NavPanel = observer((props: INavPanel) => {
  const { t } = useTranslation("dict");

  let { editInspectionId } = useParams();

  const navigate = useNavigate();

  const pagesNoIcon: IBreadCrumbs[] = [
    {
      label: t("mainPage"),
      index: -1,
      href: "#",
    },
    {
      label: editInspectionId ? t("editInspectionData") : t("inspectionData"),
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
        {editInspectionId && (
          <Button
            view="secondary"
            onClick={props.handleEditPassports}
            label={t("editPassports")}
            iconLeft={IconEdit}
          />
        )}
        <Button
          iconLeft={IconSave}
          disabled={props.disableSaveButton}
          onClick={props.handleSaveInspection}
          label={t("saveChanges")}
        />
      </div>
    </div>
  );
});

export default NavPanel;
