import { useMemo } from 'react';

const useSpentSummaryLogic = (transactions) => {
  const totalSpent = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.amount < 0) // Solo las transacciones negativas (gastos)
      .reduce((sum, transaction) => sum + transaction.amount, 0); // Sumar todos los gastos
  }, [transactions]);

  return Math.abs(totalSpent).toFixed(2); // Retornar el total gastado en valor absoluto y con 2 decimales
};

export default useSpentSummaryLogic;
