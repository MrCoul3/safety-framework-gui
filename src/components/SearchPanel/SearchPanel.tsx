import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';

interface ISearchPanel {
    
}

const SearchPanel = observer((props: ISearchPanel) => {
    return (
        <div className={style.SearchPanel}>
            
        </div>
    );
});

export default SearchPanel;