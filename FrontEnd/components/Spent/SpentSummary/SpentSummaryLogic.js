import { useMemo } from 'react';

const useSpentSummaryLogic = (transactions) => {
  const totalSpent = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.amount < 0) 
      .reduce((sum, transaction) => sum + transaction.amount, 0); 
  }, [transactions]);

  return Math.abs(totalSpent).toFixed(2); 
};

export default useSpentSummaryLogic;
