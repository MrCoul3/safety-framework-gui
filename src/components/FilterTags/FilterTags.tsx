import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IInspectionFilters } from "../../interfaces/IInspectionFilters";
import { Item } from "../../stores/InspectionStore";
import { Tag } from "@consta/uikit/Tag";
import { useTranslation } from "react-i18next";
import { Badge } from "@consta/uikit/Badge";
import { IFilterFieldVal, IFilterFieldValue } from "../../stores/MainPageStore";
import { toJS } from "mobx";
import { Button } from "@consta/uikit/Button";
import { IconClose } from "@consta/icons/IconClose";

interface IFilterTags {
  filterFieldsValues: IInspectionFilters | null;
  handleDeleteFilter(value: IFilterFieldValue): void;
  resetFilters(): void;
}

const FilterTags = observer((props: IFilterTags) => {
  const { t } = useTranslation("dict");

  const filterFieldsValues = props.filterFieldsValues as {
    [key: string]: Item[];
  };

  const handleDeleteFilter = (value: IFilterFieldVal) => {
    const delKey = Object.keys(value)[0];
    const delVal = Object.values(value)[0];

    filterFieldsValues[delKey] = filterFieldsValues[delKey].filter(
      (val) => val.id !== delVal?.id,
    );
    props.handleDeleteFilter(filterFieldsValues);
  };

  return (
    <div className={style.FilterTags}>
      {Object.keys(filterFieldsValues).length ?  <Button
          onClick={props.resetFilters}
          className={style.resetBtn}
          size={"s"}
          iconLeft={IconClose}
          view="secondary"
          label={t("resetFilter")}
      /> : ""}

      {filterFieldsValues
        ? Object.keys(filterFieldsValues).map((key) => (
            <div className={style.tags}>
              {filterFieldsValues[key] && filterFieldsValues[key].length ? (
                <Badge status="normal" label={t(key) + ": "} />
              ) : (
                ""
              )}

              <div className={style.tags}>
                {filterFieldsValues[key] && filterFieldsValues[key].length
                  ? filterFieldsValues[key].map((val) => (
                      <Tag
                        mode="cancel"
                        onCancel={() => handleDeleteFilter({ [key]: val })}
                        label={val.title}
                      />
                    ))
                  : ""}
              </div>
            </div>
          ))
        : ""}
    </div>
  );
});

export default FilterTags;
