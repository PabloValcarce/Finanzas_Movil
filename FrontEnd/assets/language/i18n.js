import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa todos los archivos de idioma que tengas
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json'; // Si tienes un archivo de idioma en alemán 

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de }, 
};

// Función para cargar el idioma guardado o usar el del sistema
const getInitialLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('user-language');
  const systemLang = Localization.locale.slice(0, 2);
  return savedLang || (resources[systemLang] ? systemLang : 'en');
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    },
    lng: 'en', // Se sobrescribirá más abajo
  });

// Sobrescribe el idioma inicial después de cargar AsyncStorage
getInitialLanguage().then(lang => {
  i18n.changeLanguage(lang);
});

export default i18n;
