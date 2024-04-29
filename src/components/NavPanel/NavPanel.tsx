import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface INavPanel {
    
}

const NavPanel = observer((props: INavPanel) => {
    return (
        <div className={style.NavPanel}>
            
        </div>
    );
});

export default NavPanel;