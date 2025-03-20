import React, { useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Svg, Rect, Text as SvgText } from "react-native-svg";
import { useCategories } from "../../../../context/CategoryContext";
import Icon from "react-native-vector-icons/FontAwesome5";

function SpentBarChart({ transactions }) {
  const { categories, loading } = useCategories();

  // Asegurar que useMemo se ejecuta antes de cualquier return
  const data = useMemo(() => {
    if (!categories || categories.length === 0) {
      return { labels: [], values: [] };
    }

    const categoryTotals = transactions.reduce((acc, transaction) => {
      const { categoria, amount } = transaction;

      if (amount < 0) {
        const category = categories.find(cat => cat.nombre === categoria);
        if (category) {
          acc[category.icono] = (acc[category.icono] || 0) + Math.abs(amount);
        }
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      values: Object.values(categoryTotals),
    };
  }, [transactions, categories]);

  // Mostrar indicador de carga si sigue cargando
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  // Mostrar mensaje si no hay datos disponibles
  if (data.values.length === 0) {
    return <Text style={{ textAlign: "center", margin: 20 }}>No hay datos</Text>;
  }

  // Configuración del gráfico
  const maxValue = Math.max(...data.values);
  const barWidth = 40;
  const barSpacing = 10;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + 40;
  const chartHeight = 200;

  return (
    <View>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Gastos por categoría
      </Text>
      <Svg width={chartWidth} height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}>
        {data.labels.map((iconName, index) => {
          const barHeight = (data.values[index] / maxValue) * (chartHeight - 50);
          const xPosition = 10 + index * (barWidth + barSpacing);
          const barColor = "#87CEFA"; // Azul por defecto

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
            </React.Fragment>
          );
        })}
      </Svg>  
      {/* Íconos debajo de las barras */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        {data.labels.map((iconName, index) => {
          const xPosition = 12.5 + index * (barWidth + barSpacing);
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                left: xPosition + barWidth / 2 - 10,
                bottom: 30, // Ícono debajo de la barra
              }}
            >
              <Icon name={iconName} size={20} color="#000" />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default SpentBarChart;
