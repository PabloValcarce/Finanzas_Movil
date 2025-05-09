import React, { useState, useMemo } from 'react';
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
import { styles } from './TransactionList.styles';
import { useCategories } from '../../../context/CategoryContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconSelector from '../../../components/IconSelector/IconSelector';
import Dialog from 'react-native-dialog';
import { useTranslation } from 'react-i18next';

function TransactionsList() {
  const {
    filteredTransactions,
    dateRange,
    setDateRange,
    handleResetDates,
    loading,
    categorias,
    nuevaCategoria,
    setNuevaCategoria,
    selectedIcon,
    setSelectedIcon,
    agregarCategoria,
    eliminarCategoria,
    isDark
  } = useTransactions();
  const dynamicStyles = useMemo(() => styles(isDark), [isDark]);

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const { userId } = useCategories();
  const { t } = useTranslation();

  const showConfirmationDialog = (category) => {
    setSelectedCategory(category);
    setIsDialogVisible(true);
  };
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      eliminarCategoria(selectedCategory.id);
    }
    setIsDialogVisible(false);
    setSelectedCategory(null);
  };

  const openIconModal = () => {
    setIsIconModalVisible(true);
  };

  const handleAddCategory = () => {
    if (nuevaCategoria.trim() !== '') {
      agregarCategoria(nuevaCategoria, selectedIcon);
      setNuevaCategoria('');
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
          <View style={dynamicStyles.CategoriesPerso}>
            <Text style={dynamicStyles.title}>{t('TransactionsList.PersoCategory.title')}</Text>

            <View style={dynamicStyles.add}>
              <TouchableOpacity
                style={dynamicStyles.iconButton}
                onPress={openIconModal}
              >
                <Icon name={selectedIcon} style={dynamicStyles.icon} />
              </TouchableOpacity>

              <TextInput
                placeholder={t('TransactionsList.PersoCategory.placeholder')}
                value={nuevaCategoria}
                onChangeText={setNuevaCategoria}
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
                {categorias?.map((item) => (
                  <View key={item.id.toString()} style={dynamicStyles.categoryItem}>
                    <Icon name={item.icono} style={dynamicStyles.icon} />
                    <Text style={dynamicStyles.categoryText}>{' ' + item.nombre}</Text>
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
          <AddTransaction userId={userId} isDark={isDark} />
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
            isDark={isDark} />
        </ScrollView>
      </View>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>{t('TransactionsList.PersoCategory.DeleteConfirmTitle')}</Dialog.Title>
        <Dialog.Description>
          {t('TransactionsList.PersoCategory.DeleteConfirmText')}{" "}
          <Text style={{ fontWeight: 'bold' }}>
            {selectedCategory ? selectedCategory.nombre : ''}
          </Text> ?
        </Dialog.Description>
        <Dialog.Button label={t('TransactionsList.PersoCategory.DeleteCancelButton')} onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label={t('TransactionsList.PersoCategory.DeleteConfirmButton')} onPress={handleConfirmDelete} />
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
