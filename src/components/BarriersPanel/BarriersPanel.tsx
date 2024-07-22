import React, { ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router";
import { IconClose } from "@consta/icons/IconClose";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

interface IBarriersPanel {
  filledBarriers: IFilledBarrier[];
  renderForm(index: number): ReactNode;
  barrierTitle: string | null;
  handleDeleteBarrier?(id?: number, index?: number): void;
}

const BarriersPanel = observer((props: IBarriersPanel) => {
  const store = useStore();

  const { passportId } = useParams();

  const code = (title: string) => title?.split(" ")[0];
  const { t } = useTranslation("dict");

  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const onItemClick = (item: IFilledBarrier, index: number) => {
    setIsActiveIndex(index);
  };

  const getIsValid = (index: number, barrierId: number) => {
    return store.barriersStore.checkIsFilledBarrierSuccess(
      barrierId,
      index,
      passportId,
    );
  };

  const [isDelModalOpen, setIsDelModalOpen] = React.useState<{
    index: number;
    barrierId: number;
  } | null>(null);

  return (
    <div>
      <div className={style.BarriersPanelWrap}>
        {props.filledBarriers.length ? (
          <div className={style.barriersPanel}>
            {props.filledBarriers.map((barrier, index) => (
              <div
                className={classNames(style.panelElement, {
                  [style.panelElementActive]: isActiveIndex === index,
                })}
              >
                <span onClick={() => onItemClick(barrier, index)}>
                  {code(props.barrierTitle ?? "")} - {index + 1}{" "}
                </span>
                <span
                  className={classNames({
                    [style.success]: getIsValid(index, barrier.barrierId),
                    [style.warning]: !getIsValid(index, barrier.barrierId),
                  })}
                >
                  &#8226;
                </span>
                <IconClose
                  onClick={() =>
                    setIsDelModalOpen({
                      barrierId: barrier.barrierId,
                      index: index,
                    })
                  }
                  className={style.deleteIcon}
                  size={"s"}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <ConfirmDialog
        cancelActionLabel={t("cancel")}
        confirmActionLabel={t("delete")}
        title={t("dialogDeleteBarrier")}
        action={() =>
          props.handleDeleteBarrier?.(
            isDelModalOpen?.barrierId,
            isDelModalOpen?.index,
          )
        }
        onClose={() => setIsDelModalOpen(null)}
        open={!!isDelModalOpen}
      />
      {props.renderForm(isActiveIndex)}
    </div>
  );
});

export default BarriersPanel;
