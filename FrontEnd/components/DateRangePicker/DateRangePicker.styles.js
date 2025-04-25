// DateRangePicker.styles.js
import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors'; // Colores para temas claros y oscuros

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    datePickerContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      zIndex: 10,
      marginRight: 30,
      alignItems: 'center',
    },
    datePicker: {
      flex: 1,
      padding: 8,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.borderColor,
      backgroundColor: colors.tertiary,
      height: 30,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 14,
    },
    dateText: {
      color: colors.text2,
    },
    resetButton: {
      padding: 5,
      marginLeft: 10,
      backgroundColor: colors.buttonBackground,
      borderRadius: 5,
      borderColor: colors.borderColor,
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
