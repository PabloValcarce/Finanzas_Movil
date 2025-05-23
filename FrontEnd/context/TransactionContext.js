import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import useAuth from '../utils/useAuth';
import { useBudgets } from '../context/BudgetContext';

const TransactionContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { checkToken } = useAuth();
  const [totalSubscriptionExpense, setTotalSubscriptionExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const { loadBudgets } = useBudgets();

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await checkToken(); 
      const access_token = await AsyncStorage.getItem('access_token');
      if (!access_token) {
        setError('Token not found');
        return;
      }

      const response = await api.get('/api/transactions', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setTransactions(response.data);
      
    } catch (error) {
      console.error('Failed to load transactions:', error);
      setError('Failed to load transactions'); // Mostrar mensaje de error en el estado
    } finally {
      setLoading(false); // Ya terminamos de cargar
    }
  }, []);

  // Función para agregar una nueva transacción
 const addTransaction = async (newTransaction, force = false) => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    if (!access_token) {
      console.error('Token not found');
      setError('Token not found');
      return { success: false };
    }

    // Incluir parámetro ?force=true si es necesario
    const res = await api.post(
      `/api/transactions${force ? '?force=true' : ''}`,
      newTransaction,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // ⚠️ Backend devuelve 200 aunque se exceda el presupuesto
    if (res.data?.exceeds_budget) {
      return {
        success: false,
        reason: 'overBudget',
        warning: res.data.warning,
        budget: res.data.budget,
        pendingTransaction: newTransaction,
      };
    }
    return { success: true, data: res.data };

  } catch (error) {
    console.error('Error adding transaction:', error);
    setError('Error adding transaction');
    return { success: false };
  }
};


  const deleteTransaction = async (id) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (!access_token) {
        setError('Token not found');
        return;
      }

      await api.delete(`/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setError('Error deleting transaction');
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (!access_token) {
        setError('Token not found');
        return;
      }

      await api.put(`/api/transactions/${id}`, updatedTransaction, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      await loadTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
      setError('Error updating transaction');
    }
  };
  const loadSuscriptions = async () => {
    try {
        setLoading(true);
        setError(null);

        const access_token = await AsyncStorage.getItem('access_token');
        if (!access_token) {
            setError('Token not found');
            return;
        }

        const response = await api.get('/api/subscriptions', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        setTotalSubscriptionExpense(response.data.total_subscription_expense);
    } catch (error) {
        console.error("Failed to load subscriptions:", error);
        setError("Failed to load subscriptions");
    } finally {
        setLoading(false);
    }
  }
    //Transacciones últimos 30 dias

    const loadRecentTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const access_token = await AsyncStorage.getItem('access_token');
        if (!access_token) {
          setError('Token not found');
          return;
        }
    
        const response = await api.get('/api/transactions/recent', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
    
        setRecentTransactions(response.data);
      } catch (error) {
        console.error('Failed to load recent transactions:', error);
        setError('Failed to load recent transactions');
      } finally {
        setLoading(false);
      }
    };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      recentTransactions,
      updateTransaction, 
      deleteTransaction, 
      loadRecentTransactions,
      loadTransactions, 
      loadSuscriptions,
      totalSubscriptionExpense,
      loading, 
      error 
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionContext;
