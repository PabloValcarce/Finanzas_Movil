import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';  // Asegúrate de que los colores estén exportados correctamente

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
      backgroundColor: colors.white,
      borderRadius: 10,
      gap: 50,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.primary, // Aplica el color de texto según el tema
    },
    itemText: {
      fontSize: 15,
      color: colors.text2, // Aplica color de texto según el tema
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
  });
};
