import { StyleSheet } from "react-native";
import { lightColors, darkColors } from "../../../styles/colors"; // Importa los colores de tus temas

export default (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: colors.tableBackground, 
      borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text, 
      textAlign: "center",
      marginBottom: 10,
    },
    tableWrapper: {
      width: "100%",
      justifyContent: "center",
    },
    table: {
      minWidth: 300,
    },
    headerRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.text, // Línea de borde según el tema
    },
    header: {
      flex: 1,
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: colors.tableBorder,
      color: colors.text, 
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.tertiary, // Borde de fila
      paddingVertical: 10,
    },
    cell: {
      flex: 1,
      textAlign: "center",
      padding: 4,
      width: 88,
      color: colors.text, 
    },
    evenRow: {
      backgroundColor: colors.rowEven, // Color de fila par
    },
    oddRow: {
      backgroundColor: colors.rowOdd, // Color de fila impar
    },
    noExpenses: {
      textAlign: "center",
      color: colors.secondary, // Color de texto para "no hay gastos"
      fontSize: 16,
      marginTop: 15,
    },
    noExpensesContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
