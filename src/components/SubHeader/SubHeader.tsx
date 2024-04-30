import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsTypes } from "enums/SubGroupsTypes";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/icons/IconAdd";
import { useTranslation } from "react-i18next";
import { TextField } from "@consta/uikit/TextField";

import { IconSearchStroked } from "@consta/icons/IconSearchStroked";

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
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className={style.SubHeader}>
      <span className={style.title}>{t(SubGroupsTypes.Inspections)}</span>

      <div className={style.flexRow}>
        <Button
          className={style.button}
          label={t("addInspection")}
          iconLeft={IconAdd}
        />
        <TextField
          rightSide={IconSearchStroked}
          className={style.input}
          onInput={onInput}
          // value={props.value ?? ""}
          autoFocus
          placeholder={t("fastSearch")}
        />
      </div>
    </div>
  );
});

export default SubHeader;
