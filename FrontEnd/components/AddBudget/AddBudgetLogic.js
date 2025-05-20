import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from '../../context/BudgetContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './AddBudget.styles';
import { useTranslation } from 'react-i18next';

const AddBudgetLogic = ({ isDark, categoriesCombined }) => {
  const { addBudget } = useBudgets();
  const today = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setMonth(today.getMonth() + 1);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dynamicStyles = styles(isDark);

  const resetForm = () => {
    setName('');
    setAmount('');
    setCategoryId(null);
    const resetStart = new Date();
    const resetEnd = new Date();
    resetEnd.setMonth(resetStart.getMonth() + 1);
    setStartDate(resetStart);
    setEndDate(resetEnd);
    setSuccessMessage('');
    setIsDialogVisible(false);
  };

  const handleAddBudget = async () => {
    setIsLoading(true);

    if (!name.trim()) {
      setSuccessMessage(t('Budgets.AddBudget.Error.Name'));
      setIsLoading(false);
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setSuccessMessage(t('Budgets.AddBudget.Error.Amount'));
      setIsLoading(false);
      return;
    }

    if (startDate > endDate) {
      setSuccessMessage(t('Budgets.AddBudget.Error.StartDate'));
      setIsLoading(false);
      return;
    }

    try {
      await addBudget({
        name,
        amount: parseFloat(amount),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        category_id: categoryId,
      });

      setSuccessMessage(t('Budgets.AddBudget.Error.Success'));
      setTimeout(() => {
        resetForm();
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setSuccessMessage(t('Budgets.AddBudget.Error.Error'));
      setIsLoading(false);
    }
  };

  const onStartDateChange = (_, selectedDate) => {
    if (selectedDate) {
      setStartDate(selectedDate);

      // Validar que endDate no sea menor que startDate
      if (selectedDate > endDate) {
        const newEnd = new Date(selectedDate);
        newEnd.setMonth(newEnd.getMonth() + 1);
        setEndDate(newEnd);
      }
    }
    setShowStartPicker(false);
  };

  const onEndDateChange = (_, selectedDate) => {
    if (selectedDate) {
      if (selectedDate >= startDate) {
        setEndDate(selectedDate);
      } else {
        setSuccessMessage(t('Budgets.AddBudget.Error.Date'));
      }
    }
    setShowEndPicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={dynamicStyles.add}
        onPress={() => setIsDialogVisible(true)}
      >
        <Icon name="plus" size={20} color={isDark ? '#fff' : 'white'} />
      </TouchableOpacity>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>{t('Budgets.AddBudget.Title')}</Dialog.Title>

        {successMessage ? (
          <Text
            style={[
              dynamicStyles.message,
              successMessage.startsWith('✅')
                ? dynamicStyles.success
                : dynamicStyles.error,
            ]}
          >
            {successMessage}
          </Text>
        ) : (
          <>
            <Dialog.Input
              label={t('Budgets.AddBudget.Name')}
              value={name}
              onChangeText={setName}
              placeholder={t('Budgets.AddBudget.NamePlaceholder')}
            />
            <Dialog.Input
              label={t('Budgets.AddBudget.Amount')}
              value={amount}
              onChangeText={setAmount}
              placeholder={t('Budgets.AddBudget.Amount')}
              keyboardType="numeric"
            />

            {/* Fecha de inicio */}
            <Text style={dynamicStyles.subtitle}>Inicio</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={dynamicStyles.dateText}>
                {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onStartDateChange}
              />
            )}

            {/* Fecha de fin */}
            <Text style={dynamicStyles.subtitle}>Fin</Text>
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={dynamicStyles.dateText}>
                {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onEndDateChange}
              />
            )}

            <Text style={dynamicStyles.subtitle}>{t('Budgets.AddBudget.Category')}</Text>
            <Dropdown
              data={categoriesCombined.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              labelField="label"
              valueField="value"
              value={categoryId}
              onChange={(item) => setCategoryId(item.value)}
              style={dynamicStyles.select}
              placeholder={t('Budgets.AddBudget.CategoryPlaceholder')}
            />

            <View style={dynamicStyles.buttonContainer}>
              <Dialog.Button label={t('Budgets.AddBudget.Cancel')} onPress={resetForm} />
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Dialog.Button label={t('Budgets.AddBudget.Save')} onPress={handleAddBudget} />
              )}
            </View>
          </>
        )}
      </Dialog.Container>
    </View>
  );
};

export default AddBudgetLogic;
