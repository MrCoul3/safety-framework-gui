import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Breadcrumbs } from "@consta/uikit/Breadcrumbs";
import { useNavigate, useParams } from "react-router";
import { IconSelect } from "@consta/icons/IconSelect";
import { IBreadCrumbs } from "interfaces/IBreadCrumbs";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { IconEdit } from "@consta/icons/IconEdit";

interface INavPanel {
  title: string;
  description: string;
  actionText?: string;

  handleClearInspectionForm(): void;
  handleCreateInspection(): void;
  handleEditPassports(): void;
  formFieldsValuesLength?: boolean;
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

  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        {editInspectionId ? (
          <>
            <Button view="secondary"
              onClick={props.handleEditPassports}
              label={t("editPassports")}
                    iconLeft={IconEdit}
            />
            <Button
              onClick={props.handleCreateInspection}
              label={t("saveChanges")}
            />
          </>
        ) : (
          <Button
            onClick={() => props.handleCreateInspection()}
            label={t("createInspection")}
          />
        )}

        <Button
          onClick={() => props.formFieldsValuesLength && setIsModalOpen(true)}
          view="ghost"
          label={t("clearAll")}
        />
        <div className={style.rightBorder}></div>
        <Button iconRight={IconSelect} view="clear" label={t("description")} />
      </div>
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("clear")}
        title={t("dialogClearFields")}
        action={props.handleClearInspectionForm}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </div>
  );
});

export default NavPanel;
