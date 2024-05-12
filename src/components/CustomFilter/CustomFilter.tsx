import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface ICustomFilter {
    
}

const CustomFilter = observer((props: ICustomFilter) => {
    return (
        <div className={style.CustomFilter}>
            
        </div>
    );
});

export default CustomFilter;