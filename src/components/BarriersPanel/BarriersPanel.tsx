import React, {ReactNode, useState} from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IFilledBarrier } from "../../interfaces/IFilledBarrier";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

interface IBarriersPanel {
  barriers: IFilledBarrier[];
  renderForm(index: number): ReactNode
}

const BarriersPanel = observer((props: IBarriersPanel) => {
  const code = (title: string) => title?.split(" ")[0];
  const { t } = useTranslation("dict");

  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const onItemClick = (item: IFilledBarrier, index: number) => {
    setIsActiveIndex(index);
  };

  return (
    <div>
      <div className={style.BarriersPanelWrap}>
        {
          props.barriers.length ? (
            <div className={style.barriersPanel}>
              {props.barriers.map((item, index) => (
                <div
                  onClick={() => onItemClick(item, index)}
                  className={classNames(style.panelElement, {
                    [style.panelElementActive]: isActiveIndex === index,
                  })}
                >
                  {/* {t("barrier")}*/} {code(item.title ?? "")} - {index + 1}{" "}
                  <span>&#8226;</span>
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
