import { Languages } from "./enums";

export function getLanguageFromLocalStorage() {
  return localStorage.getItem("lang") || Languages.Default;
}

export function setLanguageInLocalStorage(lang: string) {
  localStorage.setItem("lang", lang);
}
