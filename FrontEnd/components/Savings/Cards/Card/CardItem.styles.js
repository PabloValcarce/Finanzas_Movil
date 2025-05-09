import { Dimensions, StyleSheet } from 'react-native';
import { lightColors, darkColors } from '../../../../styles/colors';

const { width } = Dimensions.get('screen');

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  const styles = StyleSheet.create({
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
     
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    cardLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    summary: {
      marginVertical: 10,
    },
    summaryContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    cardValue: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginRight: 50,
    },
    amount: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    cardCategory: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 10,
    },
    cardCategoryText: {
      fontSize: 16,
      color: colors.text,
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
      color: colors.text,
    },
  });

  return {
    styles,
    colors,
  };
};
