import React, {ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface ILayout {
    navPanel: ReactNode
    content: ReactNode
}

const Layout = observer((props: ILayout) => {
    return (
        <div className={style.NewInspectionPageLayout}>
            {props.navPanel}
            {props.content}
        </div>
    );
});

export default Layout;