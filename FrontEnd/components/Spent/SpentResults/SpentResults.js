import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import useSpentResultsLogic from "./SpentResultsLogic"; // Lógica
import { useTheme } from '../../../context/ThemeContext'; // Llamamos al contexto del tema
import styles from "./SpentResults.styles"; 

const SpentResults = ({ expenses }) => {
  const { isDark } = useTheme(); // Obtenemos el valor de isDark desde el contexto
  const formattedExpenses = useSpentResultsLogic(expenses);
  const dynamicStyles = styles(isDark); // Pasamos el isDark a los estilos

  if (expenses.length === 0) {
    return (
      <View style={dynamicStyles.noExpensesContainer}>
        <Text style={dynamicStyles.noExpensesText}>
          No hay gastos disponibles en este rango de fechas.
        </Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Detalle de gastos</Text>
      {expenses.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={dynamicStyles.tableWrapper}>
          <View style={dynamicStyles.table}>
            <View style={dynamicStyles.headerRow}>
              <Text style={dynamicStyles.header}>Fecha</Text>
              <Text style={dynamicStyles.header}>Descripción</Text>
              <Text style={dynamicStyles.header}>Categoría</Text>
              <Text style={dynamicStyles.header}>Gasto</Text>
            </View>
            <FlatList
              data={formattedExpenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                // Determinar el color de fondo dependiendo del índice (par o impar)
                const backgroundColor = index % 2 === 0 ? dynamicStyles.evenRow : dynamicStyles.oddRow;

                return (
                  <View style={[dynamicStyles.row,  backgroundColor ]}>
                    <Text style={dynamicStyles.cell}>{item.formattedDate}</Text>
                    <Text style={dynamicStyles.cell}>{item.description}</Text>
                    <Text style={dynamicStyles.cell}>{item.categoria}</Text>
                    <Text style={dynamicStyles.cell}>{item.formattedAmount} €</Text>
                  </View>
                );
              }}
              contentContainerStyle={dynamicStyles.table}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={dynamicStyles.noExpenses}>
          No hay transacciones disponibles en este rango de fechas.
        </Text>
      )}
    </View>
  );
};

export default SpentResults;
