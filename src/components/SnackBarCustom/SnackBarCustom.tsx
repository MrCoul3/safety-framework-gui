import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { SnackBar } from "@consta/uikit/SnackBar";
import { IconAllDone } from "@consta/icons/IconAllDone";
import { Item } from "../../stores/SnackBarStore";

interface ISnackBarCustom {
  item: Item | null;
  onItemClose(): void;
}

const SnackBarCustom = observer((props: ISnackBarCustom) => {
  return (
    props.item && (
      <SnackBar
        className={style.SnackBarCustom}
        getItemIcon={() => (props.item?.icon ? props.item?.icon : IconAllDone)}
        onItemClose={props.onItemClose}
        getItemAutoClose={() => 3}
        items={[props.item]}
        getItemMessage={(item) => item?.message}
      />
    )
  );
});

export default SnackBarCustom;
