import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';
import {IViolation} from "../../interfaces/IViolation";
import {Card} from "@consta/uikit/Card";

interface IViolationDetails {
        violation?: IViolation
}

const ViolationDetails = observer((props: IViolationDetails) => {
    const title = props.violation?.question;

    const code = title?.split(" ")[0];

    const name = title?.replace(code ?? "", "");

    return (
        <div className={style.ViolationDetails}>
            <Card className={style.card}>
                <div className={style.title}>
                    <span className={style.code}>{code}</span>
                    <span className={style.name}>{name}</span>
                </div>

            </Card>
        </div>
    );
});

export default ViolationDetails;