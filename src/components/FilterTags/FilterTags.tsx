import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IInspectionFilters } from "../../interfaces/IInspectionFilters";
import { IFormDateFieldValue, Item } from "../../stores/InspectionStore";
import { Tag } from "@consta/uikit/Tag";
import { useTranslation } from "react-i18next";
import { Badge } from "@consta/uikit/Badge";
import { IFilterFieldVal, IFilterFieldValue } from "../../stores/MainPageStore";
import { toJS } from "mobx";
import { Button } from "@consta/uikit/Button";
import { IconClose } from "@consta/icons/IconClose";
import { InspectionFormTypes } from "../../enums/InspectionFormTypes";
import moment from "moment";

interface IFilterTags {
  filterFieldsValues: IInspectionFilters | null;
  handleDeleteFilter(value: IFilterFieldValue | IFormDateFieldValue): void;
  resetFilters(): void;
}

const FilterTags = observer((props: IFilterTags) => {
  const { t } = useTranslation("dict");

  const filterFieldsValues = props.filterFieldsValues as {
    [key: string]: Item[] | Date;
  };

  const handleDeleteFilter = (value: IFilterFieldVal | IFormDateFieldValue) => {
    const delKey = Object.keys(value)[0];
    const delVal = Object.values(value)[0];

    if (delKey === InspectionFormTypes.AuditDate) {
      const filterFieldsValues = props.filterFieldsValues as {
        [key: string]: Date;
      };

      delete filterFieldsValues[InspectionFormTypes.AuditDate];

      props.handleDeleteFilter(filterFieldsValues);
    } else {
      const filterFieldsValues = props.filterFieldsValues as {
        [key: string]: Item[];
      };
      filterFieldsValues[delKey] = (
        filterFieldsValues[delKey] as Item[]
      ).filter((val) => val.id !== delVal?.id);

      if (!filterFieldsValues[delKey].length) {
        delete filterFieldsValues[delKey];
      }

      console.log(
        "handleDeleteFilter filterFieldsValues[delKey]",
        toJS(filterFieldsValues[delKey]),
      );
      console.log(
        "handleDeleteFilter filterFieldsValues",
        toJS(filterFieldsValues),
      );
      console.log("handleDeleteFilter delKey", delKey);
      console.log("handleDeleteFilter delVal", delVal);
      props.handleDeleteFilter(filterFieldsValues);
    }
  };

  return (
    <div className={style.FilterTags}>
      {Object.keys(filterFieldsValues).length ? (
        <Button
          onClick={props.resetFilters}
          className={style.resetBtn}
          size={"s"}
          iconLeft={IconClose}
          view="secondary"
          label={t("resetFilter")}
        />
      ) : (
        ""
      )}

      {filterFieldsValues
        ? Object.keys(filterFieldsValues).map((key) => (
            <div className={style.tags}>
              {filterFieldsValues[key] ? (
                <Badge status="normal" label={t(key) + ": "} />
              ) : (
                ""
              )}

              <div className={style.tags}>
                {key === InspectionFormTypes.AuditDate &&
                filterFieldsValues[key] ? (
                  <Tag
                    mode="cancel"
                    onCancel={() =>
                      handleDeleteFilter({
                        [key]: filterFieldsValues[key] as Date,
                      })
                    }
                    label={moment(filterFieldsValues[key] as Date).format(
                      "DD.MM.YYYY",
                    )}
                  />
                ) : filterFieldsValues[key] &&
                  (filterFieldsValues[key] as Item[]).length ? (
                  (filterFieldsValues[key] as Item[]).map((val) => (
                    <Tag
                      mode="cancel"
                      onCancel={() => handleDeleteFilter({ [key]: val })}
                      label={val.title}
                    />
                  ))
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        : ""}
    </div>
  );
});

export default FilterTags;
