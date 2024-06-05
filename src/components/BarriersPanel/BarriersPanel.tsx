import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IBarriersPanel {
    
}

const BarriersPanel = observer((props: IBarriersPanel) => {
    return (
        <div className={style.BarriersPanel}>
            BarriersPanel
        </div>
    );
});

export default BarriersPanel;