import React, { ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { useNavigate, useParams } from "react-router";
import { IBreadCrumbs } from "interfaces/IBreadCrumbs";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { IconBackward } from "@consta/icons/IconBackward";
import classNames from "classnames";

interface INavPanel {
  title: string;
  description?: string;
  crumbs: IBreadCrumbs[];
  disableSaveButton?: boolean;

  disableButtons?: boolean;
  isDisableSaveInspectionButton?: boolean;
  actions?: ReactNode;
  sendButton?: ReactNode;
  actionText?: string;
  handleSaveInspection?(): void;
  handleEditPassports?(): void;
}

const NavPanel = observer((props: INavPanel) => {
  const { t } = useTranslation("dict");

  const navigate = useNavigate();

  const onItemClick = (item: IBreadCrumbs) => {
    if (item.path === "main") {
      // setIsModalOpen(true);
      handleConfirm();
      return;
    }
    if (item.index) {
      navigate(item.index);
    }
  };
  const handleConfirm = () => {
    navigate("/");
  };
  return (
    <div className={classNames(style.NavPanel, {
      [style.minSize]: props.disableButtons
    }) }>
      <div className={style.flexCol}>
        <div className={style.flexContainer}>
          <Button
            onClick={() => navigate(-1)}
            className={style.backwardBtn}
            size={"s"}
            view={"clear"}
            onlyIcon
            iconLeft={IconBackward}
          />
          <Breadcrumbs
            className={style.Breadcrumbs}
            getItemLabel={(item: IBreadCrumbs) => item.label}
            onItemClick={onItemClick}
            items={props.crumbs}
          />
        </div>

        <div className={style.title}>{props.title}</div>
        <div className={style.description}>{props.description}</div>
      </div>

      {!props.disableButtons && (
        <div className={style.buttonsGroup}>
          <div className={style.flexContainer}>
            {!props.isDisableSaveInspectionButton && (
              <Button
                disabled={props.disableSaveButton}
                onClick={props.handleSaveInspection}
                label={t("saveInspection")}
              />
            )}

            {props.actions}
          </div>
          {props.sendButton}
        </div>
      )}

      {/*<ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("go")}
        title={t("dialogGoToMain")}
        action={handleConfirm}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />*/}
    </div>
  );
});

export default NavPanel;
