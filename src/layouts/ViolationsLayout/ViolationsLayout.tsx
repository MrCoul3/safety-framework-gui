import React, {ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IViolationsLayout {
    navPanel: ReactNode
    filterPanel: ReactNode

    content: ReactNode
}

const ViolationsLayout = observer((props: IViolationsLayout) => {
    return (
        <div className={style.ViolationsLayout}>
            {props.navPanel}
            <div className={style.flexRow}>
                {props.filterPanel}
                {props.content}
            </div>

        </div>
    );
});

export default ViolationsLayout;