import React from 'react';
import { View, Text } from 'react-native';
import SpentSummaryLogic from './SpentSummaryLogic';
import styles from './SpentSummary.styles';

const SpentSummary = ({ transactions }) => {
  const totalSpent = SpentSummaryLogic(transactions);

  if (transactions.length === 0) {
    return <Text>No hay transacciones disponibles.</Text>;
  }

  return (
    <View >
      <Text style={styles.title}>Total gastado</Text>
      <Text style={styles.text}>Tus gastos totales: {totalSpent}€</Text>
    </View>
  );
};

export default SpentSummary;
