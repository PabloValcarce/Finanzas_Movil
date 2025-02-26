import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import useAuth from '../utils/useAuth';

const TransactionContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { checkToken } = useAuth();

  useEffect(() => {
    loadTransactions();
  },[]);
  

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
  const addTransaction = async (newTransaction) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (!access_token) {
        console.error('Token not found');
        setError('Token not found');
        return;
      }

      await api.post('/api/transactions', newTransaction, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Luego de agregar la transacción, recargamos las transacciones
      loadTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
      setError('Error adding transaction');
    }
  };



  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, loadTransactions, loading, error }}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionContext;
