import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IconBento } from "@consta/icons/IconBento";
import { IconRing } from "@consta/icons/IconRing";
import { Avatar } from "@consta/uikit/Avatar";
import { avatar } from "assets/img";
import {Button} from "@consta/uikit/Button";
interface IAuthControl {
  name: string;
  description: string;

  avatar?: string;
}

const AuthControl = observer((props: IAuthControl) => {
  return (
    <div className={style.AuthControl}>
      <div>
          <Button view="clear" form="round" iconRight={IconRing} onlyIcon />
          <Button view="clear" form="round" iconRight={IconBento} onlyIcon />

      </div>

      <div className={style.flexRow}>
        <Avatar
          className={style.avatar}
          url={props.avatar ? props.avatar : avatar}
          name={props.name}
        />
        <div className={style.flexColumn}>
          <span>{props.name}</span>
          <span className={style.description}>{props.description}</span>
        </div>
      </div>
    </div>
  );
});

export default AuthControl;
