import { useMemo } from 'react';

const useSpentResultsLogic = (expenses) => {
  const formattedExpenses = useMemo(() => {
    return expenses.map((expense) => ({
      ...expense,
      formattedDate: new Date(expense.date).toLocaleDateString(),
      formattedAmount: expense.amount.toFixed(2),
    }));
  }, [expenses]);

  return formattedExpenses;
};

export default useSpentResultsLogic;
