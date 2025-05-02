import React, {useMemo} from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { SavingsLogic } from './SavingsLogic';
import { useTheme } from '../../../context/ThemeContext'; 
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import styles from './Savings.styles';
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import SavingsCards from '../../../components/Savings/Cards/SavingsCards';
import { useTranslation } from 'react-i18next';

function Savings() {
  const { dateRange, setDateRange, filteredTransactions, handleResetDates, transactions, monthlySummary, loading } = SavingsLogic();
  const { isDark } = useTheme();  
  const dynamicStyles = useMemo(() => styles(isDark), [isDark]);
  const { t } = useTranslation();

  if (loading) {
    return (
      <View style={dynamicStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView style={dynamicStyles.savingsPage}>
      <NavBarTransaction />
      <View style={dynamicStyles.savingsPageContent}>
        <View style={dynamicStyles.dateFilter}>
          <View style={dynamicStyles.headDatePicker}>
            <Text style={dynamicStyles.label}>{t('Savings.fechas')}</Text>
          </View>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
          />
        </View>
        <View style={dynamicStyles.savingsData}>
          <SavingsSummary transactions={filteredTransactions} />
          <View style={dynamicStyles.savingsGraphs}>
            <View style={dynamicStyles.savingsCircularChart}>
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
