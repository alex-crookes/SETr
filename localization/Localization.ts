import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import xx from "./xx.json";

export const deviceLocale = getLocales()[0]?.languageCode ?? "xx";

const translations = { en, xx };

const copy = new I18n(translations);
copy.defaultLocale = "xx";
copy.locale = deviceLocale;
copy.enableFallback = true;

export function translate(key: string, options: object | null = null): string {
  return copy.t(key, options);
}

export function localizeCurrency(value: number): string {
  return copy.l("currency", value);
}

export function localizeNumber(value: number): string {
  return copy.numberToDelimited(value);
}

export function roundNumber(value: number, places: number): string {
  return copy.numberToRounded(value, {
    precision: places,
    separator: ".",
    delimiter: ",",
  });
}
