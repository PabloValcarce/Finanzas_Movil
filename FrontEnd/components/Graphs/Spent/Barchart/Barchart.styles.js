import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../../../styles/colors";

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      padding: 10,
      borderRadius: 10,
    },
    title: {
      textAlign: "center",
      marginBottom: 10,
      color: colors.text,
    },
    loadingIndicator: {
      marginTop: 50,
    },
    noDataText: {
      textAlign: "center",
      margin: 20,
      color: colors.text,
    },
    barColor: {
      backgroundColor: colors.primary,
    },
    strokeColor: {
      borderColor: colors.border,
    },
    textColor: {
      color: colors.text,
    },
    iconRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    iconContainer: {
      position: "absolute",
      bottom: 30,
    },
    iconText: {
      color: colors.text,
      fontSize: 14,
      textAlign: 'left',
      marginBottom: -15
    }
  });
};
