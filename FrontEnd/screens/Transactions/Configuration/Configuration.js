import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Configuration.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import useConfigurationLogic from './ConfigurationLogic';
import IconSelector from '../../../components/IconSelector/IconSelector';

const Configuration = () => {
  const {
    categorias,
    nuevaCategoria,
    setNuevaCategoria,
    agregarCategoria,
    eliminarCategoria,
    loading,
    selectedIcon,
    setSelectedIcon
  } = useConfigurationLogic();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Muestra el diálogo y guarda la categoría seleccionada
  const showConfirmationDialog = (category) => {
    setSelectedCategory(category);
    setIsDialogVisible(true);
  };

  // Confirma la eliminación de la categoría
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      eliminarCategoria(selectedCategory.id);
    }
    setIsDialogVisible(false);
    setSelectedCategory(null);
  };

  // Abre el modal para seleccionar un ícono (IconSelector)
  const openIconModal = () => {
    setIsIconModalVisible(true);
  };

  // Modifica la función de agregar categoría para incluir el ícono
  const handleAddCategory = () => {
    if (nuevaCategoria.trim() !== '') {
      agregarCategoria(nuevaCategoria, selectedIcon);
      setNuevaCategoria('');
      setSelectedIcon('smile'); // Reinicia el ícono seleccionado
    }
  };

  return (
    <View style={styles.container}>
      <NavBarTransaction />
      <View style={styles.SettingsPage}>
        <View style={styles.CategoriesPerso}>
          <Text style={styles.title}>Categorías personalizadas</Text>

          <View style={styles.add}>
            {/* Botón para abrir el modal de selección de íconos */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={openIconModal}
            >
              <Icon name={selectedIcon} size={24} color="#144468" />
            </TouchableOpacity>
            
            {/* Campo de texto para ingresar la nueva categoría */}
            <TextInput
              placeholder="Nueva categoría"
              value={nuevaCategoria}
              onChangeText={setNuevaCategoria}
              style={styles.input}
            />
            
            {/* Botón para agregar la categoría */}
            <TouchableOpacity
              style={styles.addCategoryButton}
              onPress={handleAddCategory}
            >
              <Icon name="plus" size={20} color="#144468" />
            </TouchableOpacity>
          </View>

          {/* Lista de categorías personalizadas */}
          <View style={styles.listContainer}>
            <ScrollView>
              {categorias?.map((item) => (
                <View key={item.id.toString()} style={styles.categoryItem}>
                  <Icon name={item.icono} size={20} color="#144468" />
                  <Text style={styles.categoryText}>{' ' + item.nombre}</Text>
                  <TouchableOpacity
                    style={styles.deleteIcon}
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

      {/* Diálogo de confirmación para eliminar categoría */}
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Confirmar eliminación</Dialog.Title>
        <Dialog.Description>
          ¿Estás seguro de que deseas eliminar la categoría{" "}
          <Text style={{ fontWeight: 'bold' }}>
            {selectedCategory ? selectedCategory.nombre : ''}
          </Text>{" "}
          ?
        </Dialog.Description>
        <Dialog.Button label="Cancelar" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Eliminar" onPress={handleConfirmDelete} />
      </Dialog.Container>

      <IconSelector
        visible={isIconModalVisible}
        onClose={() => setIsIconModalVisible(false)}
        onSelect={(icon) => setSelectedIcon(icon)} 
      />
    </View>
  );
};

export default Configuration;
