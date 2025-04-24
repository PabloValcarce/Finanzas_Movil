import { StyleSheet, Dimensions } from 'react-native';
import AppStyles from '../../../styles/AppStyles';

const { height } = Dimensions.get('window');

export const styles = (isDark) => {
  const colors = isDark ? {
    background: '#121212',
    text: '#FFFFFF',
    primary: '#007B8F',
    secondary: '#B0B0B0',
    border: '#333',
  } : {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007B8F',
    secondary: '#555',
    border: '#CCC',
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 5,
    },
    head: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 100,
      marginBottom: 30,
      zIndex: 10,
    },
    TransactionListContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 15,
    },
    headDatePicker: {
      flexDirection: 'column',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 20,
      color: colors.text,
    },
    headFilterAdd: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    transactionsResults: {
      backgroundColor: colors.background,
      borderRadius: 10,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TransactionList: {
      padding: 30,
      backgroundColor: colors.background,
    },
    CategoriesPerso: {
      width: '95%',
      flexDirection: 'column',
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.primary,
    },
    add: {
      flexDirection: 'row',
    },
    input: {
      width: '70%',
      borderWidth: 1.5,
      borderColor: colors.border,
      padding: 10,
      borderRadius: 5,
      color: colors.text,
    },
    listContainer: {
      height: 300,
    },
    addCategoryButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      backgroundColor: '#f0f0f0',
      color: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 20,
      fontWeight: 'bold',
      height: 40,
    },
    categoryItem: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 12,
      borderRadius: 10,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    deleteIcon: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: '#e74c3c',
    },
    iconButton: {
      padding: 10,
    },
  });
};
