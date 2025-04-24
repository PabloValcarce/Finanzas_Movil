import { Dimensions, StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../../styles/colors'; // Asegúrate de tener un archivo de colores

const { width } = Dimensions.get('screen');

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      margin: -9
    },
    cardBackground: {
      height: 300,
      width: 300,
      margin: 10,
      borderRadius: 20,
      padding: 30,
      marginBottom: 20,
    },
    seasonIcon: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    seasonIcon: {
      marginRight: 10,
    },
    cardLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    summary: {
      marginVertical: 10,
    },
    cardValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    amount: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
    },
    cardCategory: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    subscriptionsContainer: {
      marginTop: 15,
      padding: 10,
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
    },
    subscriptionsTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 5,
    },
    cardSubscriptions: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });
};
