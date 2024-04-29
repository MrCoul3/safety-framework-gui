import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IBarrierPassportCard {
    
}

const BarrierPassportCard = observer((props: IBarrierPassportCard) => {
    return (
        <div className={style.BarrierPassportCard}>
            
        </div>
    );
});

export default BarrierPassportCard;