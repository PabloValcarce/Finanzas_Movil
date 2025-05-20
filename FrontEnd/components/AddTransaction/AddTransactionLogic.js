import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Switch } from 'react-native';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import { useTransactions } from '../../context/TransactionContext';
import { useCategories } from '../../context/CategoryContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './AddTransaction.styles';
import { useTranslation } from 'react-i18next';

const AddTransactionLogic = ({isDark, categoriesCombined}) => {
    const { addTransaction } = useTransactions();
    const { loading } = useCategories();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSubscription, setIsSubscription] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const dynamicStyles = styles(isDark);  // ⬅️ Aplica estilos dinámicos
    const { t } = useTranslation();

    const handleAddTransaction = async () => {
        setIsLoading(true);
        const newTransaction = {
            description,
            amount,
            category_id: categoryId,
            is_subscription: isSubscription,
        };       
        try {
            await addTransaction(newTransaction);
            setSuccessMessage("✅ Transacción añadida con éxito!");

            setTimeout(() => {
                setDescription('');
                setAmount('');
                setCategoryId('');
                setIsSubscription(false);
                setIsDialogVisible(false);
                setSuccessMessage('');
            }, 1500);

        } catch (error) {
            console.error(error);
            setSuccessMessage("❌ Error al añadir transacción");
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={dynamicStyles.container}>
            <TouchableOpacity
                style={dynamicStyles.add}
                onPress={() => setIsDialogVisible(true)}
            >
                <Icon name="plus" size={20} color={isDark ? '#fff' : 'white'} />
            </TouchableOpacity>

            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title style={dynamicStyles.title}>{t('TransactionsList.AddTransaction.title')}</Dialog.Title>

                {successMessage ? (
                    <Text style={dynamicStyles.successMessage}>{successMessage}</Text>
                ) : (
                    <>
                        <Text style={dynamicStyles.subtitle}>{t('TransactionsList.AddTransaction.Description')}</Text>
                        <Dialog.Input
                            value={description}
                            onChangeText={setDescription}
                            placeholder={t('TransactionsList.AddTransaction.Description')}
                        />
                        <Text style={dynamicStyles.subtitle}>{t('TransactionsList.AddTransaction.Amount')}</Text>
                        <Dialog.Input
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder={t('TransactionsList.AddTransaction.Amount')}
                        />

                        <View style={dynamicStyles.checkboxContainer}>
                            <Text style={dynamicStyles.checkboxLabel}>{t('TransactionsList.AddTransaction.Subscription')}</Text>
                            <Switch
                                value={isSubscription}
                                onValueChange={setIsSubscription}
                                trackColor={{ false: "#ccc", true: "#00A6B8" }}
                                thumbColor={isSubscription ? "#007B8F" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                            />
                        </View>

                        <Text style={dynamicStyles.subtitle}>{t('TransactionsList.AddTransaction.Category')}</Text>
                        <Dropdown
                            data={categoriesCombined.map(category => ({
                                label: category.name,
                                value: category.id
                            }))}
                            labelField="label"
                            valueField="value"
                            placeholder={t('TransactionsList.AddTransaction.SelectCategory')}
                            value={categoryId}
                            onChange={item => setCategoryId(item.value)}
                            style={dynamicStyles.select}
                        />

                        <View style={dynamicStyles.buttonContainer}>
                            <Dialog.Button label={t('TransactionsList.AddTransaction.Cancel')} onPress={() => setIsDialogVisible(false)} />
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Dialog.Button label={t('TransactionsList.AddTransaction.Save')} onPress={handleAddTransaction} />
                            )}
                        </View>
                    </>
                )}
            </Dialog.Container>
        </View>
    );
};

export default AddTransactionLogic;
