import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BudgetCard.styles';
import { useTranslation } from 'react-i18next';

const BudgetCard = ({ budget, isDark}) => {
  const [expanded, setExpanded] = useState(false);
  const dynamicStyles = styles(isDark);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={dynamicStyles.card}
      activeOpacity={0.8}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.budgetName}>{budget.name}</Text>
        <Text style={dynamicStyles.budgetAmount}>${budget.amount.toFixed(2)}</Text>
      </View>

      {expanded && (
        <View style={dynamicStyles.details}>
          <Text style={dynamicStyles.detailText}>
            {t('Budgets.AddBudget.Category')}: {budget.category?.name || t('Budget.General')}
          </Text>
          <Text style={dynamicStyles.detailText}>
            {t('Budgets.AddBudget.StartDate')}: {new Date(budget.start_date).toLocaleDateString()}
          </Text>
          <Text style={dynamicStyles.detailText}>
            {t('Budgets.AddBudget.EndDate')}: {new Date(budget.end_date).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BudgetCard;
