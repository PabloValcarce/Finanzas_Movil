import { useEffect, useState } from 'react';
import { useCategories } from '../../../context/CategoryContext';
import { useBudgets } from '../../../context/BudgetContext';

export const useBudgetLogic = () => {
  const {
    categoriesCombined,
    loadCombinedCategories,
    loading: categoriesLoading,
  } = useCategories();

  const {
    budgets,
    loadBudgets,
    loading: budgetsLoading,
  } = useBudgets();

  const today = new Date();

  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    loadCombinedCategories();
    loadBudgets();
  }, []);



  const filterBudgetsByDate = (budgets, dateRange) => {
    const { startDate, endDate } = dateRange;
    const normalizedStart = startDate ? new Date(startDate) : null;
    const normalizedEnd = endDate ? new Date(endDate) : null;

    return budgets.filter(budget => {
      const budgetStart = new Date(budget.start_date);
      const budgetEnd = new Date(budget.end_date);

      // Si no hay rango definido, devuelve todo
      if (!normalizedStart && !normalizedEnd) return true;

      // Si solo hay fecha inicial en filtro, comprueba que el presupuesto termine después o en esa fecha
      if (normalizedStart && !normalizedEnd) {
        return budgetEnd >= normalizedStart;
      }

      // Si solo hay fecha final en filtro, comprueba que el presupuesto empiece antes o en esa fecha
      if (!normalizedStart && normalizedEnd) {
        return budgetStart <= normalizedEnd;
      }

      // Si hay ambas fechas, comprueba que el rango del presupuesto intersecte con el rango filtrado
      return budgetEnd >= normalizedStart && budgetStart <= normalizedEnd;
    });
  };
  const budgetsFiltered = filterBudgetsByDate(budgets, dateRange);


  return {
    categoriesCombined,
    budgetsFiltered,
    dateRange,
    setDateRange,
    loading: categoriesLoading || budgetsLoading,
  };
};
