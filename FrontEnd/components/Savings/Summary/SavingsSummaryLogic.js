import { useMemo } from 'react';

export const SavingsSummaryLogic = (transactions) => {
    return useMemo(() => {
        const totalEarn = transactions
            .filter((transaction) => transaction.amount > 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalSavings = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalSpent = transactions
            .filter((transaction) => transaction.amount < 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const monthlySavings = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const year = date.getFullYear();
            const month = date.getMonth(); 
            const key = `${year}-${month}`; 

            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += transaction.amount;
            return acc;
        }, {});

        const formattedMonthlySavings = Object.entries(monthlySavings)
            .map(([month, savings]) => {
                const parts = month.split("-"); // Separar "2025-2"

                if (parts.length !== 2) {
                    console.error("Formato de fecha inválido:", month);
                    return null; // Evitar errores si el formato es incorrecto
                }

                const year = parseInt(parts[0], 10); // Obtener año
                const monthNumber = parseInt(parts[1], 10); // Obtener mes (1-12)

                return {
                    month: `${year}-${monthNumber.toString().padStart(2, "0")}`, // Asegurar formato "YYYY-MM"
                    savings,
                    year,
                    monthIndex: monthNumber - 1 // Convertir "2" en 1 para ordenar bien
                };
            })
            .filter(item => item !== null) // Eliminar valores nulos por errores
            .sort((a, b) => a.year === b.year ? a.monthIndex - b.monthIndex : a.year - b.year)
            .slice(-12); // Últimos 12 meses
        return { totalEarn, totalSpent, totalSavings };


    }, [transactions]);
};
