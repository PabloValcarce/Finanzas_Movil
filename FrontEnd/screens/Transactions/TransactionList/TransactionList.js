import React, { useState } from 'react';
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
import { useTheme } from '../../../context/ThemeContext'; // Añadido para manejar el tema

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
  } = useTransactions();
  
  const { isDark } = useTheme(); // Obtener el estado del tema
  const dynamicStyles = styles(isDark); // Aplicar los estilos dinámicamente según el tema
  
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const { userId } = useCategories();

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
            <Text style={dynamicStyles.title}>Categorías personalizadas</Text>

            <View style={dynamicStyles.add}>
              <TouchableOpacity
                style={dynamicStyles.iconButton}
                onPress={openIconModal}
              >
                <Icon name={selectedIcon} size={24} color="#144468" />
              </TouchableOpacity>

              <TextInput
                placeholder="Nueva categoría"
                value={nuevaCategoria}
                onChangeText={setNuevaCategoria}
                style={dynamicStyles.input}
              />

              <TouchableOpacity
                style={dynamicStyles.addCategoryButton}
                onPress={handleAddCategory}
              >
                <Icon name="plus" size={20} color="#144468" />
              </TouchableOpacity>
            </View>

            <View style={dynamicStyles.listContainer}>
              <ScrollView>
                {categorias?.map((item) => (
                  <View key={item.id.toString()} style={dynamicStyles.categoryItem}>
                    <Icon name={item.icono} size={20} color="#144468" />
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

          <View style={dynamicStyles.headDatePicker}>
            <Text style={dynamicStyles.label}>Filtro entre fechas:</Text>
          </View>
          <View style={dynamicStyles.headFilterAdd}>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateRangeChange={setDateRange}
              onReset={handleResetDates}
            />
            <AddTransaction userId={userId} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={dynamicStyles.TransactionList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={dynamicStyles.transactionsResults}>
            <TransactionsResults transactions={filteredTransactions} />
          </View>
        </ScrollView>
      </View>

      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Confirmar eliminación</Dialog.Title>
        <Dialog.Description>
          ¿Estás seguro de que deseas eliminar la categoría{" "}
          <Text style={{ fontWeight: 'bold' }}>
            {selectedCategory ? selectedCategory.nombre : ''}
          </Text> ?
        </Dialog.Description>
        <Dialog.Button label="Cancelar" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Eliminar" onPress={handleConfirmDelete} />
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
