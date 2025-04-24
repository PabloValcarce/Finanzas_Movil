import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    savingsPage: {
      flex: 1,
      backgroundColor: colors.background,  // Fondo dependiendo del modo
    },
    savingsPageContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 30,
      backgroundColor: colors.background,  // Fondo dependiendo del modo
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 20,
      color: colors.text2,  // Color de texto dependiendo del modo
    },
    dateFilter: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 100,
      zIndex: 10,
    },
    savingsData: {
      backgroundColor: colors.cardBackground,  // Color de fondo de los componentes
      borderRadius: 10,
      marginTop: 30,
      marginBottom: 10,
    },
    savingsGraphs: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 100,
      marginTop: 40,
    },
    savingsLineChart: {
      // Si necesitas personalizar aún más
    },
    savingsCircularChart: {
      alignItems: 'center',
    },
  });
};
