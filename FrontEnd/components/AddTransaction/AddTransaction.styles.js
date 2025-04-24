// AddTransaction.styles.js
import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    add: {
      backgroundColor: colors.background,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 40,
    },
    title: {
      color: colors.secondary,
      fontWeight: 'bold',
      fontSize: 20,
      alignSelf: 'center',
    },
    subtitle: {
      color: colors.secondary,
      fontSize: 16,
    },
    successMessage: {
      color: colors.button,
      textAlign: 'center',
      marginVertical: 10,
    },
    select: {
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: 10,
    },
    checkboxContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 15,
      borderRadius: 8,
    },
    checkboxLabel: {
      fontSize: 16,
      color: colors.secondary,
    },
  });
};
