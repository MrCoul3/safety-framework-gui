import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Modal } from "@consta/uikit/Modal";
import { Button } from "@consta/uikit/Button";
import { useTranslation } from "react-i18next";

interface IConfirmDialog {
  open: boolean;
  title: string;
  cancelActionLabel?: string;
  confirmActionLabel: string;
  onClose(): void;
  action(): void;
}

const ConfirmDialog = observer((props: IConfirmDialog) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { t } = useTranslation("dict");

  useEffect(() => {
    setIsModalOpen(props.open);
  }, [props.open]);

  return (
    <div className={style.ConfirmDialog}>
      <Modal className={style.modal}
        onClose={props.onClose}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
         <span className={style.title}>{props.title}</span>

        <div className={style.buttonGroup}>
          <Button
            size="m"
            view="ghost"
            label={props.cancelActionLabel}
            width="default"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            size="m"
            view="primary"
            label={props.confirmActionLabel}
            width="default"
            onClick={() => {
              props.action();
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
});

export default ConfirmDialog;
