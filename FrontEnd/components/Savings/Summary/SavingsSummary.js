import React from 'react';
import { SavingsSummaryLogic } from './SavingsSummaryLogic';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './SavingsSummary.styles';
import { useTheme } from '../../../context/ThemeContext';

function SavingsSummary({ transactions }) {
    const {
        totalEarn,
        totalSpent,
        totalSavings,
        }
        = SavingsSummaryLogic(transactions);    
    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);
        
    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Resumen Financiero</Text>
            {/* Dinero Ingresado */}
            <View style={[dynamicStyles.card, dynamicStyles.cardPositive]}>
                <FontAwesome5 name="arrow-down" size={24} color="white" />
                <Text style={dynamicStyles.label}>Dinero ingresado</Text>
                <Text style={dynamicStyles.value}>${totalEarn}</Text>
            </View>
            {/* Dinero Gastado */}
            <View style={[dynamicStyles.card, dynamicStyles.cardNegative]}>
                <FontAwesome5 name="arrow-up" size={24} color="white" />
                <Text style={dynamicStyles.label}>Dinero gastado</Text>
                <Text style={dynamicStyles.value}>${totalSpent}</Text>
            </View>
            <View style={[
                dynamicStyles.card,
                totalSavings < 0 ? dynamicStyles.cardNegative : dynamicStyles.cardPositive
            ]}>
                <FontAwesome5
                    name={totalSavings < 0 ? "exclamation-circle" : "check-circle"}
                    size={24}
                    color="white"
                />
                <Text style={dynamicStyles.label}>Dinero ahorrado</Text>
                <Text style={dynamicStyles.value}>${totalSavings}</Text>
            </View>
        </View>
    );
}

export default SavingsSummary;
