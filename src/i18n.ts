import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

import { TranslationsSettings } from './types';

const createI18n = (translationSettings: TranslationsSettings) => {
  const backendOptions = translationSettings?.backend || {};

  return i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      backend: backendOptions,
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

export default createI18n;
