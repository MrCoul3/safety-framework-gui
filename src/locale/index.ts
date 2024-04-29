import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ru } from "./ru";
import { language } from "../constants/config";

const resources = {
  ru: {
    ...ru,
  },
  en: {
    ...en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
