import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';  // Asegúrate de tener los colores definidos

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      marginRight: 70,
      color: colors.text2, // Dependiendo del tema, cambia el color del texto
    },
  });
};
