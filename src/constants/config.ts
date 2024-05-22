import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
export const localeMap = {
  en: enLocale,
  ru: ruLocale,
};

export const language = window.navigator.language.split("-")[0];

export const nodeEnv = process.env.NODE_ENV;

export const isDevelop = nodeEnv === 'development';

export const DEVELOPMENT_DOMAIN = "";

export const [, upperLevelDomain] = window.location.hostname.split(".");

console.log('upperLevelDomain', upperLevelDomain)

export const UPPER_LEVEL_DOMAIN =
  nodeEnv === "development" ? DEVELOPMENT_DOMAIN : upperLevelDomain;

export const LOCAL_STORE_INSPECTIONS = "localInspections";

export const INSPECTIONS_ON_PAGE = 40;
