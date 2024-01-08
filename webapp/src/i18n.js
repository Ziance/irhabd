// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';

const resources = {
  en: { translation: translationEN },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language
  keySeparator: false, // use "." to access nested keys
  interpolation: {
    escapeValue: false, // not needed for React
  },
});

export default i18n;
