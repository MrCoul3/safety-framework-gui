import React, {ReactNode, useEffect} from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { useNavigate, useParams } from "react-router";
import { IBreadCrumbs } from "interfaces/IBreadCrumbs";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

interface INavPanel {
  title: string;
  description: string;
  crumbs: IBreadCrumbs[];
  disableSaveButton?: boolean;
  actions?: ReactNode;
  actionText?: string;
  handleSaveInspection?(): void;
  handleEditPassports?(): void;
}

const NavPanel = observer((props: INavPanel) => {
  const { t } = useTranslation("dict");

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [pageIndex, setPageIndex] = React.useState<number>();

  const onItemClick = (item: IBreadCrumbs) => {
    if (item.path === 'main') {
      setIsModalOpen(true)
      setPageIndex(item.index)
      return;
    }
    if (item.index) {
      navigate(item.index);
    }
  };
  const handleConfirm = () => {
    if (pageIndex) {
      navigate(pageIndex - 1);
    }
  }
  return (
    <div className={style.NavPanel}>
      <div className={style.flexCol}>
        <Breadcrumbs
          getItemLabel={(item: IBreadCrumbs) => item.label}
          onItemClick={onItemClick}
          items={props.crumbs}
        />
        <div className={style.title}>{props.title}</div>
        <div className={style.description}>{props.description}</div>
      </div>

      <div className={style.buttonsGroup}>
        {/* {editInspectionId && (
          <Button
            view="secondary"
            onClick={props.handleEditPassports}
            label={t("editPassports")}
            iconLeft={IconEdit}
          />
        )}*/}
        <Button
          // iconLeft={IconSave}
          disabled={props.disableSaveButton}
          onClick={props.handleSaveInspection}
          label={t("saveInspection")}
        />
        {props.actions}
      </div>
      <ConfirmDialog
          cancelActionLabel={t("cancel")}
          confirmActionLabel={t("go")}
          title={t("dialogGoToMain")}
          action={handleConfirm}
          onClose={() => setIsModalOpen(false)}
          open={isModalOpen}
      />
    </div>
  );
});

export default NavPanel;
