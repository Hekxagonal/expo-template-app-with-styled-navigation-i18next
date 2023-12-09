import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import "moment/locale/pt";
import moment from "moment";

//import languageDetector from "./languageDetector";

export const RESOURCES = {
  en: require("./langs/en.json"),
  pt: require("./langs/pt.json")
};

const resources = Object.fromEntries(
  Object.entries(RESOURCES).map(([lang, translation]) => {
    return [lang, { translation }];
  })
);

(async () => {
  const lang = await AsyncStorage.getItem("Language");
  moment.locale(lang || "pt");
  i18n
    .use(Backend)
    //.use(languageDetector)
    .use(initReactI18next)
    .init({
      lng: lang || "pt",
      fallbackLng: lang || "pt",
      compatibilityJSON: "v3",
      debug: false,
      resources,
      interpolation: {
        escapeValue: false
      }
    });
})();

export default i18n;
