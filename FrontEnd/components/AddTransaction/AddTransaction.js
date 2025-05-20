import React from 'react';
import AddTransactionLogic from './AddTransactionLogic'; // Lógica de agregar transacción


const AddTransaction = ({ userId, isDark,categoriesCombined }) => {

  return (
    <AddTransactionLogic isDark={isDark} categoriesCombined={categoriesCombined} />
  );
};

export default AddTransaction;
