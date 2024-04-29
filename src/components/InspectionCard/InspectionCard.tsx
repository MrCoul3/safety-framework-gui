import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IInspectionCard {

}

const InspectionCard = observer((props: IInspectionCard) => {
    return (
        <div className={style.InspectionCard}>
            InspectionCard
        </div>
    );
});

export default InspectionCard;