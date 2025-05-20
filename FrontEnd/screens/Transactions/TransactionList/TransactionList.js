import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import useTransactions from './TransactionListLogic';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import AddTransaction from '../../../components/AddTransaction/AddTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import TransactionsResults from '../../../components/TransactionResults/TransactionsResults';
import styles from './TransactionList.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconSelector from '../../../components/IconSelector/IconSelector';
import Dialog from 'react-native-dialog';
import { useTranslation } from 'react-i18next';

function TransactionsList() {
  const {
    categoriesPerso,
    categoriesCombined,
    filteredTransactions,
    dateRange,
    setDateRange,
    handleResetDates,
    loading,
    newCategory,
    setNewCategory,
    selectedIcon,
    setSelectedIcon,
    addCategory,
    deleteCategory,
    isDark
  } = useTransactions();

  const dynamicStyles = useMemo(() => styles(isDark), [isDark]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const { t } = useTranslation();

  
  const showConfirmationDialog = (category) => {
    setSelectedCategory(category);
    setIsDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
    }
    setIsDialogVisible(false);
    setSelectedCategory(null);
  };

  const openIconModal = () => {
    setIsIconModalVisible(true);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      addCategory(newCategory, selectedIcon);
      setNewCategory('');
      setSelectedIcon('smile');
    }
  };

 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={dynamicStyles.container}>
      <NavBarTransaction />
      <View style={dynamicStyles.TransactionListContent}>
        <View style={dynamicStyles.head}>
          <View style={dynamicStyles.CategoriesPersonal}>
            <Text style={dynamicStyles.title}>{t('TransactionsList.PersonalCategory.title')}</Text>

            <View style={dynamicStyles.add}>
              <TouchableOpacity
                style={dynamicStyles.iconButton}
                onPress={openIconModal}
              >
                <Icon name={selectedIcon} style={dynamicStyles.icon} />
              </TouchableOpacity>

              <TextInput
                placeholder={t('TransactionsList.PersonalCategory.placeholder')}
                value={newCategory}
                onChangeText={setNewCategory}
                style={dynamicStyles.input}
                placeholderTextColor={isDark ? '#e0e0e0' : '#666666'}
              />

              <TouchableOpacity
                style={dynamicStyles.addCategoryButton}
                onPress={handleAddCategory}
              >
                <Icon name="plus" style={dynamicStyles.iconplus} />
              </TouchableOpacity>
            </View>

            <View style={dynamicStyles.listContainer}>
              <ScrollView>
                {categoriesPerso?.map((item) => (
                  <View key={item.id.toString()} style={dynamicStyles.categoryItem}>
                    <Icon name={item.icon} style={dynamicStyles.icon} />
                    <Text style={dynamicStyles.categoryText}>{' ' + item.name}</Text>
                    <TouchableOpacity
                      style={dynamicStyles.deleteIcon}
                      onPress={() => showConfirmationDialog(item)}
                    >
                      <Icon name="trash" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.headDatePicker}>
          <Text style={dynamicStyles.label}>{t('DateRangePicker.title')}</Text>
        </View>
        <View style={dynamicStyles.headFilterAdd}>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
            isDark={isDark}
          />
          <AddTransaction
            isDark={isDark}
            categoriesCombined={categoriesCombined}
          />
        </View>
      </View>
      <View style={dynamicStyles.TransactionTable}>
        <Text style={dynamicStyles.title}>{t('TransactionsList.TransactionResults.title')}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TransactionsResults
            transactions={filteredTransactions}
            categoriesCombined={categoriesCombined}
            isDark={isDark} />
        </ScrollView>
      </View>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>{t('TransactionsList.PersonalCategory.DeleteConfirmTitle')}</Dialog.Title>
        <Dialog.Description>
          {t('TransactionsList.PersonalCategory.DeleteConfirmText')}{" "}
          <Text style={{ fontWeight: 'bold' }}>
            {selectedCategory ? selectedCategory.name : ''}
          </Text> ?
        </Dialog.Description>
        <Dialog.Button label={t('TransactionsList.PersonalCategory.DeleteCancelButton')} onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label={t('TransactionsList.PersonalCategory.DeleteConfirmButton')} onPress={handleConfirmDelete} />
      </Dialog.Container>

      <IconSelector
        visible={isIconModalVisible}
        onClose={() => setIsIconModalVisible(false)}
        onSelect={(icon) => setSelectedIcon(icon)}
      />
    </ScrollView>
  );
}

export default TransactionsList;
