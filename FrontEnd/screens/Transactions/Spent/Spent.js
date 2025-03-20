import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useAuth from '../../../utils/useAuth';
import SpentLogic from './SpentLogic';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import SpentSummary from '../../../components/Spent/SpentSummary/SpentSummary';
import SpentResults from '../../../components/Spent/SpentResults/SpentResults';
import SpentBarChart from '../../../components/Graphs/Spent/Barchart/Barchart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import styles from './Spent.styles'; // Usamos los estilos del archivo styles.js

function SpentPage() {
  useAuth();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  const { filteredTransactions } = SpentLogic(dateRange); // Usamos el hook con la lógica

  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  return (
    <ScrollView >
      <NavBarTransaction />
      <View style={styles.spentPageContent}>
        <View style={styles.dateFilter}>
          <View style={styles.headDatePicker}>
            <Text style={styles.label}>Filtro entre fechas:</Text>
          </View>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
          />
        </View>
        <View style={styles.spentData}>
          <SpentSummary transactions={filteredTransactions} />

          <ScrollView
            contentContainerStyle={styles.spentGraphs}
            horizontal={true}  // Esto permitirá desplazamiento horizontal si el gráfico es ancho
            showsHorizontalScrollIndicator={false}  // Si no quieres mostrar la barra de desplazamiento
          >
            <SpentBarChart transactions={filteredTransactions} />
          </ScrollView>

          <ScrollView
            contentContainerStyle={styles.spentList}
            horizontal={true}  // Esto permitirá desplazamiento horizontal si el gráfico es ancho
            showsHorizontalScrollIndicator={false}  // Si no quieres mostrar la barra de desplazamiento
          >
            <SpentResults expenses={filteredTransactions} />
          </ScrollView>
        </View>
      </View>
    </ScrollView >
  );
}

export default SpentPage;
