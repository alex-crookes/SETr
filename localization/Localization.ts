import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import xx from "./xx.json";

export const deviceLocale = getLocales()[0].languageCode ?? "xx";

const translations = { en, xx };

export const copy = new I18n(translations);
copy.defaultLocale = "xx";
copy.locale = deviceLocale;
copy.enableFallback = true;

