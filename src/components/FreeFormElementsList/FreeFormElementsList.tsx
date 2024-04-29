import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IFreeFormElementsList {
    
}

const FreeFormElementsList = observer((props: IFreeFormElementsList) => {
    return (
        <div className={style.FreeFormElementsList}>
            
        </div>
    );
});

export default FreeFormElementsList;