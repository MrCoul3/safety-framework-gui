import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface ISubHeader {

}

const SubHeader = observer((props: ISubHeader) => {
    return (
        <div className={style.SubHeader}>
            SubHeader
        </div>
    );
});

export default SubHeader;