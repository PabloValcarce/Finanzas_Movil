import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useTransactions } from './TransactionListLogic';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import AddTransaction from '../../../components/AddTransaction/AddTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import TransactionsResults from '../../../components/TransactionResults/TransactionsResults';
import { styles } from './TransactionList.styles'; // Importar los estilos
import { useCategories } from '../../../context/CategoryContext';

function TransactionsList() {
  const { filteredTransactions, dateRange, setDateRange, handleResetDates, loading } = useTransactions();
  const { userId } = useCategories();


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Indicador de carga
  }
  return (
    <ScrollView >
      <NavBarTransaction />
      <View style={styles.TransactionListContent}>
        <View style={styles.head}>
          <View style={styles.headDatePicker}>
            <Text style={styles.label}>Filtro entre fechas:</Text>
          </View>
          <View style={styles.headFilterAdd}>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateRangeChange={setDateRange}
              onReset={handleResetDates}
            />
            <AddTransaction userId={userId} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.TransactionList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.transactionsResults}>
            <TransactionsResults transactions={filteredTransactions} />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default TransactionsList;
