import { StyleSheet, Dimensions } from 'react-native';
import { lightColors, darkColors } from '../../../styles/colors';

const { height } = Dimensions.get('window');

export const styles = (isDark) => {
  const colors = isDark ? darkColors : lightColors;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.tertiary,
    },
    TransactionListContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 30,
      backgroundColor: colors.tertiary,
    },
    head: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: 10,
      marginTop: 70,
      marginBottom: 30,
      padding: 20,
      zIndex: 10,
      backgroundColor: colors.four,
    },
    CategoriesPerso: {
      width: '90%',
      flexDirection: 'column',
      alignSelf: 'center',
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text,
    },
    add: {
      flexDirection: 'row',
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
    TransactionTable:{
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 50,
      borderRadius: 5,
      marginHorizontal: 15,
    },    
    input: {
      width: '70%',
      borderWidth: 1.5,
      borderColor: colors.text,
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
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 20,
      fontWeight: 'bold',
      height: 40,
    },
    icon: {
      fontSize: 24,
      color: colors.text,

    },
    iconplus: {
      fontSize: 20,
      color: colors.white,
    },
    categoryItem: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      backgroundColor: colors.category,
      padding: 12,
      borderRadius: 10,
      marginVertical: 6,
      marginHorizontal: 10,
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
