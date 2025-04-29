import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';  // Colores actualizados

const { width, height } = Dimensions.get('window'); // Obtiene el tamaño de la pantalla

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; // Selecciona los colores según el tema

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: colors.secondary, // Aplica el color de fondo dependiendo del tema
    },

    dashboardContainer: {
      width: width * 0.8,
      height: height * 0.85,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.loginBackground, // Aplica el color de fondo para el contenedor del dashboard
    },

    text: {
      fontSize: 20,
      color: colors.text, // Aplica color de texto según el tema
    },
  });
};
