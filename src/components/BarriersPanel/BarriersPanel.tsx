import React, { ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BarrierFieldTypes } from "../../enums/BarrierTypes";
import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router";

interface IBarriersPanel {
  filledBarriers: IFilledBarrier[];
  renderForm(index: number): ReactNode;
  barrierTitle: string | null;
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

  return (
    <div>
      <div className={style.BarriersPanelWrap}>
        {
          props.filledBarriers.length ? (
            <div className={style.barriersPanel}>
              {props.filledBarriers.map((barrier, index) => (
                <div
                  onClick={() => onItemClick(barrier, index)}
                  className={classNames(style.panelElement, {
                    [style.panelElementActive]: isActiveIndex === index,
                  })}
                >
                  {code(props.barrierTitle ?? "")} - {index + 1}{" "}
                  <span
                    className={classNames({
                      [style.success]: getIsValid(index, barrier.barrierId),
                      [style.warning]: !getIsValid(index, barrier.barrierId),
                    })}
                  >
                    &#8226;
                  </span>
                </div>
              ))}
            </div>
          ) : null /*: (
          <span className={style.noBarrierPanelElements}>
            {t("noBarrierPanelElements")}
          </span>
        )*/
        }
      </div>
      {props.renderForm(isActiveIndex)}
    </div>
  );
});

export default BarriersPanel;
