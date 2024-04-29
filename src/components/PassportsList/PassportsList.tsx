import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IPassportsList {
    
}

const PassportsList = observer((props: IPassportsList) => {
    return (
        <div className={style.PassportsList}>
            
        </div>
    );
});

export default PassportsList;