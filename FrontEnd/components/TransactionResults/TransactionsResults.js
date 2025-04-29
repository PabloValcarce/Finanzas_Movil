import React, { useState, useEffect,useMemo } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import { useTransactions } from '../../context/TransactionContext';
import { useCategories } from '../../context/CategoryContext';
import styles from './TransactionsResults.styles'; // Usamos los estilos adaptados al tema

const TransactionsResults = ({isDark}) => {
  const { transactions, updateTransaction, deleteTransaction } = useTransactions();
  const { categories, loadCombinedCategories } = useCategories();
  const [visible, setVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubscription, setIsSubscription] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dynamicStyles = useMemo(() => styles(isDark), [isDark]);



  useEffect(() => {
    loadCombinedCategories();
  }, []);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setIsSubscription(Boolean(transaction.is_subscription));

    const category = categories.find(c => c.nombre === transaction.categoria);
    setCategoryId(category ? category.id : '');

    setIsEditDialogVisible(true);
  };

  const handleUpdateTransaction = async () => {
    setIsLoading(true);
    const updatedTransaction = {
      description,
      amount: parseFloat(amount),
      categoria_id: categoryId,
      is_subscription: isSubscription
    };

    try {
      await updateTransaction(selectedTransaction.id, updatedTransaction);
      setSuccessMessage("✅ Transacción modificada con éxito!");
      setTimeout(() => {
        setIsEditDialogVisible(false);
        setSuccessMessage('');
        setDescription('');
        setIsSubscription(false);
        setAmount('');
        setCategoryId('');
      }, 1500);
    } catch (error) {
      console.error(error);
      setSuccessMessage("❌ Error al modificar transacción");
    } finally {
      setIsLoading(false);
    }
  };

  const showDeleteDialog = (transaction) => {
    setSelectedTransaction(transaction);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setSelectedTransaction(null);
  };

  const confirmDelete = () => {
    if (selectedTransaction) {
      deleteTransaction(selectedTransaction.id);
      hideDialog();
    }
  };
  const renderItem = ({ item }) => {
    const rowClass = item.amount < 0 ? dynamicStyles.negative : dynamicStyles.positive;
    
    return (
      <View style={[dynamicStyles.row, rowClass]}>
        <Text style={dynamicStyles.cell}>{item.description}</Text>
        <Text style={dynamicStyles.cell}>{item.categoria}</Text>
        <Text style={dynamicStyles.cell}>{item.amount.toFixed(2)} €</Text>
        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity style={dynamicStyles.editButton} onPress={() => handleEdit(item)}>
            <MaterialIcons name="edit" style={dynamicStyles.editButton} />
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.deleteButton} onPress={() => showDeleteDialog(item)}>
            <MaterialIcons name="delete" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Transacciones</Text>
      {transactions.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={dynamicStyles.tableWrapper}>
          <View style={dynamicStyles.table}>
            <View style={dynamicStyles.headerRow}>
              <Text style={dynamicStyles.header}>Descripción</Text>
              <Text style={dynamicStyles.header}>Categoría</Text>
              <Text style={dynamicStyles.header}>Cantidad</Text>
              <Text style={dynamicStyles.header}>Acciones</Text>
            </View>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()} 
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={dynamicStyles.noExpenses}>No hay transacciones disponibles en este rango de fechas.</Text>
      )}

      {/* Dialogo de eliminación */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Confirmar Eliminación</Dialog.Title>
        <Dialog.Description>
          ¿Estás seguro de que quieres eliminar esta transacción?
          {"\n"}({selectedTransaction?.description})
        </Dialog.Description>
        <Dialog.Button label="Cancelar" onPress={hideDialog} />
        <Dialog.Button label="Eliminar" onPress={confirmDelete} color="red" />
      </Dialog.Container>

      {/* Dialogo de edición */}
      <Dialog.Container visible={isEditDialogVisible}>
        <Dialog.Title>Modificar Transacción</Dialog.Title>

        {successMessage ? (
          <Text style={dynamicStyles.successMessage}>{successMessage}</Text>
        ) : (
          <>
            <Text style={dynamicStyles.subtitle}>Descripción</Text>
            <Dialog.Input
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
            />

            <Text style={dynamicStyles.subtitle}>Cantidad</Text>
            <Dialog.Input
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Cantidad"
            />
            <View style={dynamicStyles.checkboxContainer}>
              <Text style={dynamicStyles.checkboxLabel}>Es una suscripción mensual </Text>
              <Switch
                value={isSubscription}
                onValueChange={setIsSubscription}
                trackColor={{ false: "#ccc", true: "#00A6B8" }} 
                thumbColor={isSubscription ? "#007B8F" : "#f4f3f4"} 
                ios_backgroundColor="#3e3e3e" 
              />
            </View>

            <Text style={dynamicStyles.subtitle}>Categoría</Text>
            <Dropdown
              data={categories.map(category => ({
                label: category.nombre,
                value: category.id
              }))}
              labelField="label"
              valueField="value"
              placeholder="Selecciona categoría"
              value={categoryId}
              onChange={item => setCategoryId(item.value)}
              style={dynamicStyles.select}
            />

            <View style={dynamicStyles.buttonContainer}>
              <Dialog.Button label="Cancelar" onPress={() => setIsEditDialogVisible(false)} />
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Dialog.Button label="Modificar" onPress={handleUpdateTransaction} />
              )}
            </View>
          </>
        )}
      </Dialog.Container>
    </View>
  );
};

export default TransactionsResults;
