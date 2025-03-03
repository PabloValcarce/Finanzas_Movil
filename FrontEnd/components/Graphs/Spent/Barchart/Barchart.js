import React, {  useMemo } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Svg, Rect, Text as SvgText, Line } from "react-native-svg";
import { useCategories } from "../../../../context/CategoryContext";
import Icon from "react-native-vector-icons/FontAwesome5";

function SpentBarChart({ transactions }) {
  const { categories, loading } = useCategories();
  console.log("categories", categories);
  console.log("transactions", transactions);
  
  

  // Si está cargando, mostrar el indicador de carga
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  // Verificar si las categorías están disponibles
  if (!categories || categories.length === 0) {
    return <Text style={{ textAlign: "center", margin: 20 }}>No se han cargado categorías</Text>;
  }
  const data = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const { categoria, amount } = transaction;

      // Validar que categories no sea undefined ni vacío
      if (!categories || categories.length === 0) {
        console.error("No categories available");
        return acc;
      }

      if (amount < 0) {
        // Buscar la categoría usando el nombre y obtener el icono
        const category = categories.find(cat => cat.nombre === categoria);

        if (category) {
          // Usamos el icono de la categoría
          acc[category.icono] = (acc[category.icono] || 0) + Math.abs(amount);
        }
      }
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);  // Los iconos como etiquetas
    const values = Object.values(categoryTotals);

    return { labels, values };
  }, [transactions, categories]);

  if (data.values.length === 0) {
    return <Text style={{ textAlign: "center", margin: 20 }}>No hay datos</Text>;
  }

  const maxValue = Math.max(...data.values);
  const barWidth = 40;
  const barSpacing = 10;
  const minChartWidth = 300;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + 40;
  const chartHeight = 200;

  return (
    <View>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Gastos por categoría
      </Text>
      <Svg width={chartWidth} height={chartHeight + 40} viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}>
        {/* Eje X */}
        <Line x1="30" y1={chartHeight} x2={chartWidth - 10} y2={chartHeight} stroke="black" strokeWidth="2" />
        {/* Eje Y */}
        <Line x1="30" y1="10" x2="30" y2={chartHeight} stroke="black" strokeWidth="2" />

        {data.labels.map((iconName, index) => {
          const barHeight = (data.values[index] / maxValue) * (chartHeight - 50);
          const xPosition = 40 + index * (barWidth + barSpacing);
          const barColor = "#87CEFA"; // Si no hay color, usa azul por defecto

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
      
      {/* Colocar los íconos debajo de las barras */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        {data.labels.map((iconName, index) => {
          const xPosition = 40 + index * (barWidth + barSpacing);
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                left: xPosition + barWidth / 2 - 10,
                bottom: 30, // Coloca el ícono debajo de la barra
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
