import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IPassportForm {
    
}

const PassportForm = observer((props: IPassportForm) => {
    return (
        <div className={style.PassportForm}>
            
        </div>
    );
});

export default PassportForm;