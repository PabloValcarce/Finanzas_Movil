import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const BudgetContext = createContext(null);

export const useBudgets = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetProvider");
  }
  return context;
};

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      if (access_token) {
        const decoded = jwtDecode(access_token);
        setUserId(decoded.user_id);
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  const loadBudgets = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await api.get('/api/budgets');  
      setBudgets(response.data);
    } catch (error) {
      console.error("Error al cargar presupuestos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budgetData) => {
    try {
      const response = await api.post('/api/budgets', budgetData);
      setBudgets(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error al agregar presupuesto:", error);
      throw error;
    }
  };

  const deleteBudget = async (budgetId) => {
    try {
      await api.delete(`/api/budgets/${budgetId}`);
      setBudgets(prev => prev.filter(b => b.id !== budgetId));
    } catch (error) {
      console.error("Error al eliminar presupuesto:", error);
    }
  };

  const updateBudget = async (budgetId, updatedData) => {
    try {
      const response = await api.put(`/api/budgets/${budgetId}`, updatedData);
      setBudgets(prev =>
        prev.map(b => (b.id === budgetId ? response.data : b))
      );
    } catch (error) {
      console.error("Error al actualizar presupuesto:", error);
    }
  };

  return (
    <BudgetContext.Provider value={{
      budgets,
      loading,
      loadBudgets,
      addBudget,
      deleteBudget,
      updateBudget,
      fetchUserId,
      userId,
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetContext;
