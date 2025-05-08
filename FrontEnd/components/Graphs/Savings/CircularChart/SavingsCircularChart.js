import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { styles } from './SavingsCircularChart.styles';
import { useTheme } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

function SavingsCircularChart({ transactions }) {
    const currentMonth = useMemo(() => {
        return new Date().toLocaleString('default', { month: 'long' });
    }, []);
    const { isDark } = useTheme();
    const dynamicStyles = useMemo(() => styles(isDark), [isDark]);
    const { t } = useTranslation();

    const currentMonthTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
            return transactionMonth === currentMonth;
        });
    }, [transactions, currentMonth]);

    const totals = useMemo(() => {
        const spent = currentMonthTransactions
            .filter(transaction => transaction.amount < 0)
            .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

        const saved = currentMonthTransactions
            .filter(transaction => transaction.amount > 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return { spent, saved };
    }, [currentMonthTransactions]);

    const total = totals.spent + totals.saved;
    const spentPercentage = total === 0 ? 0 : (totals.spent / total) * 100;
    const savedPercentage = total === 0 ? 0 : (totals.saved / total) * 100;

    const radius = 50;
    const strokeWidth = 15;
    const circumference = 2 * Math.PI * radius;
    const savedStrokeDashoffset = circumference * (1 - savedPercentage / 100);

    const isSpendingHigherThanSaving = totals.spent > totals.saved;

    const spentColor = isSpendingHigherThanSaving ? '#FF3B30' : '#F5A167';

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.chartTitle}>
                {t('Savings.SavingsCircularChart.title')}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Svg height="150" width="150" viewBox="0 0 120 120">
                    <G rotation="-90" origin="60,60">
                        {/* Fondo = Gasto (100% del círculo) */}
                        <Circle
                            cx="60"
                            cy="60"
                            r={radius}
                            stroke={spentColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={0}
                        />

                        {/* Ahorro encima (solo si hay) */}
                        {savedPercentage > 0 && (
                            <Circle
                                cx="60"
                                cy="60"
                                r={radius}
                                stroke="#70BFF5"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={savedStrokeDashoffset}
                                strokeLinecap="round"
                            />
                        )}
                    </G>

                    <SvgText
                        x="60"
                        y="65"
                        textAnchor="middle"
                        fontSize="14"
                        fill={dynamicStyles.chartTitleColor.color}
                        fontWeight="bold"
                    >
                        {total === 0
                            ? "No data"
                            : `${spentPercentage.toFixed(1)}% ${t('Savings.SavingsCircularChart.subtitle')}`}
                    </SvgText>
                </Svg>

                {/* Leyenda */}
                <View>
                    {savedPercentage > 0 && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <View style={{
                                width: 12,
                                height: 12,
                                backgroundColor: '#70BFF5',
                                borderRadius: 6,
                                marginRight: 8
                            }} />
                            <Text style={{ color: dynamicStyles.chartTitleColor.color }}>
                                {t('Savings.SavingsCircularChart.legend.Saving')}
                            </Text>
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 12,
                            height: 12,
                            backgroundColor: spentColor,
                            borderRadius: 6,
                            marginRight: 8
                        }} />
                        <Text style={{ color: dynamicStyles.chartTitleColor.color }}>
                            {t('Savings.SavingsCircularChart.legend.Spent')}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Texto explicativo debajo */}
            <Text style={{
                marginTop: 20,
                textAlign: 'center',
                color: dynamicStyles.chartTitleColor.color,
                fontSize: 14,
            }}>
                {isSpendingHigherThanSaving
                    ? t('Savings.SavingsCircularChart.explanation.greaterSpending')
                    : t('Savings.SavingsCircularChart.explanation.normal')}
            </Text>
        </View>
    );
}

export default SavingsCircularChart;
