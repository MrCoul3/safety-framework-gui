import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface ISideBar {

}

const SideBar = observer((props: ISideBar) => {
    return (
        <div className={style.SideBar}>
            SideBar
        </div>
    );
});

export default SideBar;