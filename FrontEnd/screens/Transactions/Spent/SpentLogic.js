import { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';

const SpentLogic = (dateRange) => {
  const { transactions, loadTransactions } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    const filterTransactionsByDate = () => {
      const { startDate, endDate } = dateRange;
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const isWithinDateRange =
          (!start || transactionDate >= start) &&
          (!end || transactionDate <= end);
        return isWithinDateRange && transaction.amount < 0;
      });
      setFilteredTransactions(filtered);
    };

    filterTransactionsByDate();
  }, [dateRange, transactions]);


  return { filteredTransactions };
};

export default SpentLogic;
