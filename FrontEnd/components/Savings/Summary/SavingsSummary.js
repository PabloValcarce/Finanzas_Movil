import React, { useEffect } from 'react';
import { SavingsSummaryLogic } from './SavingsSummaryLogic';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './SavingsSummary.styles';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

function SavingsSummary({ transactions ,subscriptions }) {


    console.log(subscriptions);
    
    const {
        totalEarn,
        totalSpent,
        totalBalance,
    }
        = SavingsSummaryLogic(transactions, subscriptions);
        
    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation();

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>{t('Savings.SavingsSummary.title')}</Text>
            {/* Dinero Ingresado */}
            <View style={[dynamicStyles.card, dynamicStyles.cardPositive]}>
                <FontAwesome5 name="arrow-down" size={24} color="white" />
                <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Earn')}</Text>
                <Text style={dynamicStyles.value}>{totalEarn} €</Text>
            </View>
            {/* Dinero Gastado */}
            <View style={[dynamicStyles.card, dynamicStyles.cardNegative]}>
                <FontAwesome5 name="arrow-up" size={24} color="white" />
                <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Spent')}</Text>
                <Text style={dynamicStyles.value}>{totalSpent} €</Text>
            </View>
            {/* Dinero Subscripciones */}
            <View style={[dynamicStyles.card, dynamicStyles.cardNegative]}>
                <FontAwesome5 name="arrow-up" size={24} color="white" />
                <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Spent')}</Text>
                <Text style={dynamicStyles.value}>{subscriptions} €</Text>
            </View>
            <View style={[
                dynamicStyles.card,
                totalBalance < 0 ? dynamicStyles.cardNegative : dynamicStyles.cardPositive
            ]}>
                <FontAwesome5
                    name={totalBalance < 0 ? "exclamation-circle" : "check-circle"}
                    size={24}
                    color="white"
                />
                <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Saving')}</Text>
                <Text style={dynamicStyles.value}>{totalBalance} €</Text>
            </View>
        </View>
    );
}

export default SavingsSummary;
