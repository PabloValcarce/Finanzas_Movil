import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors'; // Importa los colores de tus temas

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; // Usamos el tema correspondiente

  return StyleSheet.create({
    container: {
      marginTop: 20,
      padding: 15,
      backgroundColor: colors.background3, // Fondo adaptado según el tema
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary, // Título con color primario según el tema
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      color: colors.text2, // Color de texto dependiendo del tema
    },
  });
};
