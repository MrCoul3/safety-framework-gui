import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IMainHeader {

}

const MainHeader = observer((props: IMainHeader) => {
    return (
        <div className={style.MainHeader}>
            MainHeader
        </div>
    );
});

export default MainHeader;