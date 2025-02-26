import React from 'react';
import { View, Text } from 'react-native';
import { SavingsSummaryLogic } from './SavingsSummaryLogic';
import styles from './SavingsSummary.styles';

function SavingsSummary({ transactions }) {
    const totalSavings = SavingsSummaryLogic (transactions);

    if (transactions.length === 0) {
        return <Text>No transactions available.</Text>;
    }

    return (
        <View>
            <Text style={styles.savingSummaryTitle}>Total ahorrado</Text>
            <Text style={styles.savingSummaryText}>Tu dinero ahorrado: ${totalSavings.toFixed(2)}</Text>
        </View>
    );
}

export default SavingsSummary;
