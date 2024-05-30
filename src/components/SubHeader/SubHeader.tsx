import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SubGroupsTypes } from "enums/SubGroupsTypes";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/icons/IconAdd";
import { useTranslation } from "react-i18next";
import { Combobox } from "@consta/uikit/Combobox";

interface ISubHeader {
  handleAddInspection(): void;
  title?: string;
}

type Item = {
  label: string;

  id: string | number;
  groupId?: string | number;
};

const SubHeader = observer((props: ISubHeader) => {
  const { t } = useTranslation("dict");

  return (
    <div className={style.SubHeader}>
      <span className={style.title}>
        {props.title ? props.title : t("mainListOfInspections")}
      </span>
      <div className={style.flexRow}>
        <Button
          onClick={props.handleAddInspection}
          className={style.button}
          label={t("addInspection")}
          iconLeft={IconAdd}
        />
      </div>
    </div>
  );
});

export default SubHeader;
