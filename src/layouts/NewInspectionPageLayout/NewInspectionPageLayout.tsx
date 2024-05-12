import React, {ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface INewInspectionPageLayout {
    navPanel: ReactNode
    content: ReactNode
}

const NewInspectionPageLayout = observer((props: INewInspectionPageLayout) => {
    return (
        <div className={style.NewInspectionPageLayout}>
            {props.navPanel}
            {props.content}
        </div>
    );
});

export default NewInspectionPageLayout;