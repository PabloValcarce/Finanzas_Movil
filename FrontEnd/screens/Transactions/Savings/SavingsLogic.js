import { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';
import useAuth from '../../../utils/useAuth';
import { useCategories } from '../../../context/CategoryContext';
import api from '../../../services/api';

export const SavingsLogic = () => {
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
      // Verificamos si 'summary' existe y es un array
      if (response.data && Array.isArray(response.data.summary)) {
        setMonthlySummary(response.data.summary); 
      } else {
        console.warn("La respuesta de la API no contiene un array de resumen mensual.");
        setMonthlySummary([]); // Si no es un array, establecemos un array vacío
      }
    } catch (error) {
      console.error('❌ Error al obtener el resumen mensual:', error);
      setMonthlySummary([]); // Si hay un error, dejamos un array vacío
    } finally {
      setLoading(false); // Al finalizar la carga, actualizamos el estado de loading
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
    loading, // Incluimos el estado de loading para mostrar el indicador de carga
  };
};
