import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import useSpentResultsLogic from "./SpentResultsLogic"; // Lógica
import styles from "./SpentResults.styles"; 

const SpentResults = ({ expenses }) => {
  const formattedExpenses = useSpentResultsLogic(expenses);

  if (expenses.length === 0) {
    return (
      <View style={styles.noExpensesContainer}>
        <Text style={styles.noExpensesText}>
          No hay gastos disponibles en este rango de fechas.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de gastos</Text>
      {expenses.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={styles.tableWrapper}>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.header}>Fecha</Text>
              <Text style={styles.header}>Descripción</Text>
              <Text style={styles.header}>Categoría</Text>
              <Text style={styles.header}>Gasto</Text>
            </View>
            <FlatList
              data={formattedExpenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const backgroundColor =  "#E0E0E0";

                return (
                  <View style={[styles.row, { backgroundColor }]}>
                    <Text style={styles.cell}>{item.formattedDate}</Text>
                    <Text style={styles.cell}>{item.description}</Text>
                    <Text style={styles.cell}>{item.categoria}</Text>
                    <Text style={styles.cell}>{item.formattedAmount} €</Text>
                  </View>
                );
              }}
              contentContainerStyle={styles.table}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.noExpenses}>
          No hay transacciones disponibles en este rango de fechas.
        </Text>
      )}
    </View>
  );
};

export default SpentResults;
