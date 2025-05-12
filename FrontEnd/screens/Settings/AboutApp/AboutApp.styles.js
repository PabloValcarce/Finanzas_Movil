import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors'; 

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors; 

  return StyleSheet.create({
    AboutAppPage: {
      flex: 1,
      backgroundColor: colors.four, 
    },

    AboutAppPageContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 20,
      padding: 20,
      marginTop: 90,
      marginBottom: 90,
      backgroundColor: colors.tertiary, 
      borderRadius: 10,
      gap: 50,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text, 
    },

    itemText: {
      fontSize: 15,
      color: colors.text, 
    },

    logoContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },

    logoImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },

    linkText: {
      color: '#1e90ff', 
    },

    sectionContent: {
      marginBottom: 20,
    },

    linkContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
