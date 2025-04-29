import React, { useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Svg, Rect, Text as SvgText } from "react-native-svg";
import { useCategories } from "../../../../context/CategoryContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "../../../../context/ThemeContext"; // Importar el contexto de tema

function SpentBarChart({ transactions }) {
  const { categories, loading } = useCategories();
  const { isDark } = useTheme();

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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  if (data.values.length === 0) {
    return <Text style={{ textAlign: "center", margin: 20 }}>No hay datos</Text>;
  }

  const maxValue = Math.max(...data.values);
  const barWidth = 40;
  const barSpacing = 10;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + 40;
  const chartHeight = 200;

  // Colores dinámicos para modo claro/oscuro
  const barColor = isDark ? "#4FC3F7" : "#87CEFA";         // Azul más oscuro para dark mode
  const strokeColor = isDark ? "#CCCCCC" : "#1B3A57";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const backgroundColor = isDark ? "#1e1e1e" : "#ffffff";

  return (
    <View style={{ backgroundColor, padding: 10, borderRadius: 10 }}>
      <Text style={{ textAlign: "center", marginBottom: 10, color: textColor }}>
        Gastos por categoría
      </Text>
      <Svg width={chartWidth} height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}>
        {data.labels.map((iconName, index) => {
          const barHeight = (data.values[index] / maxValue) * (chartHeight - 50);
          const xPosition = 10 + index * (barWidth + barSpacing);

          return (
            <React.Fragment key={index}>
              <Rect
                x={xPosition}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                stroke={strokeColor}
                strokeWidth={1}
              />
              <SvgText
                x={xPosition + barWidth / 2}
                y={chartHeight - barHeight - 10}
                fontSize="12"
                fontWeight="bold"
                fill={textColor}
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
                bottom: 30,
              }}
            >
              <Icon name={iconName} size={20} color={textColor} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default SpentBarChart;