import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import styles from './TransactionsResults.styles'; // Estilos importados desde el archivo externo

const TransactionsResults = ({ transactions }) => {

  const renderItem = ({ item }) => {
    const rowClass = item.amount < 0 ? styles.negative : styles.positive;

    return (
      <View style={[styles.row, rowClass]}>
        <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.cell}>{item.description}</Text>
        <Text style={styles.cell}>{item.categoria}</Text>
        <Text style={styles.cell}>{item.amount.toFixed(2)} €</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transacciones</Text>
      {transactions.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={styles.tableWrapper}>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={styles.header}>Fecha</Text>
              <Text style={styles.header}>Descripción</Text>
              <Text style={styles.header}>Categoría</Text>
              <Text style={styles.header}>Gasto</Text>
            </View>
            <FlatList
              data={transactions}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
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

export default TransactionsResults;
