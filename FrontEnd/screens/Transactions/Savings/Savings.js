import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { SavingsLogic } from './SavingsLogic';
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import styles from './Savings.styles';
import SavingsCards from '../../../components/Savings/Cards/SavingsCards';

function Savings() {
  const { dateRange, setDateRange, filteredTransactions, handleResetDates, transactions, monthlySummary, loading } = SavingsLogic();

  // Mostrar ActivityIndicator mientras loading es verdadero
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.savingsPage}>
      <NavBarTransaction />
      <View style={styles.savingsPageContent}>
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
        <View style={styles.savingsData}>
          <SavingsSummary transactions={filteredTransactions} />
          <View style={styles.savingsGraphs}>
            <View style={styles.savingsCircularChart}>
              <SavingsCircularChart transactions={transactions} />
            </View>
          </View>
        </View>
      </View>
      <SavingsCards monthlySavings={monthlySummary} />
    </ScrollView>
  );
}

export default Savings;
