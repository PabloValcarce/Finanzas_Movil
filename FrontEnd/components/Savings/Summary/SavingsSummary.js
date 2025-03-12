import React from 'react';
import { SavingsSummaryLogic } from './SavingsSummaryLogic';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './SavingsSummary.styles';

function SavingsSummary({ transactions }) {
    const {
        totalEarn,
        totalSpent,
        totalSavings,
        }
        = SavingsSummaryLogic(transactions);    
        
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen Financiero</Text>
            {/* Dinero Ingresado */}
            <View style={[styles.card, { backgroundColor: '#d0eaff' }]}>
                <FontAwesome5 name="arrow-down" size={24} color="white" />
                <Text style={styles.label}>Dinero ingresado</Text>
                <Text style={styles.value}>${totalEarn}</Text>
            </View>
            {/* Dinero Gastado */}
            <View style={[styles.card, { backgroundColor: '#f0c8a5' }]}>
                <FontAwesome5 name="arrow-up" size={24} color="white" />
                <Text style={styles.label}>Dinero gastado</Text>
                <Text style={styles.value}>${totalSpent}</Text>
            </View>
            <View style={[
                styles.card,
                { backgroundColor: totalSavings < 0 ? '#f0c8a5' : '#d0eaff' }
            ]}>
                <FontAwesome5
                    name={totalSavings < 0 ? "exclamation-circle" : "check-circle"}
                    size={24}
                    color="white"
                />
                <Text style={styles.label}>Dinero ahorrado</Text>
                <Text style={styles.value}>${totalSavings}</Text>
            </View>
        </View>
    );
}

export default SavingsSummary;
