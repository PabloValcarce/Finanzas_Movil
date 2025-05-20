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
      borderWidth: 1.5,
      borderColor: colors.text,
      backgroundColor: colors.tertiary,
      height: 30,
      paddingLeft: 20,
      paddingRight: 20,
    },
    dateText: {
      color: colors.text,
      fontSize:16
    },
    resetButton: {
      padding: 5,
      marginLeft: 10,
      borderRadius: 5,
      borderColor: colors.text,
      borderWidth: 1.5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    resetButtonIcon:{
      color: colors.text,
    }
  });
};
