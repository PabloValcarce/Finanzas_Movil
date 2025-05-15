import { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';
import useAuth from '../../../utils/useAuth';
import { useCategories } from '../../../context/CategoryContext';
import api from '../../../services/api';

export const useSavingsLogic = () => {
  useAuth();
  const { transactions, loadTransactions } = useTransactions();
  const { userId } = useCategories();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejo de carga

  useEffect(() => {
    loadTransactions();
    if (userId) {
      fetchMonthSummary(userId);
    }
  }, [loadTransactions, userId]);

  const fetchMonthSummary = async (userId) => {
    try {
      const response = await api.get(`/api/month-summary/${userId}`);
      
      if (response.data && Array.isArray(response.data.summary)) {
        setMonthlySummary(response.data.summary); 
      } else {
        console.warn("La respuesta de la API no contiene un array de resumen mensual.");
        setMonthlySummary([]);
      }
    } catch (error) {
      console.error('❌ Error al obtener el resumen mensual:', error);
      setMonthlySummary([]); 
    } finally {
      setLoading(false); 
    }
  };

  const filterTransactionsByDate = () => {
    const { startDate, endDate } = dateRange;
    if (!startDate || !endDate) return transactions;

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  return {
    dateRange,
    setDateRange,
    filteredTransactions: filterTransactionsByDate(),
    handleResetDates,
    transactions,
    monthlySummary,
    loading, 
  };
};
