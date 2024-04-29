import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IFreeFormElementForm {
    
}

const FreeFormElementForm = observer((props: IFreeFormElementForm) => {
    return (
        <div className={style.FreeFormElementForm}>
            
        </div>
    );
});

export default FreeFormElementForm;