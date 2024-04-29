import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IDashBoard {

}

const DashBoard = observer((props: IDashBoard) => {
    return (
        <div className={style.DashBoard}>
            DashBoard
        </div>
    );
});

export default DashBoard;