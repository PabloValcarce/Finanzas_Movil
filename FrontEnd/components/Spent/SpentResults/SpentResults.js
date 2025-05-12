import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import useSpentResultsLogic from "./SpentResultsLogic"; 
import { useTheme } from '../../../context/ThemeContext'; 
import styles from "./SpentResults.styles"; 
import { useTranslation } from "react-i18next"; 

const SpentResults = ({ expenses }) => {
  const { isDark } = useTheme(); 
  const formattedExpenses = useSpentResultsLogic(expenses);
  const dynamicStyles = styles(isDark); 
  const { t } = useTranslation(); 

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>{t('Spent.SpentResults.title')}</Text>
      {expenses.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={dynamicStyles.tableWrapper}>
          <View style={dynamicStyles.table}>
            <View style={dynamicStyles.headerRow}>
              <Text style={dynamicStyles.header}>{t('Spent.SpentResults.table.Date')}</Text>
              <Text style={dynamicStyles.header}>{t('Spent.SpentResults.table.Category')}</Text>
              <Text style={dynamicStyles.header}>{t('Spent.SpentResults.table.Description')}</Text>
              <Text style={dynamicStyles.header}>{t('Spent.SpentResults.table.Amount')}</Text>
            </View>
            <FlatList
              data={formattedExpenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const backgroundColor = index % 2 === 0 ? dynamicStyles.evenRow : dynamicStyles.oddRow;
                return (
                  <View style={[dynamicStyles.row,  backgroundColor ]}>
                    <Text style={dynamicStyles.cell}>{item.formattedDate}</Text>
                    <Text style={dynamicStyles.cell}>{item.categoria}</Text>
                    <Text style={dynamicStyles.cell}>{item.description}</Text>
                    <Text style={dynamicStyles.cell}>{item.formattedAmount} €</Text>
                  </View>
                );
              }}
              contentContainerStyle={dynamicStyles.table}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={dynamicStyles.noExpenses}>
          {t('Spent.SpentResults.noResults')}
        </Text>
      )}
    </View>
  );
};

export default SpentResults;
