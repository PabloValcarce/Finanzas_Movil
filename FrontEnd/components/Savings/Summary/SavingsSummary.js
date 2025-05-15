import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './SavingsSummary.styles';
import { useTheme } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { SavingsSummaryLogic } from './SavingsSummaryLogic';

function SavingsSummary({ recentTransactions, subscriptions }) {
    const {
        totalEarn,
        totalSpent,
        totalBalance,
    } = SavingsSummaryLogic(recentTransactions, subscriptions);

    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation();

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>{t('Savings.SavingsSummary.title')}</Text>

            <View style={dynamicStyles.grid}>
                <View style={[dynamicStyles.card, dynamicStyles.cardPositive]}>
                    <FontAwesome5 name="arrow-down" size={20} color="white" />
                    <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Earn')}</Text>
                    <Text style={dynamicStyles.value}>{totalEarn} €</Text>
                </View>

                <View style={[dynamicStyles.card, dynamicStyles.cardNegative]}>
                    <FontAwesome5 name="arrow-up" size={20} color="white" />
                    <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Spent')}</Text>
                    <Text style={dynamicStyles.value}>{totalSpent} €</Text>
                </View>

                <View style={[dynamicStyles.card, dynamicStyles.cardNegative]}>
                    <FontAwesome5 name="arrow-up" size={20} color="white" />
                    <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Subscriptions')}</Text>
                    <Text style={dynamicStyles.value}>{subscriptions} €</Text>
                </View>

                <View style={[
                    dynamicStyles.card,
                    totalBalance < 0 ? dynamicStyles.cardNegative : dynamicStyles.cardPositive
                ]}>
                    <FontAwesome5 name="piggy-bank" size={20} color="white"/>
                    <Text style={dynamicStyles.label}>{t('Savings.SavingsSummary.Saving')}</Text>
                    <Text style={dynamicStyles.value}>{totalBalance} €</Text>
                </View>
            </View>
        </View>
    );
}

export default SavingsSummary;
