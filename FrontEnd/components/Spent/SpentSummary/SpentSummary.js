import React from 'react';
import { View, Text } from 'react-native';
import SpentSummaryLogic from './SpentSummaryLogic';
import { useTheme } from '../../../context/ThemeContext';  
import styles from './SpentSummary.styles'; 
import { useTranslation } from 'react-i18next'; // Para la traducción

const SpentSummary = ({ transactions }) => {
  const totalSpent = SpentSummaryLogic(transactions);
  const { isDark } = useTheme(); 
  const dynamicStyles = styles(isDark); 
  const { t } = useTranslation();

  if (transactions.length === 0) {
    return <Text>{t('Spent.SpentSummary.noSpent')}</Text>;
  }

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{t('Spent.SpentSummary.spent')} {totalSpent}€</Text>
    </View>
  );
};

export default SpentSummary;
