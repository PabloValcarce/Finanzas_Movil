import React from "react";
import { Text, Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import styles from "./CardItem.styles";
import Icon from "react-native-vector-icons/FontAwesome5"

const { width } = Dimensions.get('screen');
const CardItem = ({ month, index, scrollX }) => {
  const monthDate = new Date(`${month.month}-01`);
  const monthName = monthDate.toLocaleString("es-ES", { month: "long" });

  const getSeasonalIcon = (monthNumber) => {
    if ([12, 1, 2].includes(monthNumber)) return { name: "snowflake", color: "#00BFFF" }; // Invierno ❄️
    if ([3, 4, 5].includes(monthNumber)) return { name: "seedling", color: "#32CD32" }; // Primavera 🌱
    if ([6, 7, 8].includes(monthNumber)) return { name: "sun", color: "#F1C27D" }; // Verano ☀️
    return { name: "leaf", color: "orange" }; // Otoño 🍂
  };

  const seasonalIcon = getSeasonalIcon(monthDate.getMonth() + 1);


  const getSeasonalBackground = (monthNumber) => {
    const seasonColors = {
      winter: "#ADD8E6",  // Azul claro
      spring: "#D6EBD1",  // Verde claro
      summer: "#F8F2D0",  // Amarillo dorado
      autumn: "#E6D1B3"   // Naranja oscuro
    };

    if ([12, 1, 2].includes(monthNumber)) return seasonColors.winter;
    if ([3, 4, 5].includes(monthNumber)) return seasonColors.spring;
    if ([6, 7, 8].includes(monthNumber)) return seasonColors.summer;
    return seasonColors.autumn;  // Septiembre, Octubre, Noviembre
  };


  // Cálculo de la animación para cada tarjeta
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {

      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.05, 0, width * 0.05],
            Extrapolation.CLAMP
          )
        }
      ],
    };
  });
  return (
    <Animated.View style={[styles.card, rnAnimatedStyle]}>
      <View style={[styles.cardBackground, { backgroundColor: getSeasonalBackground(monthDate.getMonth() + 1) }]}>

        {/* 📌 ENCABEZADO */}
        <View style={styles.header}>
          <Icon name={seasonalIcon.name} size={30} color={seasonalIcon.color} style={styles.seasonIcon} />
          <Text style={styles.cardLabel}>{monthName.charAt(0).toUpperCase() + monthName.slice(1)} {month.month.slice(0, 4)}</Text>
        </View>

        {/* 💰 RESUMEN FINANCIERO */}
        <View style={styles.summary}>
          <Text style={styles.cardValue}>Total Gastado:</Text>
          <Text style={styles.amount}>${month.total_spent}</Text>
          <Text style={styles.cardCategory}>Categoría con más gasto:</Text> 
            <Text>{month.top_category}</Text>
        </View>

        {/* 🔎 SUSCRIPCIONES */}
        <View style={styles.subscriptionsContainer}>
          <Text style={styles.subscriptionsTitle}>📌 Suscripciones:</Text>
          <Text style={styles.cardSubscriptions}>
            {Array.isArray(month.subscriptions) ? month.subscriptions.join(", ") : "No hay suscripciones"}
          </Text>
        </View>

      </View>
    </Animated.View>

  );
};
export default CardItem;
