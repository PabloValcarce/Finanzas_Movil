import React, { useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import { useTransactions } from '../../../context/TransactionContext'; 
import styles from './TransactionHome.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';

function TransactionHome() {
    const {loading} = useTransactions(); 

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
                
            </View>
        </ScrollView>
    );
}

export default TransactionHome;
