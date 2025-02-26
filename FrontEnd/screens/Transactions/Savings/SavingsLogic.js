import { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';
import useAuth from '../../../utils/useAuth';

export const SavingsLogic = () => {
  useAuth();
  const { transactions, loadTransactions } = useTransactions();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

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
  };
};
