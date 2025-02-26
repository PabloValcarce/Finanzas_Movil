import React from 'react';
import AddTransactionLogic from './AddTransactionLogic'; // Lógica de agregar transacción


const AddTransaction = ({ userId }) => {

  return (
    <AddTransactionLogic userId={userId} />
  );
};

export default AddTransaction;
