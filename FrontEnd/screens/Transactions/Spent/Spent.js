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
    <View style={styles.spentPage}>
      <NavBarTransaction />
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
      <ScrollView vertical contentContainerStyle={styles.spentData}>
        <SpentSummary transactions={filteredTransactions} />
        <View style={styles.spentGraphs}>
          <SpentBarChart transactions={filteredTransactions} />
        </View>
        <View style={styles.spentList}>
          <SpentResults expenses={filteredTransactions} />
        </View>
      </ScrollView>
    </View >
  );
}

export default SpentPage;
