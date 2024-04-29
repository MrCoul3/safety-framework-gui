import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IFormHeader {
    
}

const FormHeader = observer((props: IFormHeader) => {
    return (
        <div className={style.FormHeader}>
            
        </div>
    );
});

export default FormHeader;