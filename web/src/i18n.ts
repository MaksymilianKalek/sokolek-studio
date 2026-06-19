import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslation from './locales/en/translation.json'
import plTranslation from './locales/pl/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pl: { translation: plTranslation },
    },
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
    },
  })

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

export default i18n
