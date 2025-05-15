import { useMemo } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useSavingsLogic } from './SavingsLogic';
import { useTheme } from '../../../context/ThemeContext';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import styles from './Savings.styles';
import SavingsCards from '../../../components/Savings/Cards/SavingsCards';
import { useTranslation } from 'react-i18next';

function Savings() {
  const {  transactions, monthlySummary, loading } = useSavingsLogic();
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
        <View style={dynamicStyles.savingsData}>
          <View style={dynamicStyles.savingsGraphs}>
            <View style={dynamicStyles.savingsCircularChart}>
              <SavingsCircularChart transactions={transactions} />
            </View>
          </View>
        </View>
      </View>
      <View style={dynamicStyles.savingsCards}>
        <SavingsCards monthlySavings={monthlySummary} />
      </View>
    </ScrollView>
  );
}

export default Savings;
