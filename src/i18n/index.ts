import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import en from "./en.json";
import nl from "./nl.json";
import fr from "./fr.json";

const supportedLngs = ["en", "nl", "fr"];
const locale = getLocales()[0]?.languageCode ?? "en";
const lng = supportedLngs.includes(locale) ? locale : "en";

i18n.use(initReactI18next).init({
  lng: lng,
  fallbackLng: "en",
  supportedLngs,
  compatibilityJSON: "v4",
  resources: {
    en: { translation: en },
    nl: { translation: nl },
    fr: { translation: fr },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
