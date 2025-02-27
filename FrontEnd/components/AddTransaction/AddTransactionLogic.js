import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Switch } from 'react-native';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import { useTransactions } from '../../context/TransactionContext';
import { useCategories } from '../../context/CategoryContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './AddTransaction.styles';

const AddTransactionLogic = ({ userId }) => {
    const { addTransaction } = useTransactions();
    const { categories, loading, loadCombinedCategories } = useCategories();
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isSubscription, setIsSubscription] = useState(false);  // 🔥 Estado para el checkbox
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadCombinedCategories();
    }, []);

    const handleAddTransaction = async () => {
        setIsLoading(true);
        const newTransaction = {
            description,
            amount,
            user_id: userId,
            categoria_id: categoryId,
            is_subscription: isSubscription,  // 🔥 Agregamos el campo al objeto
        };

        try {
            console.log(newTransaction);
            await addTransaction(newTransaction);

            setSuccessMessage("✅ Transacción añadida con éxito!");

            setTimeout(() => {
                setDescription('');
                setAmount('');
                setCategoryId('');
                setIsSubscription(false);  // 🔥 Resetear checkbox
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
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.add}
                onPress={() => setIsDialogVisible(true)}
            >
                <Icon name="plus" size={20} color="#144468" />
            </TouchableOpacity>

            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title style={styles.title}>Añadir transacción</Dialog.Title>

                {successMessage ? (
                    <Text style={styles.successMessage}>{successMessage}</Text>
                ) : (
                    <>
                        <Text style={styles.subtitle}>Descripción</Text>
                        <Dialog.Input
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Descripción"
                        />

                        <Text style={styles.subtitle}>Cantidad</Text>
                        <Dialog.Input
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="Cantidad"
                        />
                        <View style={styles.checkboxContainer}>
                            <Text style={styles.checkboxLabel}>Es una suscripción mensual </Text>

                            <Switch
                                value={isSubscription}
                                onValueChange={setIsSubscription}
                                trackColor={{ false: "#ccc", true: "#00A6B8" }} // Color del fondo cuando está en on y off
                                thumbColor={isSubscription ? "#007B8F" : "#f4f3f4"} // Color del "thumb" o círculo del switch
                                ios_backgroundColor="#3e3e3e" // Fondo del Switch en iOS
                            />
                        </View>

                        <Text style={styles.subtitle}>Categoría</Text>
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
                            style={styles.select}
                        />


                        <View style={styles.buttonContainer}>
                            <Dialog.Button label="Cancelar" onPress={() => setIsDialogVisible(false)} />
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Dialog.Button label="Añadir" onPress={handleAddTransaction} />
                            )}
                        </View>
                    </>
                )}
            </Dialog.Container>
        </View>
    );
};

export default AddTransactionLogic;
