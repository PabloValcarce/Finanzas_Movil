import { StyleSheet, Switch } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';  // Asegúrate de tener los colores definidos

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      color: colors.text, 
    },
    Switch: {
      zIndex: 1,
    },
  });
};
