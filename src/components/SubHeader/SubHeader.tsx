import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsTypes } from "enums/SubGroupsTypes";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/icons/IconAdd";
import { useTranslation } from "react-i18next";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface ISubHeader {}

type Item = {
  label: string;
  id: string | number;
  groupId?: string | number;
};

const SubHeader = observer((props: ISubHeader) => {
  const { t } = useTranslation("dict");
  const [value, setValue] = useState<string | null>(null);
  const items: Item[] = [
    {
      label: "Барьеры",
      groupId: 1,
      id: 1,
    },
    {
      label: "Что то",
      groupId: 1,
      id: 2,
    },
  ];

  return (
    <div className={style.SubHeader}>
      <span className={style.title}>{t(SubGroupsTypes.Inspections)}</span>

      <div className={style.flexRow}>
        <Button
          className={style.button}
          label={t("addInspection")}
          iconLeft={IconAdd}
        />
        <Autocomplete
          classes={{ input: style.textField }}
          fullWidth
          className={style.autocomplete}
          size={"small"}
          multiple
          id="fast-search"
          options={items}
          noOptionsText={t("noOptions")}
          renderInput={(params) => (
            <TextField placeholder={t("fastSearch")} {...params} />
          )}
        />
      </div>
    </div>
  );
});

export default SubHeader;
