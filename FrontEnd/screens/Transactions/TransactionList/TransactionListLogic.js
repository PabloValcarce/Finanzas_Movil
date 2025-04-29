import { useState, useEffect, useMemo } from 'react';
import { useTransactions as useTransactionContext } from '../../../context/TransactionContext'; // Asegúrate de que el contexto esté importado correctamente
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useCategories } from '../../../context/CategoryContext';
import { useTheme } from '../../../context/ThemeContext'; 

export const useTransactions = () => {
  const { transactions, loadTransactions, loading } = useTransactionContext();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [userId, setUserId] = useState(null);
  const {
    categoriesPerso,
    loadPersonalizedCategories,
    addPersonalizedCategory,
    removePersonalizedCategory
  } = useCategories();
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('smile');
  const { isDark } = useTheme();

  useEffect(() => {
    console.log('Tema actualizado:', isDark);  // Verifica si isDark cambia
  }, [isDark]);
  
  useEffect(() => {
    const fetchUserId = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        try {
          const decoded = jwtDecode(access_token);
          setUserId(decoded.user_id);
        } catch (error) {
          console.error("Error decoding JWT:", error);
        }
      }
      setLoading(false);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
  // Normalizar fechas al formato adecuado para comparar
  const normalizeDate = (date) => {
    if (!date) return null;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);  // Ajusta a medianoche
    return normalizedDate;
  };

  // Función para filtrar las transacciones
  const filterTransactionsByDate = () => {
    const { startDate, endDate } = dateRange;
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      // Si no hay filtro de fecha, mostrar todas las transacciones
      if (!normalizedStartDate && !normalizedEndDate) return true;
      // Filtrado por fecha de inicio
      if (normalizedStartDate && !normalizedEndDate) {
        return transactionDate >= normalizedStartDate;
      }
      // Filtrado por fecha final
      if (!normalizedStartDate && normalizedEndDate) {
        return transactionDate <= normalizedEndDate;
      }
      // Filtrado entre fechas de inicio y final
      return transactionDate >= normalizedStartDate && transactionDate <= normalizedEndDate;
    }) // Filtrar solo los gastos
  };

  // Utilizamos useMemo para memorizar las transacciones filtradas y evitar recalcular en cada render
  const filteredTransactions = useMemo(() => filterTransactionsByDate(), [transactions, dateRange]);


  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  useEffect(() => {
    loadPersonalizedCategories();
  }, []);
  const agregarCategoria = async () => {
    if (!nuevaCategoria.trim()) return;
    try {
      await addPersonalizedCategory(nuevaCategoria, selectedIcon);
      await loadPersonalizedCategories();

      // Solo resetear después de que todo se haya completado
      setNuevaCategoria('');
      setSelectedIcon('smile');
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };


  const eliminarCategoria = async (categoriaId) => {
    await removePersonalizedCategory(categoriaId);
    loadPersonalizedCategories();
  };

  return {
    transactions,
    filteredTransactions,
    dateRange,
    setDateRange,
    handleResetDates,
    userId,
    loading,
    categorias: categoriesPerso,  
    nuevaCategoria,
    setNuevaCategoria,
    setSelectedIcon,
    selectedIcon,
    agregarCategoria,
    eliminarCategoria,
    isDark
  };
};
export default useTransactions;
