import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Switch,
    ScrollView,
    Alert
} from 'react-native';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import { useTransactions } from '../../context/TransactionContext';
import { useCategories } from '../../context/CategoryContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './AddTransaction.styles';
import { useTranslation } from 'react-i18next';

const AddTransactionLogic = ({ isDark }) => {
    const { addTransaction, loadTransactions } = useTransactions();
    const { loading, categoriesCombined } = useCategories();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [showForceConfirm, setShowForceConfirm] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSubscription, setIsSubscription] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [pendingTransaction, setPendingTransaction] = useState(null);
    const [budgetWarnings, setBudgetWarnings] = useState([]);
    const [rawWarnings, setRawWarnings] = useState([]); // nuevo estado
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation();

    const buildBudgetMessages = (responses) => {
        if (!responses || responses.length === 0) return [];
        return responses.map((response) => {
            const { exceeds, category_name, remaining } = response;
            const remainingFormatted = Math.abs(remaining ?? 0).toFixed(2);

            console.log(exceeds);

            
            if (!category_name) {
                return exceeds
                    ? t('TransactionsList.AddTransaction.Budget.general.exceeds', { remaining: remainingFormatted })
                    : t('TransactionsList.AddTransaction.Budget.general.warning', { remaining: remainingFormatted });
            } else {
                return exceeds
                    ? t('TransactionsList.AddTransaction.Budget.category.exceeds', { category: category_name, remaining: remainingFormatted })
                    : t('TransactionsList.AddTransaction.Budget.category.warning', { category: category_name, remaining: remainingFormatted });
            }
        });
    };

    const handleAddTransaction = async (force = false) => {
        const newTransaction = {
            description,
            amount: parseFloat(amount),
            category_id: categoryId,
            is_subscription: isSubscription,
        };
        try {
            setIsLoading(true);
            const response = await addTransaction(newTransaction, force);
            const responseData = response?.data || {};
            const warnings = responseData.warnings || [];
            const exceedsAnyBudget = responseData.exceeds_any_budget;

            if (warnings.length > 0 || exceedsAnyBudget) {
                const messages = [
                    ...buildBudgetMessages(warnings),
                ];
                setShowForceConfirm(true);
                setPendingTransaction(newTransaction);
                setBudgetWarnings(messages);
                setRawWarnings(warnings); // Guardamos los datos crudos
            } else {
                setSuccessMessage(t('TransactionsList.AddTransaction.Success'));
                setTimeout(() => {
                    loadTransactions();
                    resetForm();
                }, 2000);
            }
        } catch (error) {
            Alert.alert('Error', t('TransactionsList.AddTransaction.Error'));
            console.log("catch error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setDescription('');
        setAmount('');
        setCategoryId('');
        setIsSubscription(false);
        setIsDialogVisible(false);
        setSuccessMessage('');
        setPendingTransaction(null);
        setShowForceConfirm(false);
        setBudgetWarnings([]);
        setRawWarnings([]);
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
                {showForceConfirm ? (
                    <>
                        <Dialog.Title style={dynamicStyles.DialogMessagetitle}>
                            {
                                rawWarnings.some(w => w.exceeds)
                                    ? t('TransactionsList.AddTransaction.Budget.TitleExce')
                                    : t('TransactionsList.AddTransaction.Budget.TitleNoExce')
                            }
                        </Dialog.Title>

                        <ScrollView style={dynamicStyles.DialogMessageContent}>
                            {budgetWarnings.map((warning, idx) => (
                                <Text key={idx} style={dynamicStyles.subtitle}>{warning}</Text>
                            ))}
                        </ScrollView>

                        <View style={dynamicStyles.buttonContainer}>
                            <Dialog.Button
                                label={t('TransactionsList.AddTransaction.Budget.CancelButton')}
                                onPress={resetForm}
                            />
                            <Dialog.Button
                                label={t('TransactionsList.AddTransaction.Budget.ConfirmButton')}
                                onPress={async () => {
                                    if (pendingTransaction) {
                                        await handleAddTransaction(true);
                                    }
                                }}
                            />
                        </View>
                    </>

                ) : (
                    <>
                        <Dialog.Title style={dynamicStyles.title}>
                            {t('TransactionsList.AddTransaction.title')}
                        </Dialog.Title>

                        {successMessage ? (
                            <Text style={dynamicStyles.successMessage}>{successMessage}</Text>
                        ) : (
                            <>
                                <Text style={dynamicStyles.subtitle}>
                                    {t('TransactionsList.AddTransaction.Description')}
                                </Text>
                                <Dialog.Input
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder={t('TransactionsList.AddTransaction.Description')}
                                />

                                <Text style={dynamicStyles.subtitle}>
                                    {t('TransactionsList.AddTransaction.Amount')}
                                </Text>
                                <Dialog.Input
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="numeric"
                                    placeholder={t('TransactionsList.AddTransaction.Amount')}
                                />

                                <View style={dynamicStyles.checkboxContainer}>
                                    <Text style={dynamicStyles.checkboxLabel}>
                                        {t('TransactionsList.AddTransaction.Subscription')}
                                    </Text>
                                    <Switch
                                        value={isSubscription}
                                        onValueChange={setIsSubscription}
                                        trackColor={{ false: '#ccc', true: '#00A6B8' }}
                                        thumbColor={isSubscription ? '#007B8F' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                    />
                                </View>

                                <Text style={dynamicStyles.subtitle}>
                                    {t('TransactionsList.AddTransaction.Category')}
                                </Text>
                                <Dropdown
                                    data={categoriesCombined.map(category => ({
                                        label: category.name,
                                        value: category.id,
                                    }))}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={t('TransactionsList.AddTransaction.SelectCategory')}
                                    value={categoryId}
                                    onChange={item => {
                                        setCategoryId(item.value);
                                    }}
                                    style={dynamicStyles.select}
                                />

                                <View style={dynamicStyles.buttonContainer}>
                                    <Dialog.Button
                                        label={t('TransactionsList.AddTransaction.Cancel')}
                                        onPress={resetForm}
                                    />
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="#0000ff" />
                                    ) : (
                                        <Dialog.Button
                                            label={t('TransactionsList.AddTransaction.Save')}
                                            onPress={() => handleAddTransaction()}
                                        />
                                    )}
                                </View>
                            </>
                        )}
                    </>
                )}
            </Dialog.Container>
        </View>
    );
};

export default AddTransactionLogic;
