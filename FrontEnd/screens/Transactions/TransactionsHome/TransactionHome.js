import React, { useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import useTransactionHomeLogic from './TransactionHomeLogic';
import styles from './TransactionHome.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';

function TransactionHome() {
  const { loading, totalSubscriptionExpense } = useTransactionHomeLogic();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <NavBarTransaction />
      <View style={styles.transactionsPage}>
        <View style={styles.suscriptionsContainer}>
          <Text>Gasto suscripciones mensuales</Text>
          <Text>${totalSubscriptionExpense}</Text>
        </View>

      </View>
    </ScrollView>
  );
}

export default TransactionHome;
