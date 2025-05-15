import useAuth from "../../../utils/useAuth";
import { useEffect } from "react";
import { useTransactions } from "../../../context/TransactionContext";

const useTransactionHomeLogic = () => {

  const { checkToken } = useAuth();
  const { loading,
    loadSuscriptions,
    recentTransactions,
    loadRecentTransactions,
    totalSubscriptionExpense
  } = useTransactions();

  const verifyToken = async () => {
    await checkToken();
  };

  useEffect(() => {
    verifyToken();
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
