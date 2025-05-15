import { useMemo } from 'react';

export const SavingsSummaryLogic = (recentTransactions, subscriptions) => {
    return useMemo(() => {
        

        const totalEarn = recentTransactions
            .filter(t => typeof t.amount === 'number' && t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const totalSpent = recentTransactions
            .filter(t => typeof t.amount === 'number' && t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0);

        const totalBalance = recentTransactions.reduce((sum, t) => (
            typeof t.amount === 'number' && !isNaN(t.amount) ? sum + t.amount : sum
        ), 0);

        const monthlySavings = recentTransactions.reduce((acc, t) => {
            if (!t.date) return acc;
            const date = new Date(t.date);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            acc[key] = (acc[key] || 0) + t.amount;
            return acc;
        }, {});

        const formattedMonthlySavings = Object.entries(monthlySavings)
            .map(([month, savings]) => {
                const [year, m] = month.split('-');
                const monthNum = parseInt(m, 10);
                return {
                    month: `${year}-${(monthNum + 1).toString().padStart(2, '0')}`,
                    savings,
                    year: parseInt(year),
                    monthIndex: monthNum
                };
            })
            .sort((a, b) => a.year === b.year ? a.monthIndex - b.monthIndex : a.year - b.year)
            .slice(-12);

        return { totalEarn, totalSpent, totalBalance, formattedMonthlySavings };
    }, [recentTransactions, subscriptions]); 
};
