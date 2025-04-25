import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors'; // Importa los colores de tus temas

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; // Usamos el tema correspondiente

  return StyleSheet.create({
    container: {
      marginTop: 10,
      padding: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary, // Título con color primario según el tema
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      color: colors.secondary, // Color de texto dependiendo del tema
    },
  });
};
