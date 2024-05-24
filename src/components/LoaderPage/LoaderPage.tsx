import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';
import { Loader } from "@consta/uikit/Loader";

interface ILoader {

}

const LoaderPage = observer((props: ILoader) => {
    return (
        <div className={style.Loader}>
            <Loader size="m" />
        </div>
    );
});

export default LoaderPage;