import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import styles from './SavingsCircularChart.styles';

function SavingsCircularChart({ transactions }) {
    const currentMonth = useMemo(() => {
        return new Date().toLocaleString('default', { month: 'long' });
    }, []);

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
    const spentStrokeDashoffset = circumference * (1 - spentPercentage / 100);
    const savedStrokeDashoffset = circumference * (1 - savedPercentage / 100);

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Distribución de gastos y ahorros</Text>
            <Svg height="150" width="150" viewBox="0 0 120 120">
                <G rotation="-90" origin="60,60">
                    {/* Fondo del círculo */}
                    <Circle cx="60" cy="60" r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />

                    {/* Gastado */}
                    <Circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="#F5A167"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={spentStrokeDashoffset}
                        strokeLinecap="round"
                    />

                    {/* Ahorrado */}
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
                </G>

                {/* Texto en el centro */}
                <SvgText
                    x="60"
                    y="65"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#333"
                    fontWeight="bold"
                >
                    {total === 0 ? "No data" : `${spentPercentage.toFixed(1)}% Gastado`}
                </SvgText>
            </Svg>
        </View>
    );
}

export default SavingsCircularChart;
