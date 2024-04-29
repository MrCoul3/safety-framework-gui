import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IInspectionsTable {
    
}

const InspectionsTable = observer((props: IInspectionsTable) => {
    return (
        <div className={style.InspectionsTable}>
            
        </div>
    );
});

export default InspectionsTable;