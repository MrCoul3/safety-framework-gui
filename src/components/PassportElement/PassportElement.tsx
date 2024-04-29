import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IPassportElement {
    
}

const PassportElement = observer((props: IPassportElement) => {
    return (
        <div className={style.PassportElement}>
            
        </div>
    );
});

export default PassportElement;