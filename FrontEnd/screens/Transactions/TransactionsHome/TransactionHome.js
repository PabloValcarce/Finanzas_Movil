import React, { useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useTransactions } from '../../../context/TransactionContext'; // Importamos el contexto
import styles from './TransactionHome.styles'; // Importamos los estilos
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';

function TransactionHome() {
    const { loading,loadTransactions } = useTransactions(); // Accedemos a las transacciones y loading desde el contexto

    
    return (
        <ScrollView style={styles.transactionsPage}>
            <NavBarTransaction /> 
        </ScrollView>
    );
}

export default TransactionHome;
