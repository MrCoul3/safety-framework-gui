import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import { User } from "@consta/uikit/User";

interface IAuthControl {
  name: string;
  info?: string;
  avatar?: string;
}

const AuthControl = observer((props: IAuthControl) => {
  return (
    <div className={style.AuthControl}>
      <User width={'full'} className={style.user}
        size="l"
        avatarUrl={props.avatar ? props.avatar : ""}
        name={props.name}
        info={props.info}
      />
    </div>
  );
});

export default AuthControl;
