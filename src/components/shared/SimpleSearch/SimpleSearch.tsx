import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "./style.module.css";
import { useTranslation } from 'react-i18next';

const KEY_CODE_ESC = 27;
interface ISimpleSearch {
    handleInput(str: string): void;
    handleClearSearchValue(): void;
    value: string | null;
    placeholder?: string;
}
const SimpleSearch = (props: ISimpleSearch) => {
    const { t } = useTranslation("dict");

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.handleInput(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === KEY_CODE_ESC) {
            props.handleClearSearchValue();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className={style.simpleSearch}>
            <div className={style.searchIcon}>
                <SearchIcon fontSize={"small"} color={"action"} />
            </div>
            <Input
                placeholder={t(props.placeholder ?? "searchPlaceholder")}
                autoFocus
                value={props.value ?? ""}
                onInput={onInput}
                classes={{ root: style.root }}
                className={style.input}
            />
            {props.value && (
                <div className={style.closeIcon}>
                    <IconButton onClick={props.handleClearSearchValue} size={"small"}>
                        <CloseIcon fontSize={"small"} color={"action"} />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default SimpleSearch;
