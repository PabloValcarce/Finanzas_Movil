import React from "react";
import { Text, Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { useTheme } from '../../../../context/ThemeContext'; // Asegúrate de tener un contexto para el tema
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./CardItem.styles";
import { useTranslation } from "react-i18next";
import i18n from "../../../../assets/language/i18n"

const { width } = Dimensions.get('screen');

export default function CardItem ({ month, index, scrollX }) {
  const { isDark } = useTheme();
  const { styles: dynamicStyles, colors } = styles(isDark);
  const { t } = useTranslation();
  const monthDate = new Date(`${month.month}-01`);
  const monthName = monthDate.toLocaleString(i18n.language, { month: "long" });

  const getSeasonalIcon = (monthNumber) => {
    if ([12, 1, 2].includes(monthNumber)) return { name: "snowflake", color: "#00BFFF" };
    if ([3, 4, 5].includes(monthNumber)) return { name: "seedling", color: "#32CD32" };
    if ([6, 7, 8].includes(monthNumber)) return { name: "sun", color: "#F1C27D" };
    return { name: "leaf", color: "orange" };
  };

  const seasonalIcon = getSeasonalIcon(monthDate.getMonth() + 1);

  const getSeasonalBackground = (monthNumber) => {
    const seasonColors = colors.seasonal;

    if ([12, 1, 2].includes(monthNumber)) return seasonColors.winter;
    if ([3, 4, 5].includes(monthNumber)) return seasonColors.spring;
    if ([6, 7, 8].includes(monthNumber)) return seasonColors.summer;
    return seasonColors.autumn;
  };

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
    <Animated.View style={[dynamicStyles.card, rnAnimatedStyle]}>
      <View style={[dynamicStyles.cardBackground, { backgroundColor: getSeasonalBackground(monthDate.getMonth() + 1) }]}>
        <View style={dynamicStyles.header}>
          <Icon name={seasonalIcon.name} size={30} color={seasonalIcon.color} style={dynamicStyles.seasonIcon} />
          <Text style={dynamicStyles.cardLabel}>{monthName.charAt(0).toUpperCase() + monthName.slice(1)} {month.month.slice(0, 4)}</Text>
        </View>

        <View style={dynamicStyles.summary}>
          <Text style={dynamicStyles.cardValue}>{t('Savings.SavingsCards.CardItem.TotalSpent')}</Text>
          <Text style={dynamicStyles.amount}>${month.total_spent}</Text>
          <Text style={dynamicStyles.cardCategory}>{t('Savings.SavingsCards.CardItem.Category')}</Text> 
          <Text style={dynamicStyles.cardCategoryText}>{month.top_category}</Text>
        </View>

        <View style={dynamicStyles.subscriptionsContainer}>
          <Text style={dynamicStyles.subscriptionsTitle}>📌 {t('Savings.SavingsCards.CardItem.Subscription')}</Text>
          <Text style={dynamicStyles.cardSubscriptions}>
            {Array.isArray(month.subscriptions) ? month.subscriptions.join(", ") : t('Savings.SavingsCards.CardItem.NoSubscription')}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

