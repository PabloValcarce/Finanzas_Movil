import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Svg, Rect, Text as SvgText, Line } from "react-native-svg";

function SpentBarChart({ transactions }) {


  const data = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const { categoria, amount } = transaction;
      if (amount < 0) {
        acc[categoria] = (acc[categoria] || 0) + Math.abs(amount);
      }
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    return { labels, values };
  }, [transactions]);

  if (data.values.length === 0) {
    return <Text style={{ textAlign: "center", margin: 20 }}>No hay datos</Text>;
  }

  const maxValue = Math.max(...data.values);
  const barWidth = 40;
  const barSpacing = 10;
  const minChartWidth = 300;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + 40 ;
  const chartHeight = 200;

  return (
    <View>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Gastos por categoría
      </Text>
      <Svg width={chartWidth} height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`} >
        {/* Eje X */}
        <Line x1="30" y1={chartHeight} x2={chartWidth - 10} y2={chartHeight} stroke="black" strokeWidth="2" />
        {/* Eje Y */}
        <Line x1="30" y1="10" x2="30" y2={chartHeight} stroke="black" strokeWidth="2" />

        {data.labels.map((label, index) => {
          const barHeight = (data.values[index] / maxValue) * (chartHeight - 50);
          const xPosition = 40 + index * (barWidth + barSpacing);
          const barColor =  "#87CEFA"; // Si no hay color, usa azul por defecto

          return (
            <React.Fragment key={index}>
              {/* Barra */}
              <Rect
                x={xPosition}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                stroke="#1B3A57"
                strokeWidth={1}
              />
              {/* Valor sobre la barra */}
              <SvgText
                x={xPosition + barWidth / 2}
                y={chartHeight - barHeight - 10}
                fontSize="12"
                fontWeight="bold"
                fill="#000"
                textAnchor="middle"
              >
                {`$${data.values[index].toFixed(2)}`}
              </SvgText>
              {/* Etiqueta en el eje X */}
              <SvgText
                x={xPosition + barWidth / 2}
                y={chartHeight + 15}
                fontSize="12"
                fill="#000"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

export default SpentBarChart;
