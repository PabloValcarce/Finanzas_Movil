// AuthForm.styles.js
import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../styles/colors';

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    authForm: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.loginBackground,
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: colors.borderColor,
      textAlign: 'center',
      marginBottom: 20,
    },
    form: {
      width: '100%',
    },
    input: {
      height: 45,
      marginBottom: 10,
      width: 250,
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
      borderWidth: 1,
      backgroundColor: colors.secondary,
      color: colors.text,
    },
    errorInput: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    switchButton: {
      marginTop: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.loginSwitchButton,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    switchButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    submitButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.loginSubmitButton,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    biometricButton: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '30%',
      marginTop: 15,
      padding: 10,
    },
    finger:{
      fontSize: 40,
      color: colors.borderColor,
    }
  });
};
