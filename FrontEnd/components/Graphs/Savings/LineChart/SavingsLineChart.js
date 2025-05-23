import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Polyline, Line, G, Circle, Text as SvgText } from 'react-native-svg';
import styles from './SavingsLineChart.styles';
import { useTheme } from '../../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

function getLastSixMonths() {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
        const month = new Date(currentDate);
        month.setMonth(currentDate.getMonth() - i);
        months.push(month.getMonth() + 1);
    }
    return months.reverse();
}

function SavingsLineChart({ transactions }) {
    const [lastSixMonths, setLastSixMonths] = useState([]);
    const { isDark } = useTheme();
    const dynamicStyles = useMemo(() => styles(isDark), [isDark]);
    const { t } = useTranslation();

    useEffect(() => {
        const months = getLastSixMonths();
        setLastSixMonths(months);
    }, []);

    const monthsOrder = useMemo(() => [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ], []);

    const balanceByMonth = useMemo(() => {
        return lastSixMonths.map(month => {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionMonth = new Date(transaction.date).getMonth() + 1;
                return transactionMonth === month;
            });
            return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        });
    }, [transactions, lastSixMonths]);

    const width = 300;
    const height = 400;
    const padding = 40;
    const maxValue = Math.max(...balanceByMonth.map(v => Math.abs(v)), 0);

    // ⚠️ Evita dividir por 0
    const scaleY = maxValue === 0 ? 0 : height / (maxValue * 2) / 2;

    if (maxValue === 0) {
        return (
            <View style={dynamicStyles.container}>
                <Text style={dynamicStyles.chartTitle}>{t('Home.Graph.title')}</Text>
                <Text style={dynamicStyles.noDataText}>{t('Home.Graph.noData')}</Text>
            </View>
        );
    }

    const points = balanceByMonth.map((value, index) => {
        const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding + 20;
        const y = height / 2 - (value * scaleY);
        return `${x},${y}`;
    }).join(" ");

    const axisColor = dynamicStyles.axisColor.color;
    const lineColor = dynamicStyles.lineColor.color;
    const labelColor = dynamicStyles.labelColor.color;
    const xAxisY = height - padding - 50;


    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.chartTitle}>{t('Home.Graph.title')}</Text>
            <Svg width={width} height={height}>
                <Line x1={padding} y1={padding} x2={padding} y2={height - padding + 10} stroke={axisColor} strokeWidth="1" />
                <Line x1={padding} y1={xAxisY} x2={width - padding + 20} y2={xAxisY} stroke={axisColor} strokeWidth="1" />

                <Polyline points={points} fill="none" stroke={lineColor} strokeWidth="3" />

                {balanceByMonth.map((value, index) => {
                    const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding;
                    const y = height / 2 - (value * scaleY);
                    return (
                        <G key={index}>
                            <Circle cx={x + 20} cy={y} r="4" fill={lineColor} />
                            <SvgText x={x + 20} y={y - 10} fontSize="12" fill={labelColor} textAnchor="middle">
                                {value.toFixed(2)}
                            </SvgText>
                        </G>
                    );
                })}

                {lastSixMonths.map((month, index) => {
                    const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding;
                    const monthAbbr = monthsOrder[month - 1].substring(0, 3);
                    return (
                        <SvgText key={index} x={x + 20} y={xAxisY + 15} fontSize="12" fill={labelColor} textAnchor="middle">
                            {monthAbbr}
                        </SvgText>

                    );
                })}

                {[maxValue, maxValue / 2, 0, -maxValue / 2, -maxValue].map((value, index) => {
                    const y = height / 2 - (value * scaleY);
                    return (
                        <SvgText
                            key={index}
                            x={padding - 10}
                            y={y}
                            fontSize="12"
                            fill={labelColor}
                            textAnchor="end"
                            alignmentBaseline="middle"
                            fontWeight="500"
                        >
                            {value >= 0 ? `${value.toFixed(0)}€` : `-${Math.abs(value).toFixed(0)}€`}
                        </SvgText>
                    );
                })}
            </Svg>
        </View>
    );
}

export default SavingsLineChart;
