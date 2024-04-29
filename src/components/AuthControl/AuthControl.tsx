import React from "react";
import { observer } from "mobx-react-lite";
import style from "./style.module.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconBento } from "@consta/icons/IconBento";
import { IconButton } from "@mui/material";
import { Avatar } from "@consta/uikit/Avatar";
import { avatar } from "assets/img";
interface IAuthControl {
  name: string;
  description: string;

  avatar?: string;
}

const AuthControl = observer((props: IAuthControl) => {
  return (
    <div className={style.AuthControl}>
      <div>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton className={style.button} size={"small"}>
          <IconBento size={"xs"} />
        </IconButton>
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
