import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IInspectionForm {
    
}

const InspectionForm = observer((props: IInspectionForm) => {
    return (
        <div className={style.InspectionForm}>
            
        </div>
    );
});

export default InspectionForm;