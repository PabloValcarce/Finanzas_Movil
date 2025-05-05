import useAuth from "../../../utils/useAuth";
import { useEffect } from "react";
import { useTransactions } from "../../../context/TransactionContext";

const useTransactionHomeLogic = () => {

  const { checkToken } = useAuth();
  const { loading,
    loadSuscriptions,
    recentTransactions,
    loadRecentTransactions,
    loadTransactions,
    totalSubscriptionExpense
  } = useTransactions();

  const verifyToken = async () => {
    await checkToken();
  };

  useEffect(() => {
    verifyToken();
    loadTransactions();
    loadSuscriptions();
    loadRecentTransactions();
  }, []);



  return {
    loading,
    totalSubscriptionExpense,
    recentTransactions
  };
};

export default useTransactionHomeLogic; // Exportación por defecto
