import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import useTransactionHomeLogic from './TransactionHomeLogic';
import styles from './TransactionHome.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

function TransactionHome() {
  const {
    loading,
    recentTransactions,
    totalSubscriptionExpense,
  } = useTransactionHomeLogic();

  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark);
  const { t } = useTranslation();

  if (loading) {
    return (
      <View style={dynamicStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={dynamicStyles.container}>
      <NavBarTransaction />
      <View style={dynamicStyles.transactionsPageContent}>
        <View style={dynamicStyles.transactionsPageData}>
          <View style={dynamicStyles.savingsData}>
            <SavingsSummary recentTransactions={recentTransactions} subscriptions={totalSubscriptionExpense} />
            {/* <SavingsLineChart transactions={recentTransactions} /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default TransactionHome;
