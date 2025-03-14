import React from "react";
import { Text, Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import styles from "./CardItem.styles";

const { width } = Dimensions.get('screen');
const CardItem = ({ month, index, scrollX }) => {
  const monthDate = new Date(`${month.month}-01`);
  const monthName = monthDate.toLocaleString("es-ES", { month: "long" });

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
      <View style={styles.cardBackground}>
        <Text style={styles.cardLabel}>
          {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {month.month.slice(0, 4)}
        </Text>
        <Text style={styles.cardValue}>
          Total Gastado: ${month.total_spent}
        </Text>
        <Text style={styles.cardCategory}>
          Categoría: {month.top_category}
        </Text>
        <Text style={styles.cardSubscriptions}>
          Suscripciones: {Array.isArray(month.subscriptions) ? month.subscriptions.join(", ") : "No hay suscripciones"}
        </Text>
      </View>
    </Animated.View>
  );
};


export default CardItem;
