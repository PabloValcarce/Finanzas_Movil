import React, { useState, useEffect,useMemo } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import { useTransactions } from '../../context/TransactionContext';
import styles from './TransactionsResults.styles'; 
import { useTranslation } from 'react-i18next';

const TransactionsResults = ({transactions,categoriesCombined, isDark}) => {
  const {  updateTransaction, deleteTransaction } = useTransactions();
  const [visible, setVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubscription, setIsSubscription] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { t } = useTranslation();

  const dynamicStyles = useMemo(() => styles(isDark), [isDark]);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setIsSubscription(Boolean(transaction.is_subscription));

    const category = categoriesCombined.find(c => c.name === transaction.category);
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
        <Text style={dynamicStyles.cell}>{item.category}</Text>
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
      {transactions.length > 0 ? (
        <ScrollView horizontal contentContainerStyle={dynamicStyles.tableWrapper}>
          <View style={dynamicStyles.table}>
            <View style={dynamicStyles.headerRow}>
              <Text style={dynamicStyles.header}>{t('TransactionsList.TransactionResults.table.Description')}</Text>
              <Text style={dynamicStyles.header}>{t('TransactionsList.TransactionResults.table.Category')}</Text>
              <Text style={dynamicStyles.header}>{t('TransactionsList.TransactionResults.table.Amount')}</Text>
              <Text style={dynamicStyles.header}>{t('TransactionsList.TransactionResults.table.Actions')}</Text>
            </View>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()} 
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      ) : (
        <Text style={dynamicStyles.noExpenses}>{t('TransactionsList.TransactionResults.noResults')}</Text>
      )}

      {/* Dialogo de eliminación */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>{t('TransactionsList.TransactionResults.Delete.Title')}</Dialog.Title>
        <Dialog.Description>
        {t('TransactionsList.TransactionResults.Delete.Text')}
          {"\n"}({selectedTransaction?.description})
        </Dialog.Description>
        <Dialog.Button label={t('TransactionsList.TransactionResults.Delete.CancelButton')} onPress={hideDialog} />
        <Dialog.Button label={t('TransactionsList.TransactionResults.Delete.ConfirmButton')} onPress={confirmDelete} color="red" />
      </Dialog.Container>

      {/* Dialogo de edición */}
      <Dialog.Container visible={isEditDialogVisible}>
        <Dialog.Title>{t('TransactionsList.TransactionResults.Edit.Title')}</Dialog.Title>

        {successMessage ? (
          <Text style={dynamicStyles.successMessage}>{successMessage}</Text>
        ) : (
          <>
            <Text style={dynamicStyles.subtitle}>{t('TransactionsList.TransactionResults.Edit.Description')}</Text>
            <Dialog.Input
              value={description}
              onChangeText={setDescription}
              placeholder={t('TransactionsList.TransactionResults.Edit.Description')}
            />

            <Text style={dynamicStyles.subtitle}>{t('TransactionsList.TransactionResults.Edit.Amount')}</Text>
            <Dialog.Input
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder={t('TransactionsList.TransactionResults.Edit.Amount')}
            />
            <View style={dynamicStyles.checkboxContainer}>
              <Text style={dynamicStyles.checkboxLabel}>{t('TransactionsList.TransactionResults.Edit.Subscription')} </Text>
              <Switch
                value={isSubscription}
                onValueChange={setIsSubscription}
                trackColor={{ false: "#ccc", true: "#00A6B8" }} 
                thumbColor={isSubscription ? "#007B8F" : "#f4f3f4"} 
                ios_backgroundColor="#3e3e3e" 
              />
            </View>

            <Text style={dynamicStyles.subtitle}>{t('TransactionsList.TransactionResults.Edit.Category')}</Text>
            <Dropdown
              data={categoriesCombined.map(category => ({
                label: category.name,
                value: category.id
              }))}
              labelField="label"
              valueField="value"
              placeholder={t('TransactionsList.TransactionResults.Edit.SelectCategory')}
              value={categoryId}
              onChange={item => setCategoryId(item.value)}
              style={dynamicStyles.select}
            />

            <View style={dynamicStyles.buttonContainer}>
              <Dialog.Button label={t('TransactionsList.TransactionResults.Edit.CancelButton')} onPress={() => setIsEditDialogVisible(false)} />
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Dialog.Button label={t('TransactionsList.TransactionResults.Edit.ConfirmButton')} onPress={handleUpdateTransaction} />
              )}
            </View>
          </>
        )}
      </Dialog.Container>
    </View>
  );
};

export default TransactionsResults;
