import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Idiomas
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
};

const getInitialLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('user-language');
  const systemLang = Localization.locales?.[0]?.languageCode || 'es';
  return savedLang || (resources[systemLang] ? systemLang : 'es');
};

// ⚠️ ¡Inicialización dentro de una función async!
const initI18n = async () => {
  const language = await getInitialLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'es',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
    });
};

initI18n(); // Llama a la inicialización

export default i18n;
