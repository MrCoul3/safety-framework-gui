import React, {ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IPassportsList {
    content: ReactNode
}

const PassportsList = observer((props: IPassportsList) => {
    return (
        <div className={style.PassportsList}>
            <div className={style.passportsListWrap}>
                {props.content}
            </div>
        </div>
    );
});

export default PassportsList;