import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';  // Asegúrate de que los colores estén exportados correctamente

const { width, height } = Dimensions.get('window'); // Obtiene el tamaño de la pantalla

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; // Selecciona los colores según el tema

  return StyleSheet.create({
    SettingsPage: {
      flex: 1,
      backgroundColor: colors.four, // Aplica el color de fondo dependiendo del tema
    },

    SettingsPageContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 20,
      padding: 20,
      marginTop: 70,
      backgroundColor: colors.tertiary,
      borderRadius: 10,
      gap: 50,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text, // Aplica el color de texto según el tema
    },
    informationContent:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 20,

    },
    itemText: {
      fontSize: 15,
      color: colors.text, // Aplica color de texto según el tema
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    languageSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    languageText: {
      fontSize: 15,
      color: colors.text,
    },
    languageTouchable: {
      zIndex: 1,
      marginRight: 12,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
      margin: 20,
      backgroundColor: colors.tertiary,
      borderRadius: 10,
      padding: 20
    },
    itemFlag: {
      fontSize: 24,
    },
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.four,
     
      padding: 12,
      marginVertical: 6,
      borderRadius: 10,
      justifyContent: 'flex-start'
    },
    flagEmoji: {
      fontSize: 28,
      marginRight: 10
    },
    languageLabel: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
    },
  });
};
