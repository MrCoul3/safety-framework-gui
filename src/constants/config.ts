import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
import {UtilsFunctions} from "../utils/UtilsFunctions";
export const localeMap = {
    en: enLocale,
    ru: ruLocale,
};

export const language = window.navigator.language.split("-")[0];

export const nodeEnv = process.env.NODE_ENV;

export const DEVELOPMENT_DOMAIN = "";

export const upperLevelDomain = UtilsFunctions.getUpperLevelDomain();

export const UPPER_LEVEL_DOMAIN =
    nodeEnv === "development" ? DEVELOPMENT_DOMAIN : upperLevelDomain;

export const LOCAL_STORE_INSPECTIONS = 'localInspections'


