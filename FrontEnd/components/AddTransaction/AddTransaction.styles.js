// AddTransaction.styles.js
import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },

    modalContent: {
      width: '90%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
    DialogMessagetitle:{
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
      marginBottom: 10,
    },
    DialogMessageContent:{
      maxHeight: 100,
      marginVertical: 20,
    },
    warningText: { 
      marginVertical: 20,
    }

  });
};
