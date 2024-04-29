import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IFreeFormElement {
    
}

const FreeFormElement = observer((props: IFreeFormElement) => {
    return (
        <div className={style.FreeFormElement}>
            
        </div>
    );
});

export default FreeFormElement;