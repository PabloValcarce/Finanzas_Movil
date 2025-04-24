import React from 'react';
import { View, Text } from 'react-native';
import SpentSummaryLogic from './SpentSummaryLogic';
import { useTheme } from '../../../context/ThemeContext';  // Asegúrate de tener un contexto para el tema
import styles from './SpentSummary.styles'; // Usamos los estilos adaptados al tema

const SpentSummary = ({ transactions }) => {
  const totalSpent = SpentSummaryLogic(transactions);
  const { isDark } = useTheme(); // Obtenemos el estado de isDark desde el contexto del tema
  const dynamicStyles = styles(isDark); // Pasamos el isDark a los estilos

  if (transactions.length === 0) {
    return <Text>No hay transacciones disponibles.</Text>;
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Total gastado</Text>
      <Text style={dynamicStyles.text}>Tus gastos totales: {totalSpent}€</Text>
    </View>
  );
};

export default SpentSummary;
