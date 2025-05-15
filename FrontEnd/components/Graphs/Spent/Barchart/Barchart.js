import React, { useMemo, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Svg, Rect, Text as SvgText } from "react-native-svg";
import { useCategories } from "../../../../context/CategoryContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "../../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import styles from "./Barchart.styles";
import { lightColors, darkColors } from "../../../../styles/colors";

function SpentBarChart({ transactions, categoriesCombined }) {
  const { loading } = useCategories();
  const { isDark } = useTheme();
  const dynamicStyles = styles(isDark);
  const { t } = useTranslation();
  const colors = isDark ? darkColors : lightColors;
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Mapeo icono -> nombre (ahora usando "icon" y "name" en inglés)
  const iconToNameMap = useMemo(() => {
    const map = {};
    categoriesCombined.forEach(cat => {
      map[cat.icon] = cat.name;
    });
    return map;
  }, [categoriesCombined]);

  // Cálculo de datos para el gráfico
  const data = useMemo(() => {
    if (!categoriesCombined || categoriesCombined.length === 0) {
      return { labels: [], values: [] };
    }

    const categoryTotals = transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;

      if (amount < 0) {
        const categoryObj = categoriesCombined.find(cat => cat.name === category);
        if (categoryObj) {
          acc[categoryObj.icon] = (acc[categoryObj.icon] || 0) + Math.abs(amount);
        }
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(categoryTotals),
      values: Object.values(categoryTotals),
    };
  }, [transactions, categoriesCombined]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  if (data.values.length === 0) {
    return <Text style={dynamicStyles.noDataText}>{t('Spent.SpentBarChart.noData') || 'No data available'}</Text>;
  }

  const maxValue = Math.max(...data.values);
  const barWidth = 40;
  const barSpacing = 10;
  const chartWidth = data.labels.length * (barWidth + barSpacing) + 20;
  const chartHeight = 200;

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>
        {t('Spent.SpentBarChart.title')}
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
                fill={colors.graph.barchart.barColor}
                stroke={colors.graph.barchart.strokeColor}
                strokeWidth={1}
              />
              <SvgText
                x={xPosition + barWidth / 2}
                y={chartHeight - barHeight - 10}
                fontSize="12"
                fontWeight="bold"
                fill={colors.graph.barchart.textColor}
                textAnchor="middle"
              >
                {`${data.values[index].toFixed(2)} €`}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>

      <View style={dynamicStyles.iconRow}>
        {data.labels.map((iconName, index) => {
          const xPosition = 12.5 + index * (barWidth + barSpacing);
          return (
            <View
              key={index}
              style={[
                dynamicStyles.iconContainer,
                { left: xPosition + barWidth / 2 - 10 },
              ]}
            >
              <TouchableOpacity onPress={() => setSelectedIcon(prev => (prev === iconName ? null : iconName))}>
                <Icon name={iconName} size={20} color={colors.text} />
                {selectedIcon === iconName && (
                  <Text style={dynamicStyles.iconText}>
                    {iconToNameMap[iconName]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default SpentBarChart;
