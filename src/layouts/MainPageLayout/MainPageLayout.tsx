import React, {ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface IMainPageLayout {
    header: ReactNode;
    sideBar: ReactNode;
    contentHeader: ReactNode;
    content: ReactNode;
}

const MainPageLayout = observer((props: IMainPageLayout) => {
    return (
        <div className={style.MainPageLayout}>
            {props.header}
            {props.sideBar}
        </div>
    );
});

export default MainPageLayout;