import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useAuth from '../../../utils/useAuth';
import SpentLogic from './SpentLogic';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import SpentSummary from '../../../components/Spent/SpentSummary/SpentSummary';
import SpentResults from '../../../components/Spent/SpentResults/SpentResults';
import SpentBarChart from '../../../components/Graphs/Spent/Barchart/Barchart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import { useTheme } from '../../../context/ThemeContext'; 
import styles from './Spent.styles'; // Estilos dinámicos
import { ActivityIndicator } from 'react-native';

function SpentPage() {
  useAuth();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark);
  const { filteredTransactions, loading } = SpentLogic(dateRange); // Usamos la lógica con el hook

  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  if (loading) {
    return (
      <View style={dynamicStyles.spentPageContent}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={dynamicStyles.spentPage}>
      <NavBarTransaction />
      <View style={dynamicStyles.spentPageContent}>
        <View style={dynamicStyles.dateFilter}>
          <View style={dynamicStyles.headDatePicker}>
            <Text style={dynamicStyles.label}>Filtro entre fechas:</Text>
          </View>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
          />
        </View>
        <View style={dynamicStyles.spentData}>
          <SpentSummary transactions={filteredTransactions} />

          <ScrollView
            contentContainerStyle={dynamicStyles.spentGraphs}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <SpentBarChart transactions={filteredTransactions} />
          </ScrollView>

          <ScrollView
            contentContainerStyle={dynamicStyles.spentList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <SpentResults expenses={filteredTransactions} />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default SpentPage;
