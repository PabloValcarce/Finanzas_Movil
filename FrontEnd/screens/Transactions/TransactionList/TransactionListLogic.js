import { useState, useEffect, useMemo } from 'react';
import { useTransactions as useTransactionContext } from '../../../context/TransactionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useCategories } from '../../../context/CategoryContext';
import { useTheme } from '../../../context/ThemeContext';

export const useTransactions = () => {
  const { transactions, loadTransactions, loading } = useTransactionContext();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [userId, setUserId] = useState(null);
  const {
    categoriesCombined,
    categoriesDefault,
    categoriesPerso,
    loadCombinedCategories,
    addCategoryPerso,
    removeCategoryPerso,
  } = useCategories();

  const [newCategory, setNewCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('smile');
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchUserId = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        try {
          const decoded = jwtDecode(accessToken);
          setUserId(decoded.user_id);
        } catch (error) {
          console.error("Error decoding JWT:", error);
        }
      }
    };
    fetchUserId();
  }, []);

  const normalizeDate = (date) => {
    if (!date) return null;
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const filterTransactionsByDate = () => {
    const { startDate, endDate } = dateRange;
    const normalizedStart = normalizeDate(startDate);
    const normalizedEnd = normalizeDate(endDate);

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);

      if (!normalizedStart && !normalizedEnd) return true;
      if (normalizedStart && !normalizedEnd) return transactionDate >= normalizedStart;
      if (!normalizedStart && normalizedEnd) return transactionDate <= normalizedEnd;

      return transactionDate >= normalizedStart && transactionDate <= normalizedEnd;
    });
  };

  const filteredTransactions = useMemo(filterTransactionsByDate, [transactions, dateRange]);

  const resetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };



  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategoryPerso(newCategory, selectedIcon);
      await loadCombinedCategories();
      setNewCategory('');
      setSelectedIcon('smile');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    await removeCategoryPerso(categoryId);
    await loadCombinedCategories();
  };

  return {
    transactions,
    filteredTransactions,
    dateRange,
    setDateRange,
    resetDates,
    userId,
    loading,
    categoriesCombined,
    newCategory,
    setNewCategory,
    selectedIcon,
    setSelectedIcon,
    addCategory,
    deleteCategory,
    isDark,
  };
};

export default useTransactions;
