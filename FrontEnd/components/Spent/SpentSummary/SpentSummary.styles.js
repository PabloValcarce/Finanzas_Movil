import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors'; 

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; 

  return StyleSheet.create({
    container: {
      marginTop: 10,
      padding: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text, 
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      color: colors.text, 
    },
  });
};
