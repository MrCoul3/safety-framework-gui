import React from 'react';
import {observer} from "mobx-react-lite";
import style from './style.module.css';
import {Button} from "@consta/uikit/Button";
import { IconAdd } from "@consta/icons/IconAdd";
import {useTranslation} from "react-i18next";

interface IAddBarrierButton {
    onClick(): void
}

const AddBarrierButton = observer((props: IAddBarrierButton) => {
    const { t } = useTranslation("dict");

    return (
        <div className={style.AddBarrierButton}>
            <Button
                iconRight={IconAdd}
                onClick={props.onClick}
                label={t("addBarrier")}
            />
        </div>
    );
});

export default AddBarrierButton;