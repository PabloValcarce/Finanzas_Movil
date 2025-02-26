import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Polyline, Line, G, Circle, Text as SvgText } from 'react-native-svg';
import styles from './SavingsLineChart.styles';

function SavingsLineChart({ transactions }) {
    const monthsOrder = useMemo(() => [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ], []);

    // Obtenemos los últimos 6 meses
    const getLastSixMonths = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 6; i++) {
            const month = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
            months.push(month.getMonth() + 1); // Guardamos el número de mes (1 a 12)
        }
        return months.reverse(); // Invertimos el array para mostrar desde el más reciente
    };

    const lastSixMonths = useMemo(() => getLastSixMonths(), []);

    const balanceByMonth = useMemo(() => {
        return lastSixMonths.map(month => {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionMonth = new Date(transaction.date).getMonth() + 1;
                return transactionMonth === month;
            });
            return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        });
    }, [transactions, lastSixMonths]);

    const width = 300; // Aumentamos el ancho de la gráfica para más espacio
    const height = 400; // Aumentamos la altura de la gráfica
    const padding = 40;
    const maxValue = Math.max(...balanceByMonth, Math.abs(Math.min(...balanceByMonth))); // Consideramos el valor negativo más bajo también
    
    // Ajustamos el escalado del eje Y
    const scaleY = height / maxValue / 2;

    const points = balanceByMonth.map((value, index) => {
        const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding;
        const y = height / 2 - (value * scaleY); // Escalamos el valor en Y con la nueva escala
        return `${x},${y}`;
    }).join(" ");

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Ahorro por mes</Text>
            <Svg width={width} height={height}>
                {/* Eje Y */}
                <Line x1={padding} y1={height / 2} x2={padding} y2={height - padding} stroke="#000" strokeWidth="2" />
                
                {/* Eje X */}
                <Line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#000" strokeWidth="2" />

                {/* Gráfica de línea */}
                <Polyline points={points} fill="none" stroke="#1F5A7A" strokeWidth="3" />

                {/* Puntos */}
                {balanceByMonth.map((value, index) => {
                    const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding;
                    const y = height / 2 - (value * scaleY);
                    return (
                        <G key={index}>
                            <Circle cx={x} cy={y} r="4" fill="#1F5A7A" />
                            <SvgText x={x} y={y - 10} fontSize="12" fill="#000" textAnchor="middle">
                                {value.toFixed(2)}
                            </SvgText>
                        </G>
                    );
                })}

                {/* Etiquetas de los meses en el eje X (como números) */}
                {lastSixMonths.map((month, index) => {
                    const x = (index / (lastSixMonths.length - 1)) * (width - 2 * padding) + padding;
                    return (
                        <SvgText key={index} x={x} y={height / 2 + 15} fontSize="12" fill="#000" textAnchor="middle">
                            {month} {/* Usamos el número del mes en lugar de su nombre */}
                        </SvgText>
                    );
                })}

                {/* Etiquetas de los valores en el eje Y (con 0 en el centro) */}
                {[-maxValue, 0, maxValue].map((value, index) => {
                    const y = height / 2 - (value * scaleY);
                    return (
                        <SvgText key={index} x={padding - 10} y={y} fontSize="12" fill="#000" textAnchor="end">
                            ${value.toFixed(2)}
                        </SvgText>
                    );
                })}
            </Svg>
        </View>
    );
}

export default SavingsLineChart;
