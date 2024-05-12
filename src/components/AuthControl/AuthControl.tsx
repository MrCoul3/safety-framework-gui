import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { IconRing } from "@consta/icons/IconRing";
import { avatar } from "assets/img";
import { Button } from "@consta/uikit/Button";
import { User } from "@consta/uikit/User";

interface IAuthControl {
  name: string;
  description: string;
  avatar?: string;
}

const AuthControl = observer((props: IAuthControl) => {
  return (
    <div className={style.AuthControl}>
      <Button view="clear" form="round" iconRight={IconRing} onlyIcon />
      <User
        size="l"
        avatarUrl={props.avatar ? props.avatar : avatar}
        name={props.name}
        info={props.description}
      />
    </div>
  );
});

export default AuthControl;
