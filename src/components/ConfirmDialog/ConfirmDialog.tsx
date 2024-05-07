import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { Modal } from "@consta/uikit/Modal";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { useTranslation } from "react-i18next";

interface IConfirmDialog {
  open: boolean;
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
      <Modal
        onClose={props.onClose}
        isOpen={isModalOpen}
        hasOverlay
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <Text as="p" size="l" view="secondary" lineHeight="m">
          Этозаголовок модального окна
        </Text>
        <Text as="p" size="s" view="secondary" lineHeight="m">
          Это содержимое модального окна. Здесь может быть что угодно: текст,
          изображение, форма или таблица. Всё, что хочется вынести из контекста
          и показать поверх основной страницы.
        </Text>
        <div>
          <Button
            size="m"
            view="primary"
            label={t("cancel")}
            width="default"
            onClick={() => setIsModalOpen(false)}
          />
          <Button
            size="m"
            view="primary"
            label={t("clear")}
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
