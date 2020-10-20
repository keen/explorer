import i18n from 'i18next';

import enUS from './translations/en-us.json';

const resources = {
  en: enUS,
};

i18n.init({
  resources,
  lng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
