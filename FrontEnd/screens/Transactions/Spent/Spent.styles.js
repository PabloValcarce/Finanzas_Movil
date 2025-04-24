import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    spentPage: {
      flex: 1,
      backgroundColor: colors.background, // Fondo dependiendo del modo
    },
    spentPageContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 30,
      backgroundColor: colors.background, // Fondo dependiendo del modo
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 20,
      color: colors.text, // Color de texto dependiendo del modo
    },
    dateFilter: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 100,
      marginBottom: 30,
      zIndex: 10,
    },
    spentData: {
      backgroundColor: colors.cardBackground, // Fondo de la tarjeta dependiendo del modo
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    spentGraphs: {
      marginTop: 20,
    },
    spentList: {
      backgroundColor: colors.cardBackground, // Fondo de la lista dependiendo del modo
      marginTop: 30,
      marginBottom: 40,
      borderRadius: 10,
    },
  });
};
