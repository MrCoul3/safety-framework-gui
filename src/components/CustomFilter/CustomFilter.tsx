import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';
import {Combobox} from "@consta/uikit/Combobox";

interface ICustomFilter {
    
}
type Item = {
    label: string;
    id: number;
};


const items: Item[] = [
    {
        label: "Первый",
        id: 1,
    },
    {
        label: "Второй",
        id: 2,
    },
    {
        label: "Третий",
        id: 3,
    },
];

const CustomFilter = observer((props: ICustomFilter) => {
    console.log('CustomFilter')
    const onChange = () => {};

    return (
        <div className={style.CustomFilter}>
            <Combobox items={items} onChange={onChange} />

        </div>
    );
});

export default CustomFilter;