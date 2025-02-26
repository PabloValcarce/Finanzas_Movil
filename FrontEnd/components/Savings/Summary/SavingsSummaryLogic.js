import { useMemo } from 'react';

export const SavingsSummaryLogic = (transactions) => {
    return useMemo(() => {
        return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    }, [transactions]);
};
