import { StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    savingsPage: {
      flex: 1,
    },
    savingsPageContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 30,
      marginTop: 50,
      backgroundColor: colors.tertiary,  // Fondo dependiendo del modo
    },
    savingsData: {
      backgroundColor: colors.four,  // Color de fondo de los componentes
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
    savingsCards:{
      marginTop: -20,
    },
    savingsLineChart: {
      // Si necesitas personalizar aún más
    },
    savingsCircularChart: {
      alignItems: 'center',
    },
  });
};
